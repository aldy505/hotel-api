import {IConciergeService} from "../BusinessInterfaces/IConciergeService";
import {IRoomRepository} from "../RepositoryInterfaces/IRoomRepository";
import {IBookingRepository} from "../RepositoryInterfaces/IBookingRepository";
import {IBookingLogRepository} from "../RepositoryInterfaces/IBookingLogRepository";
import {ILogger} from "../RepositoryInterfaces/ILogger";
import {Room} from "../Primitive/Room";
import {Status} from "../Primitive/Status";
import {Booking} from "../Primitive/Booking";

export class ConciergeService implements IConciergeService {
    private readonly _roomRepository: IRoomRepository;
    private readonly _bookingRepository: IBookingRepository;
    private readonly _bookingLogRepository: IBookingLogRepository;
    private readonly _logger: ILogger;

    // TODO: create constructor on your own!

    async listAvailableRooms(): Promise<Room[]> {
        // TODO: implement me!
    }

    async listBookingByStatus(status: Status): Promise<Booking[]> {
        // TODO: implement me!
    }
}