import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, test, expect } from "vitest";
import Jobs from "../Jobs";
import { vi } from "vitest";
import { MemoryRouter } from "react-router";

// Mock API
vi.mock("../../api/getJobs", () => ({
  fetchJobs: () =>
    Promise.resolve({
      jobs: [
        {
          _id: "1",
          company: "Google",
          position: "SWE",
          status: "applied"
        }
      ]
    })
}));

vi.mock("../../api/jobs", () => ({
  getJobStats: () =>
    Promise.resolve({
      applied: 1,
      interview: 0,
      offer: 0,
      rejected: 0
    }),
  deleteJob: () => Promise.resolve({}),
}));

const createTestClient = () =>
  new QueryClient({
    defaultOptions: { queries: { retry: false } }
  });

test("renders jobs page heading", async () => {
  const client = createTestClient();

  render(
    <QueryClientProvider client={client}>
      <MemoryRouter>
        <Jobs />
      </MemoryRouter>
    </QueryClientProvider>
  );

  expect(await screen.findByText(/Your Job Applications/i)).toBeInTheDocument();
});