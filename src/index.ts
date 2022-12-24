import {PrismaClient} from "@prisma/client";
import {ConsoleLogger} from "./Repository/ConsoleLogger/ConsoleLogger";
import {RoomRepository} from "./Repository/RoomRepository/RoomRepository";
import {BookingLogRepository} from "./Repository/BookingLogRepository/BookingLogRepository";
import {BookingRepository} from "./Repository/BookingRepository/BookingRepository";
import {BookingService} from "./Business/BookingService";
import {RoomService} from "./Business/RoomService";
import {HttpPresenter} from "./Presentation/HTTP/App";
import {GrpcPresenter} from "./Presentation/gRPC/App";
import {IPresentation} from "./PresentationInterfaces/IPresentation";

const httpHostname: string = process.env?.HTTP_HOSTNAME ?? "localhost";
const httpPort: string = process.env?.HTTP_PORT ?? "5000";
const grpcHostname: string = process.env?.GRPC_HOSTNAME ?? "localhost";
const grpcPort: string = process.env?.GRPC_PORT ?? "5001";

const databaseUrl: string = process.env?.DATABASE_URL ?? "postgresql://postgres:password@localhost:5432/hotel?schema=public&sslmode=disable";
const databaseClient = new PrismaClient({ datasources: { db: { url: databaseUrl } }});

// Create repository layers
const consoleLoggerRepository = new ConsoleLogger();
const roomRepository = new RoomRepository(databaseClient);
const bookingLogRepository = new BookingLogRepository(databaseClient);
const bookingRepository = new BookingRepository(databaseClient);

// Create business layers
const bookingService = new BookingService(roomRepository, bookingRepository, bookingLogRepository, consoleLoggerRepository);
const roomService = new RoomService(/* TODO: inject the dependencies yourself! */);

// Create presentation layers
const httpPresentation = new HttpPresenter(roomService, bookingService, consoleLoggerRepository, httpHostname, httpPort);
const grpcPresentation = new GrpcPresenter(roomService, bookingService, consoleLoggerRepository, grpcHostname, grpcPort);

const presenters: IPresentation[] = [httpPresentation, grpcPresentation];

// Register presentation routes
const startMethod: (() => void)[] = [];
for (const presenter of presenters) {
    presenter.register();
    startMethod.push(presenter.run);
}

await Promise.all(startMethod);