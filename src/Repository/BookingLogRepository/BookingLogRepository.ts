import {IBookingLogRepository} from "../../RepositoryInterfaces/IBookingLogRepository";
import {PrismaClient} from "@prisma/client";
import {InvalidArgumentError} from "../../Primitive/Errors/InvalidArgumentError";
import {Status} from "../../Primitive/Status";
import {BookingLog} from "../../Primitive/BookingLog";

export class BookingLogRepository implements IBookingLogRepository {
    constructor(
        private readonly databaseClient: PrismaClient
    ) {
        if (databaseClient === undefined) throw new InvalidArgumentError("databaseClient");
    }

    async create(bookingId: number, status: Status): Promise<void> {
        // TODO: implement me!
    }

    async findByBookingId(bookingId: number): Promise<BookingLog[]> {
        // TODO: implement me!
    }
}