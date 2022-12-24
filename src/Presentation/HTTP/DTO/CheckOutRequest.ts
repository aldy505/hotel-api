import {z} from "zod";

export const CheckOutRequest = z.object({
    bookingId: z.string().min(1, { message: "bookingId cannot be an empty string" })
});