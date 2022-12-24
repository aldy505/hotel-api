import {Room} from "./Room";
import {InvalidArgumentError} from "./Errors/InvalidArgumentError";
import {BookingLog} from "./BookingLog";

export class Booking {
    constructor(
        public readonly id: number,
        public readonly checkIn: Date,
        public readonly checkOut: Date,
        public readonly room: Room,
        public readonly log: BookingLog[]
    ) {
        // CheckOut date must not before CheckIn date.
        if (checkOut < checkIn) throw new InvalidArgumentError("checkOut");
    }
}