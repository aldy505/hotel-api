import {Room} from "../Primitive/Room";
import {Status} from "../Primitive/Status";
import {Booking} from "../Primitive/Booking";

/**
 * Concierge is a usually multilingual hotel staff member who handles luggage and mail,
 * makes reservations, and arranges tours.
 *
 * See more on https://www.merriam-webster.com/dictionary/concierge
 */
export interface IConciergeService {
    /**
     * List all the available rooms.
     */
    listAvailableRooms(): Promise<Room[]>

    /**
     * List booking by status.
     *
     * @param status The booking status
     */
    listBookingByStatus(status: Status): Promise<Booking[]>
}