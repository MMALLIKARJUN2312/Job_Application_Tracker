import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { test, expect } from "vitest";
import { MemoryRouter } from "react-router";
import { server } from "../../test/mocks/server";
import { http, HttpResponse } from "msw";
import Jobs from "../Jobs";

const createTestClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
      },
    },
  });

/*TEST 1 — Loading State*/
test("shows loading state initially", async () => {
  const client = createTestClient();

  render(
    <QueryClientProvider client={client}>
      <MemoryRouter>
        <Jobs />
      </MemoryRouter>
    </QueryClientProvider>
  );

  expect(await screen.findByText(/loading/i)).toBeInTheDocument();
});

/*TEST 2 — Success State*/
test("renders job data correctly", async () => {
  const client = createTestClient();

  render(
    <QueryClientProvider client={client}>
      <MemoryRouter>
        <Jobs />
      </MemoryRouter>
    </QueryClientProvider>
  );

  expect(await screen.findByText("Google")).toBeInTheDocument();
  expect(screen.getByText("SWE")).toBeInTheDocument();
});

/*TEST 3 —  Error State*/
test("shows error message on API failure", async () => {
  server.use(
    http.get("http://localhost:5000/api/jobs", () => {
      return HttpResponse.error();
    })
  );

  const client = createTestClient();

  render(
    <QueryClientProvider client={client}>
      <MemoryRouter>
        <Jobs />
      </MemoryRouter>
    </QueryClientProvider>
  );

  expect(await screen.findByText(/failed/i)).toBeInTheDocument();
});