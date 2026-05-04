import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";

export async function resolveAssistantThread(
  threadId: string | undefined,
  ipHash: string,
  locale: string,
): Promise<{ threadId: string } | null> {
  try {
    if (threadId) {
      const existing = await prisma.siteAssistantThread.findUnique({
        where: { id: threadId },
        select: { id: true, ipHash: true },
      });
      if (existing && existing.ipHash === ipHash) {
        await prisma.siteAssistantThread.update({
          where: { id: existing.id },
          data: { updatedAt: new Date(), locale: locale.slice(0, 16) },
        });
        return { threadId: existing.id };
      }
    }

    const created = await prisma.siteAssistantThread.create({
      data: { ipHash, locale: locale.slice(0, 16) || "ru" },
      select: { id: true },
    });
    return { threadId: created.id };
  } catch (e) {
    logger.warn({ err: e, msg: "site_assistant_thread_skip" });
    return null;
  }
}

export async function appendAssistantMessage(threadId: string, role: "user" | "assistant", content: string): Promise<void> {
  try {
    await prisma.siteAssistantMessage.create({
      data: {
        threadId,
        role,
        content,
      },
    });
    await prisma.siteAssistantThread.update({
      where: { id: threadId },
      data: { updatedAt: new Date() },
    });
  } catch (e) {
    logger.warn({ err: e, msg: "site_assistant_message_skip", threadId, role });
  }
}
