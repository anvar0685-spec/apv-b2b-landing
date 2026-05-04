import { createHash } from "crypto";
import { getRedis } from "./redis";
import { logger } from "./logger";

const memory = new Map<string, { count: number; resetAt: number }>();

function hashKey(ip: string, route: string) {
  return createHash("sha256").update(`${ip}:${route}`).digest("hex").slice(0, 32);
}

export async function rateLimitOrThrow(opts: {
  ip: string;
  route: string;
  limit: number;
  windowSec: number;
}) {
  const key = `rl:${hashKey(opts.ip, opts.route)}`;
  const redis = getRedis();

  if (redis) {
    try {
      const n = await redis.incr(key);
      if (n === 1) await redis.expire(key, opts.windowSec);
      if (n > opts.limit) {
        throw new Error("RATE_LIMITED");
      }
      return;
    } catch (e) {
      if (e instanceof Error && e.message === "RATE_LIMITED") throw e;
      logger.warn({ err: e, msg: "rate_limit_redis_fallback_memory", route: opts.route });
    }
  }

  const now = Date.now();
  const cur = memory.get(key);
  if (!cur || cur.resetAt < now) {
    memory.set(key, { count: 1, resetAt: now + opts.windowSec * 1000 });
    return;
  }
  cur.count += 1;
  if (cur.count > opts.limit) {
    throw new Error("RATE_LIMITED");
  }
}
