import console from "node:console";
import {ILogger} from "../../RepositoryInterfaces/ILogger";

export class ConsoleLogger implements ILogger {
    private readonly prefix: string;
    constructor(prefix = "HotelAPI") {
        this.prefix = prefix;
    }

    error(message: string): void {
        console.error(`[${this.prefix}] ${message}`);
    }

    info(message: string): void {
        console.info(`[${this.prefix}] ${message}`);
    }

    warn(message: string): void {
        console.warn(`[${this.prefix}] ${message}`);
    }
}