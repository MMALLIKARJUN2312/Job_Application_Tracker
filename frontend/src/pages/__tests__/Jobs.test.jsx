import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { test, expect } from "vitest";
import Jobs from "../Jobs";
import { MemoryRouter } from "react-router";

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