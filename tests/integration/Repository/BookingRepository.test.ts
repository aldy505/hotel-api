import {PrismaClient} from "@prisma/client";
import {describe, expect, it, afterAll, beforeAll} from "vitest";

describe("BookingRepository", () => {
    const databaseClient = new PrismaClient();

    beforeAll(async () => {
        // TODO: seed your database here!
    });

    afterAll(async () => {
        // Destroy every data on the booking schema
        await databaseClient.booking.deleteMany({});
    });

    it.todo("should be able to create BookingRepository class");

    it.todo("should throw InvalidArgumentException for undefined databaseClient");

    it.todo("should be able to find booking by date");

    it.todo("should be able to find booking by id");

    it.todo("should be able to find booking by room id");

    it.todo("should be able to list all booking");

    it.todo("should be able to create a new booking");
});