import { App, Request, Response } from "@tinyhttp/app";
import {ZodError} from "zod";
import { json } from "milliparsec";
import {IPresentation} from "../../PresentationInterfaces/IPresentation";
import {IRoomService} from "../../BusinessInterfaces/IRoomService";
import {IBookingService} from "../../BusinessInterfaces/IBookingService";
import {BookRequest} from "./DTO/BookRequest";
import {ILogger} from "../../RepositoryInterfaces/ILogger";
import {InvalidCheckOutDateError} from "../../Primitive/Errors/InvalidCheckOutDateError";
import {BookResponse} from "./DTO/BookResponse";
import {CancelBookRequest} from "./DTO/CancelBookRequest";
import {CancelBookResponse} from "./DTO/CancelBookResponse";
import {CheckInRequest} from "./DTO/CheckInRequest";
import {CheckInResponse} from "./DTO/CheckInResponse";
import {CheckOutRequest} from "./DTO/CheckOutRequest";
import {CheckOutResponse} from "./DTO/CheckOutResponse";
import {SearchRoomRequest} from "./DTO/SearchRoomRequest";
import {SearchRoomResponse} from "./DTO/SearchRoomResponse";

export class HttpPresenter implements IPresentation {
    private readonly _app: App;
    private readonly _roomService: IRoomService;
    private readonly _bookingService: IBookingService;
    private readonly _logger: ILogger;
    private readonly _hostname: string;
    private readonly _port: number;
    constructor(roomService: IRoomService, bookingService: IBookingService, logger: ILogger, hostname: string, port: string) {
        this._roomService = roomService;
        this._bookingService = bookingService;
        this._logger = logger;
        this._app = new App();

        const parsedPort = Number.parseInt(port);
        if (Number.isNaN(parsedPort)) throw new Error("port is not a number");

        this._hostname = hostname;
        this._port = parsedPort;
    }

    register() {
        this._app.use(json());
        this._app.put("/book", (req, res) => this.bookHandler(req, res));
        this._app.post("/cancel-book", (req, res) => this.cancelBookHandler(req, res));
        this._app.put("/check-in", (req, res) => this.checkInHandler(req, res));
        this._app.post("/check-out", (req, res) => this.checkOutHandler(req, res));
        this._app.post("/search-room", (req, res) => this.searchRoomHandler(req, res));
    }

    run() {
        this._app.listen(
            this._port,
            () => {
                this._logger.info(`HTTP Server is starting on http://${this._hostname}:${this._port.toString()}`);
            },
            this._hostname);
    }

    private async bookHandler(request: Request, response: Response): Promise<void> {
        try {
            const requestBody = BookRequest.parse(request.body);

            const bookingId = await this._bookingService.book(requestBody.checkIn, requestBody.checkOut, requestBody.capacity);

            response.writeHead(200, { "Content-Type": "application/json" })
                .end(JSON.stringify({ bookingId: bookingId } as BookResponse));
        } catch (error: unknown) {
            if (error instanceof ZodError) {
                response.writeHead(400, { "Content-Type": "application/json" })
                    .end(JSON.stringify(error));
                return;
            }

            if (error instanceof InvalidCheckOutDateError) {
                response.writeHead(400, { "Content-Type": "application/json" })
                    .end(JSON.stringify(error));
            }

            // Re-throw error if the error is unknown
            throw error;
        }
    }

    private async cancelBookHandler(request: Request, response: Response): Promise<void> {
        try {
            const requestBody = CancelBookRequest.parse(request.body);

            await this._bookingService.cancel(requestBody.bookingId);

            response.writeHead(200, { "Content-Type": "application/json" })
                .end(JSON.stringify({} as CancelBookResponse));
        } catch (error: unknown) {
            if (error instanceof ZodError) {
                response.writeHead(400, { "Content-Type": "application/json" })
                    .end(JSON.stringify(error));
                return;
            }

            // Re-throw error if the error is unknown
            throw error;
        }
    }

    private async checkInHandler(request: Request, response: Response): Promise<void> {
        try {
            const requestBody = CheckInRequest.parse(request.body);

            await this._bookingService.checkIn(requestBody.bookingId);

            response.writeHead(200, { "Content-Type": "application/json" })
                .end(JSON.stringify({ } as CheckInResponse));
        } catch (error: unknown) {
            if (error instanceof ZodError) {
                response.writeHead(400, { "Content-Type": "application/json" })
                    .end(JSON.stringify(error));
                return;
            }

            // Re-throw error if the error is unknown
            throw error;
        }
    }

    private async checkOutHandler(request: Request, response: Response): Promise<void> {
        try {
            const requestBody = CheckOutRequest.parse(request.body);

            await this._bookingService.checkOut(requestBody.bookingId);

            response.writeHead(200, { "Content-Type": "application/json" })
                .end(JSON.stringify({ } as CheckOutResponse));
        } catch (error: unknown) {
            if (error instanceof ZodError) {
                response.writeHead(400, { "Content-Type": "application/json" })
                    .end(JSON.stringify(error));
                return;
            }

            // Re-throw error if the error is unknown
            throw error;
        }
    }

    private async searchRoomHandler(request: Request, response: Response): Promise<void> {
        try {
            const requestBody = SearchRoomRequest.parse(request.body);

            const rooms = await this._roomService.search(requestBody.capacity, requestBody.floor);

            const responseBody: SearchRoomResponse = [];

            for (let i = 0; i < rooms.length; i++) {
                responseBody.push({
                    id: rooms[i].id,
                    capacity: rooms[i].capacity,
                    floor: rooms[i].floor
                });
            }

            response.writeHead(200, { "Content-Type": "application/json" })
                .end(JSON.stringify(responseBody));
        } catch (error: unknown) {
            if (error instanceof ZodError) {
                response.writeHead(400, { "Content-Type": "application/json" })
                    .end(JSON.stringify(error));
                return;
            }

            // Re-throw error if the error is unknown
            throw error;
        }
    }
}