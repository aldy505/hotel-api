import { z } from "zod";

export const SearchRoomRequest = z.object({
    capacity: z.number().optional(),
    floor: z.number().optional()
});