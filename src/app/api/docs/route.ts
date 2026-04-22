import { NextResponse } from "next/server";

/** Минимальный OpenAPI 3.1 — расширится в Sprint 2–3. */
const spec = {
  openapi: "3.1.0",
  info: {
    title: "APV B2B API",
    version: "1.0.0",
    description: "REST API v1 (лиды, аналитика, контент).",
  },
  paths: {
    "/api/v1/leads": {
      post: {
        summary: "Создать лид",
        responses: { "200": { description: "OK" } },
      },
    },
    "/api/v1/analytics/events": {
      post: {
        summary: "Записать событие аналитики",
        responses: { "200": { description: "OK" } },
      },
    },
    "/api/v1/health": {
      get: {
        summary: "Healthcheck",
        responses: { "200": { description: "OK" } },
      },
    },
  },
};

export async function GET() {
  return NextResponse.json(spec);
}
