import {describe, expect, it} from "vitest";
import {InvalidArgumentError} from "../../../../src/Primitive/Errors/InvalidArgumentError";

describe("InvalidArgumentError", () => {
    it("should be able to create the class", () => {
        const instance = new InvalidArgumentError("field");

        expect(instance.name).toBe("InvalidArgumentError");
        expect(instance.message).toBe("field");
    });
});