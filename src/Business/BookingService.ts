import {IBookingService} from "../BusinessInterfaces/IBookingService";
import {IRoomRepository} from "../RepositoryInterfaces/IRoomRepository";
import {IBookingRepository} from "../RepositoryInterfaces/IBookingRepository";
import {IBookingLogRepository} from "../RepositoryInterfaces/IBookingLogRepository";
import {ILogger} from "../RepositoryInterfaces/ILogger";
import {InvalidCheckOutDateError} from "../Primitive/Errors/InvalidCheckOutDateError";

export class BookingService implements IBookingService {
    private readonly _roomRepository: IRoomRepository;
    private readonly _bookingRepository: IBookingRepository;
    private readonly _bookingLogRepository: IBookingLogRepository;
    private readonly _logger: ILogger;
    constructor(
        roomRepository: IRoomRepository,
        bookingRepository: IBookingRepository,
        bookingLogRepository: IBookingLogRepository,
        logger: ILogger
    ) {
        // TODO: set the input repository above to the class instance.
        // I will give you one example:
        this._bookingRepository = bookingRepository;
    }

    async book(checkIn: Date, checkOut: Date, capacity: number): Promise<string> {
        if (checkOut < checkIn) {
            throw new InvalidCheckOutDateError();
        }

        // TODO: implement me!
    }

    async cancel(bookingId: string): Promise<void> {
        // TODO: implement me!
    }

    async checkIn(bookingId: string): Promise<void> {
        // TODO: implement me!
    }

    async checkOut(bookingId: string): Promise<void> {
        // TODO: implement me
    }
}