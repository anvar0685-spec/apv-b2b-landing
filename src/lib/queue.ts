import { Queue } from "bullmq";
import { logger } from "./logger";

let emailQueue: Queue | null = null;

/** BullMQ stub: очередь создаётся только при наличии Redis. */
export function getEmailQueue(): Queue | null {
  const url = process.env.REDIS_URL;
  if (!url) return null;
  if (!emailQueue) {
    emailQueue = new Queue("email", {
      connection: { url },
      defaultJobOptions: { removeOnComplete: true, removeOnFail: 500 },
    });
    logger.info({ msg: "bullmq_email_queue_ready" });
  }
  return emailQueue;
}
