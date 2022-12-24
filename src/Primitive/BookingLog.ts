import {Status} from "./Status";
import {InvalidArgumentError} from "./Errors/InvalidArgumentError";

export class BookingLog {
    constructor(
        public readonly id: number,
        public readonly status: Status,
        public readonly timestamp: Date
    ) {
        if (status === undefined) throw new InvalidArgumentError("status");
        if (timestamp === undefined) throw new InvalidArgumentError("timestamp");
    }
}