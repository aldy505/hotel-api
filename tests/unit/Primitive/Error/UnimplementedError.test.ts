import {describe, it, expect} from "vitest";
import {UnimplementedError} from "../../../../src/Primitive/Errors/UnimplementedError";

describe("UnimplementedError", () => {
    it("should be able to create the class", () => {
        const instance = new UnimplementedError();

        expect(instance.name).toBe("Error");
        expect(instance.message).toBe("Unimplemented");
    });
});