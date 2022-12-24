export class InvalidCheckOutDateError extends Error {
    constructor() {
        super("CheckOut date is after CheckIn date");
        this.name = "InvalidCheckOutDate";
    }
}