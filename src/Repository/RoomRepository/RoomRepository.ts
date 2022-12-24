import {PrismaClient} from "@prisma/client";
import {IRoomRepository} from "../../RepositoryInterfaces/IRoomRepository";
import {InvalidArgumentError} from "../../Primitive/Errors/InvalidArgumentError";
import {Room} from "../../Primitive/Room";

export class RoomRepository implements IRoomRepository {
    constructor(
        private readonly databaseClient: PrismaClient
    ) {
        if (databaseClient === undefined) throw new InvalidArgumentError("databaseClient");
    }

    async create(room: Room): Promise<number> {
        const insertedRoom = await this.databaseClient.room.create({
            data: {
                capacity: room.capacity,
                floor: room.floor
            },
            select: {
                id: true
            }
        });

        return insertedRoom.id;
    }

    async listAll(): Promise<Room[]> {
        const rooms = await this.databaseClient.room.findMany({});

        // Convert model from Prisma to our model from Primitive directory
        const primitiveRooms: Room[] = [];
        for (let i = 0; i < rooms.length; i++) {
            primitiveRooms.push(new Room(rooms[i].id, rooms[i].capacity, rooms[i].floor));
        }

        return primitiveRooms;
    }

    async listByCapacity(capacity: number): Promise<Room[]> {
        // TODO: implement me!
    }
}