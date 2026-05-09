import nodemailer from "nodemailer";
import { site } from "@/config/site";
import { logger } from "@/lib/logger";

function smtpConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST?.trim() && process.env.SMTP_USER?.trim() && process.env.SMTP_PASSWORD?.trim());
}

/** Скрытые копии: SMTP_BCC и ADMIN_KP_NOTIFY_EMAIL (через запятую). */
function collectBcc(): string | string[] | undefined {
  const raw = [
    ...(process.env.SMTP_BCC?.split(",") ?? []),
    ...(process.env.ADMIN_KP_NOTIFY_EMAIL?.split(",") ?? []),
  ];
  const emails = raw.map((s) => s.trim()).filter(Boolean);
  const unique = Array.from(new Set(emails));
  if (unique.length === 0) return undefined;
  if (unique.length === 1) return unique[0];
  return unique;
}

export async function sendKpDraftEmail(params: {
  to: string;
  pdfBuffer: Buffer;
  leadId: string;
  contactName: string;
}): Promise<{ ok: true } | { ok: false; reason: string }> {
  if (!smtpConfigured()) {
    return { ok: false, reason: "smtp_not_configured" };
  }

  const host = process.env.SMTP_HOST!.trim();
  const port = Number(process.env.SMTP_PORT ?? "465");
  const secure = process.env.SMTP_SECURE !== "false";
  const user = process.env.SMTP_USER!.trim();
  const pass = process.env.SMTP_PASSWORD!.trim();
  const from =
    process.env.MAIL_FROM?.trim() ||
    `"${site.brandName.replace(/_/g, " ")}" <${user}>`;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  const brand = site.brandName.replace(/_/g, " ");
  const fn = `KP-chernovik-${params.leadId.slice(0, 10)}.pdf`;

  try {
    await transporter.sendMail({
      from,
      to: params.to,
      bcc: collectBcc(),
      subject: `${brand}: черновик коммерческого предложения по заявке`,
      text: [
        `Здравствуйте${params.contactName ? `, ${params.contactName}` : ""}.`,
        "",
        "Во вложении — автоматический черновик КП с ориентирами по ставке и месячному фону по данным вашей заявки.",
        "Документ не заменяет индивидуальное согласование: менеджер свяжется с вами для уточнения условий объекта.",
        "",
        `Идентификатор заявки: ${params.leadId}`,
        `${site.url}`,
      ].join("\n"),
      attachments: [
        {
          filename: fn,
          content: params.pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });
    return { ok: true };
  } catch (e) {
    logger.error({ err: e, msg: "kp_draft_email_failed", leadId: params.leadId });
    return { ok: false, reason: "send_failed" };
  }
}
