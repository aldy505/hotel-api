import {describe, it, expect, afterAll, beforeAll} from "vitest";
import {PrismaClient} from "@prisma/client";
import {BookingService} from "../../../src/Business/BookingService";
import {IRoomRepository} from "../../../src/RepositoryInterfaces/IRoomRepository";
import {RoomRepository} from "../../../src/Repository/RoomRepository/RoomRepository";
import {IBookingRepository} from "../../../src/RepositoryInterfaces/IBookingRepository";
import {BookingRepository} from "../../../src/Repository/BookingRepository/BookingRepository";
import {IBookingLogRepository} from "../../../src/RepositoryInterfaces/IBookingLogRepository";
import {BookingLogRepository} from "../../../src/Repository/BookingLogRepository/BookingLogRepository";
import {ILogger} from "../../../src/RepositoryInterfaces/ILogger";
import {ConsoleLogger} from "../../../src/Repository/ConsoleLogger/ConsoleLogger";
import {InvalidCheckOutDateError} from "../../../src/Primitive/Errors/InvalidCheckOutDateError";

describe("BookingService", () => {
    // TODO: test RoomRepository, BookingRepository, BookingLogRepository first. Then do this one.

    // Initialize required dependency (in this case, repositories)
    const databaseClient = new PrismaClient();
    const roomRepository: IRoomRepository = new RoomRepository(databaseClient);
    const bookingRepository: IBookingRepository = new BookingRepository(databaseClient);
    const bookingLogRepository: IBookingLogRepository = new BookingLogRepository(databaseClient);
    const logger: ILogger = new ConsoleLogger();

    beforeAll(async () => {
        // TODO: seed the database here!
    });

    afterAll(async () => {
        // TODO: destroy tables here!
    });

    it("should be able to create ConciergeService class", () => {
        expect(() => new BookingService(/* TODO: add your dependency injection! */))
            .not
            .toThrowError();
    });

    it("should throw InvalidCheckOutDateError invalid checkout date", async () => {
        const bookingService = new BookingService(roomRepository, bookingRepository, bookingLogRepository, logger);

        expect(() => bookingService.book(new Date(2025), new Date(2020), 1))
            .rejects
            .toThrowError(new InvalidCheckOutDateError());
    });

    // Happy flow
    it.todo("should be able to successfully book a room");

    it.todo("should be able to cancel a room to existing booking id");

    it.todo("should be able to check in to existing booking id");

    it.todo("should be abel to check out to existing booking id");

    // Not so happy flow
    it.todo("should throw BookingNotFound on cancel with invalid or not found booking id");

    it.todo("should throw BookingNotFound on checkIn with invalid or not found booking id");

    it.todo("should throw BookingNotFound on checkOut with invalid or not found booking id");
});