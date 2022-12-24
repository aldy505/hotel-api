import {describe, it, expect, afterAll, beforeAll} from "vitest";
import {PrismaClient} from "@prisma/client";
import {ConciergeService} from "../../../src/Business/ConciergeService";
import {IRoomRepository} from "../../../src/RepositoryInterfaces/IRoomRepository";
import {RoomRepository} from "../../../src/Repository/RoomRepository/RoomRepository";
import {IBookingRepository} from "../../../src/RepositoryInterfaces/IBookingRepository";
import {BookingRepository} from "../../../src/Repository/BookingRepository/BookingRepository";
import {IBookingLogRepository} from "../../../src/RepositoryInterfaces/IBookingLogRepository";
import {BookingLogRepository} from "../../../src/Repository/BookingLogRepository/BookingLogRepository";
import {ILogger} from "../../../src/RepositoryInterfaces/ILogger";
import {ConsoleLogger} from "../../../src/Repository/ConsoleLogger/ConsoleLogger";

describe("ConciergeService", () => {
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
        expect(() => new ConciergeService(/* TODO: add your dependency injection! */))
            .not
            .toThrowError();
    });

    it.todo("should be able to list available rooms");

    it.todo("should be able to list booking by status");
});