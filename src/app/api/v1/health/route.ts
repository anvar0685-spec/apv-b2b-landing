import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getRedis } from "@/lib/redis";

export const dynamic = "force-dynamic";

export async function GET() {
  let db: "ok" | "error" | "skipped" = "skipped";
  if (process.env.DATABASE_URL) {
    try {
      await prisma.$queryRaw`SELECT 1`;
      db = "ok";
    } catch {
      db = "error";
    }
  }
  const redis = getRedis();
  let redisStatus = "skipped";
  if (redis) {
    try {
      await redis.ping();
      redisStatus = "ok";
    } catch {
      redisStatus = "error";
    }
  }
  return NextResponse.json({
    ok: db !== "error",
    db,
    redis: redisStatus,
    ts: new Date().toISOString(),
  });
}
