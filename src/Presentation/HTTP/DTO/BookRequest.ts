import {z} from "zod";

export const BookRequest = z.object({
    checkIn: z.date({
        required_error: "checkIn field is required",
        invalid_type_error: "checkIn field must be a type of date",
        description: "specify the date in which the user wants to check in"
    }),
    checkOut: z.date({
        required_error: "checkOut field is required",
        invalid_type_error: "checkOut field must be a type of date",
        description: "specify the date in which the user wants to check out"
    }),
    capacity: z.number({
        required_error: "capacity field is required",
        invalid_type_error: "capacity field must be a number"
    }).min(1, { message: "minimum capacity cannot be less than 1" })
});