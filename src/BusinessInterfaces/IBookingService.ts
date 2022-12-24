/**
 * IBookingService provides an interface around booking of a room.
 */
export interface IBookingService {
    /**
     * Book a room by searching for the available room first by the
     * provided parameters. The room must be empty and available during
     * the check-in to the check-out date, and must have at least minimum
     * capacity of the specified capacity.
     *
     * If there are no room found that match the exact requested capacity,
     * yet there are available rooms that are have the capacity bigger than
     * the requested value, it is okay, and it is permitted to book to that room.
     *
     * Check-out date must not be before the check-in date. If the check-out date
     * is in 2022, yet the check-in date is in 2023. It's considered invalid, and
     * an error of InvalidCheckOutDateError will be thrown.
     *
     * @param checkIn Check-in date
     * @param checkOut Check-out date
     * @param capacity The room capacity
     * @returns Booking ID
     * @throws {InvalidCheckOutDateError} If check-out date is before check-in date.
     */
    book(checkIn: Date, checkOut: Date, capacity: number): Promise<string>

    /**
     * The booking record will not be deleted, but it will only change the status
     * to be Canceled.
     *
     * @param bookingId Booking ID
     */
    cancel(bookingId: string): Promise<void>

    /**
     * Just your regular check in function. It will only update the status.
     * @param bookingId Booking ID
     */
    checkIn(bookingId: string): Promise<void>

    /**
     * Another regular check out function that will only update the status.
     * @param bookingId Booking ID
     */
    checkOut(bookingId: string): Promise<void>
}