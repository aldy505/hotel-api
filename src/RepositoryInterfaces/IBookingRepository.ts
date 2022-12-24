import {Booking} from "../Primitive/Booking";

export interface IBookingRepository {
    create(booking: Booking): Promise<number>
    listAll(): Promise<Booking[]>
    findById(bookingId: number): Promise<Booking>
    findByRoom(roomId: number): Promise<Booking[]>
    findByDate(checkIn: Date, checkOut: Date): Promise<Booking[]>
}