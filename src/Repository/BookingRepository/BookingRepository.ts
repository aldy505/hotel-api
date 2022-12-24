import {IBookingRepository} from "../../RepositoryInterfaces/IBookingRepository";
import {PrismaClient} from "@prisma/client";
import {InvalidArgumentError} from "../../Primitive/Errors/InvalidArgumentError";
import {Booking} from "../../Primitive/Booking";

export class BookingRepository implements IBookingRepository {
    constructor(
        private readonly databaseClient: PrismaClient
    ) {
        if (databaseClient === undefined) throw new InvalidArgumentError("databaseClient");
    }

    async create(booking: Booking): Promise<number> {
        const insertedBooking = await this.databaseClient.booking.create({
            select: {
                id: true
            },
            data: {
                roomId: booking.room.id,
                checkIn: booking.checkIn,
                checkOut: booking.checkOut,
                BookingLog: {
                    create: {
                        status: "Booked"
                    }
                }
            }
        });

        return insertedBooking.id;
    }

    async findByDate(checkIn: Date, checkOut: Date): Promise<Booking[]> {
        // TODO: implement me!
    }

    async findById(bookingId: number): Promise<Booking> {
        // TODO: implement me!
    }

    async findByRoom(roomId: number): Promise<Booking[]> {
        // TODO: implement me!
    }

    async listAll(): Promise<Booking[]> {
        // TODO: implement me!
    }
}