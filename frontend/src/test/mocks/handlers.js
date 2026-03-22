import { http, HttpResponse } from "msw";

// Mock API endpoints
export const handlers = [
  http.get("http://localhost:5000/api/jobs", () => {
    return HttpResponse.json({
      jobs: [
        {
          _id: "1",
          company: "Google",
          position: "SWE",
          status: "applied",
        },
      ],
    });
  }),

  http.get("http://localhost:5000/api/jobs/stats", () => {
    return HttpResponse.json({
      applied: 1,
      interview: 0,
      offer: 0,
      rejected: 0,
    });
  }),

  http.delete("http://localhost:5000/api/jobs/:id", () => {
    return HttpResponse.json({ success: true });
  }),
];