import {IRoomService} from "../BusinessInterfaces/IRoomService";
import {IRoomRepository} from "../RepositoryInterfaces/IRoomRepository";
import {ILogger} from "../RepositoryInterfaces/ILogger";
import {Room} from "../Primitive/Room";

export class RoomService implements IRoomService {
    private readonly _roomRepository: IRoomRepository;
    private readonly _logger: ILogger;

    constructor(roomRepository: IRoomRepository, logger: ILogger) {
        this._roomRepository = roomRepository;
        this._logger = logger;
    }

    async search(capacity?: number, floor?: number): Promise<Room[]> {
        if (capacity !== undefined) {
            const rooms = await this._roomRepository.listByCapacity(capacity);

            if (floor !== undefined) {
                // We filter again by floor. I use simple programming concept
                // called "for loop" or "iteration" to make people understand
                // my code easier.
                const filteredRooms: Room[] = [];
                for (let i = 0; i < rooms.length; i++) {
                    if (rooms[i].floor === floor) {
                        filteredRooms.push(rooms[i]);
                    }

                    // If it's not at floor, we will just let the for loop continues.
                }

                return filteredRooms;
            }

            // It's not filtered by floor, we will just return rooms.
            return rooms;
        }

        const rooms = await this._roomRepository.listAll();

        // We will filter floor once again. But this time, without comments.
        if (floor !== undefined) {
            const filteredRooms: Room[] = [];
            for (let i = 0; i < rooms.length; i++) {
                if (rooms[i].floor === floor) {
                    filteredRooms.push(rooms[i]);
                }
            }

            return filteredRooms;
        }

        return rooms;
    }
}