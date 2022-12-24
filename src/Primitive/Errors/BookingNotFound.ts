export class BookingNotFound extends Error {
    constructor() {
        super("Booking not found");
        this.name = "BookingNotFound";
    }
}