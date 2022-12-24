import {IPresentation} from "../../PresentationInterfaces/IPresentation";
import {IRoomService} from "../../BusinessInterfaces/IRoomService";
import {IBookingService} from "../../BusinessInterfaces/IBookingService";
import {ILogger} from "../../RepositoryInterfaces/ILogger";
import {sendUnaryData, Server, ServerCredentials, ServerUnaryCall} from "@grpc/grpc-js";
import {
    BookingRequest,
    BookingResponse,
    CancelBookRequest,
    CheckInRequest,
    CheckOutRequest,
    EmptyResponse,
    SearchRoomRequest,
    SearchRoomResponse
} from "./Stub/hotel_pb";
import {hotelServiceDefinition, IHotelService} from "./Stub/hotel_pb.grpc-server";
import {Status} from "@grpc/grpc-js/build/src/constants";
import {InvalidCheckOutDateError} from "../../Primitive/Errors/InvalidCheckOutDateError";

export class GrpcPresenter implements IPresentation {
    private readonly _app: Server;
    private readonly _roomService: IRoomService;
    private readonly _bookingService: IBookingService;
    private readonly _logger: ILogger;
    private readonly _hostname: string;
    private readonly _port: string;
    constructor(roomService: IRoomService, bookingService: IBookingService, logger: ILogger, hostname: string, port: string) {
        this._roomService = roomService;
        this._bookingService = bookingService;
        this._logger = logger;
        this._app = new Server();
        this._hostname = hostname;
        this._port = port;
    }

    register(): void {
        this._app.addService(hotelServiceDefinition, {
            book: this.bookHandler,
            cancelBook: this.cancelBookHandler,
            checkIn: this.checkInHandler,
            checkOut: this.checkOutHandler,
            searchRoom: this.searchRoomHandler
        } as IHotelService);
    }

    run(): void {
        this._app.bindAsync(`${this._hostname}:${this._port}`, ServerCredentials.createInsecure(), (error: Error | null): void => {
            if (error !== null) {
                this._logger.error(error.message);
                return;
            }

            this._app.start();
        });
    }

    private async bookHandler(call: ServerUnaryCall<BookingRequest, BookingResponse>, callback: sendUnaryData<BookingResponse>) {
        const checkInDate = new Date(call.request.checkIn);
        if (checkInDate.toString() === "Invalid Date") {
            callback({ code: Status.INVALID_ARGUMENT, message: "checkIn must be a valid ISO8601 format" });
            return;
        }

        const checkOutDate = new Date(call.request.checkOut);
        if (checkOutDate.toString() === "Invalid Date") {
            callback({ code: Status.INVALID_ARGUMENT, message: "checkOut must be a valid ISO8601 format" });
            return;
        }

        try {
            const bookingId = await this._bookingService.book(checkInDate, checkOutDate, call.request.capacity);

            callback(null, {bookingId: bookingId});
        } catch (error: unknown) {
            if (error instanceof InvalidCheckOutDateError) {
                callback({ code: Status.INVALID_ARGUMENT, message: error.message });
                return;
            }

            this._logger.error(JSON.stringify(error));
            callback({ code: Status.INTERNAL, message: "Internal server error" });
        }
    }

    private async cancelBookHandler(call: ServerUnaryCall<CancelBookRequest, EmptyResponse>, callback: sendUnaryData<EmptyResponse>) {
        try {
            await this._bookingService.cancel(call.request.bookingId);
            callback(null, {});
        } catch (error: unknown) {
            this._logger.error(JSON.stringify(error));
            callback({ code: Status.INTERNAL, message: "Internal server error" });
        }
    }

    private async checkInHandler(call: ServerUnaryCall<CheckInRequest, EmptyResponse>, callback: sendUnaryData<EmptyResponse>) {
        try {
            await this._bookingService.checkIn(call.request.bookingId);
            callback(null, {});
        } catch (error: unknown) {
            this._logger.error(JSON.stringify(error));
            callback({ code: Status.INTERNAL, message: "Internal server error" });
        }
    }

    private async checkOutHandler(call: ServerUnaryCall<CheckOutRequest, EmptyResponse>, callback: sendUnaryData<EmptyResponse>) {
        try {
            await this._bookingService.checkOut(call.request.bookingId);
            callback(null, {});
        } catch (error: unknown) {
            this._logger.error(JSON.stringify(error));
            callback({ code: Status.INTERNAL, message: "Internal server error" });
        }
    }

    private async searchRoomHandler(call: ServerUnaryCall<SearchRoomRequest, SearchRoomResponse>, callback: sendUnaryData<SearchRoomResponse>) {
        try {
            const rooms = await this._roomService.search(call.request.capacity, call.request.floor);


            callback(null, {
                room: rooms.map((room) => ({ id: room.id, capacity: room.capacity, floor: room.floor }))
            });
        } catch (error: unknown) {
            this._logger.error(JSON.stringify(error));
            callback({ code: Status.INTERNAL, message: "Internal server error" });
        }
    }
}