import {z} from "zod";

export const CheckInRequest = z.object({
    bookingId: z.string().min(1, { message: "bookingId cannot be an empty string" })
});