import {Room} from "../Primitive/Room";

/**
 * I don't really need to explain this one, do I?
 */
export interface IRoomService {
    /**
     * Search the room based on the function parameter (that is capacity and floor).
     * Both can be null to search everything. But, the value of capacity and floor
     * cannot be lower than 1 if provided. Value of 0 is considered invalid, and it will
     * throw an error.
     *
     * If nothing is found, the result will be an empty array. No error or exception
     * will be thrown.
     *
     * @param capacity Room capacity, cannot be lower than 1
     * @param floor Floor, cannot be lower than 1
     */
    search(capacity?: number, floor?: number): Promise<Room[]>
}