import {describe, it, expect} from "vitest";
import {BookingLog} from "../../../src/Primitive/BookingLog";
import {InvalidArgumentError} from "../../../src/Primitive/Errors/InvalidArgumentError";

describe("BookingLog", () => {
    it.todo("should be able to create normal BookingLog class");

    it("should throw InvalidArgumentError for undefined status", () => {
        // @ts-ignore testing purposes
        expect(() => new BookingLog(1, undefined, undefined))
            .toThrowError(new InvalidArgumentError("status"));
    });

    it.todo("should throw InvalidArgumentError for undefined timestmp");
});