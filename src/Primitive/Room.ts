import {InvalidArgumentError} from "./Errors/InvalidArgumentError";

export class Room {
    constructor(
        public readonly id: number,
        public readonly capacity: number,
        public readonly floor: number
    ) {
        if (capacity < 0) throw new InvalidArgumentError("capacity");
        if (floor < 0) throw new InvalidArgumentError("floor");
    }
}