import {describe, expect, it} from "vitest";
import {Booking} from "../../../src/Primitive/Booking";
import {Room} from "../../../src/Primitive/Room";
import {InvalidArgumentError} from "../../../src/Primitive/Errors/InvalidArgumentError";

describe("Booking", () => {
    it("should be able to create a normal Booking class", () => {
        const booking = new Booking(1, new Date(2022), new Date(2023), new Room(1, 2, 5), []);
        expect(booking.id).toBe(1);
        expect(booking.room.id).toBe(1);
    });

    it("should throw error for invalid checkout date", () => {
        expect(() => new Booking(1, new Date(2023), new Date(2020), new Room(1, 2, 5), []))
            .toThrowError(new InvalidArgumentError("checkOut"));
    });
});