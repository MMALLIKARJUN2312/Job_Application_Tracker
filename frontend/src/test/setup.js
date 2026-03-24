import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./mocks/server";

// Start server before all tests
beforeAll(() => server.listen());

// Reset handlers after each test
afterEach(() => server.resetHandlers());

// Close server after tests
afterAll(() => server.close());