import {describe, it, expect, beforeAll, afterAll} from "vitest";
import {PrismaClient} from "@prisma/client";
import {RoomRepository} from "../../../src/Repository/RoomRepository/RoomRepository";
import {InvalidArgumentError} from "../../../src/Primitive/Errors/InvalidArgumentError";
import {Room} from "../../../src/Primitive/Room";

describe("RoomRepository", () => {
    const databaseClient = new PrismaClient();

    // Stolen from Stackoverflow: https://stackoverflow.com/a/7228322/3153224
    function randomIntFromInterval(min: number, max: number) { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const capacityCounter = new Map<number, number>;

    beforeAll(async () => {
        // Seed the database with fake data
        const fakeData: { capacity: number, floor: number }[] = [];
        for (let i = 0; i < 500; i++) {
            const capacity = randomIntFromInterval(1, 10);
            fakeData.push({
                capacity: capacity,
                floor: randomIntFromInterval(1, 3)
            });

            const latestCapacity: number = capacityCounter.get(capacity) ?? 0;
            capacityCounter.set(capacity, latestCapacity + 1);
        }

        await databaseClient.room.createMany({
            data: fakeData
        });
    });

    afterAll(async () => {
        await databaseClient.room.deleteMany({});
    });

    it("should be able to create RoomRepository instance", () => {
        expect(() => new RoomRepository(databaseClient))
            .not
            .toThrowError();
    });

    it("should throw InvalidArgumentError for undefined constructor input", () => {
        // @ts-ignore testing purposes
        expect(() => new RoomRepository(undefined))
            .toThrowError(new InvalidArgumentError("databaseClient"));
    });

    it("should be able to list all rooms", async () => {
        const repository = new RoomRepository(databaseClient);

        const rooms = await repository.listAll();

        expect(rooms.length).toBeGreaterThanOrEqual(500);
    });

    it("should be able to list room by capacity", async () => {
        const repository = new RoomRepository(databaseClient);

        const rooms = await repository.listByCapacity(1);
        const capacityOfFive = capacityCounter.get(5);

        expect(rooms.length).toBe(capacityOfFive);
    });

    it("should be able to create a new room", async () => {
        const repository = new RoomRepository(databaseClient);

        const roomId = await repository.create(new Room(600, 12, 5));

        const rooms = await repository.listByCapacity(12);

        expect(rooms.length).toBe(1);

        if (rooms.length > 0) {
            expect(rooms[0].id).toBe(roomId);
        }
    });
});