import {Status} from "../Primitive/Status";
import {BookingLog} from "../Primitive/BookingLog";

export interface IBookingLogRepository {
    create(bookingId: number, status: Status): Promise<void>
    findByBookingId(bookingId: number): Promise<BookingLog[]>
}