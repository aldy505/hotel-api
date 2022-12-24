import {Room} from "../Primitive/Room";

export interface IRoomRepository {
    create(room: Room): Promise<number>
    listAll(): Promise<Room[]>
    listByCapacity(capacity: number): Promise<Room[]>
}