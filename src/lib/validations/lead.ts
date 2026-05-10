import { Urgency } from "@prisma/client";
import { z } from "zod";

export type LeadValidationCopy = {
  nameMin: string;
  companyMin: string;
  phone: string;
  emailInvalid: string;
  headcountMin: string;
  consent: string;
};

export type LeadStep0Copy = Pick<LeadValidationCopy, "nameMin" | "companyMin" | "phone" | "emailInvalid">;

export type LeadStep1Copy = Pick<LeadValidationCopy, "headcountMin"> & {
  duplicateProfession: string;
};

const professionLineSchema = z.object({
  slug: z.string().min(1).max(64),
  headcount: z.coerce.number().int().min(1).max(5000),
});

/** Шаги мультистеп-формы `/zayavka` (клиентская валидация перед API). */
export function createLeadMultistepStep0Schema(m: LeadStep0Copy) {
  return z.object({
    contactName: z.string().min(2, m.nameMin).max(120),
    companyName: z.string().min(2, m.companyMin).max(200),
    contactPhone: z.string().min(5, m.phone).max(40),
    contactEmail: z.preprocess(
      (val) => (typeof val === "string" && val.trim() === "" ? undefined : val),
      z.string().email(m.emailInvalid).max(200).optional(),
    ),
  });
}

export function createLeadMultistepStep1Schema(m: LeadStep1Copy) {
  return z
    .object({
      serviceType: z.string().min(2).max(64),
      professionLines: z
        .array(
          z.object({
            slug: z.string().min(1).max(64),
            headcount: z.coerce.number().int().min(1, m.headcountMin).max(5000),
          }),
        )
        .min(1)
        .max(8),
      city: z.string().min(1).max(120),
    })
    .superRefine((data, ctx) => {
      const slugs = data.professionLines.map((r) => r.slug);
      if (new Set(slugs).size !== slugs.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: m.duplicateProfession,
          path: ["professionLines"],
        });
      }
    });
}

export function createLeadMultistepStep2Schema(m: Pick<LeadValidationCopy, "consent">) {
  return z.object({
    comment: z.string().max(5000).optional().default(""),
    consent: z.boolean().refine((v) => v === true, {
      message: m.consent,
    }),
  });
}

export const leadCreateSchema = z
  .object({
    companyName: z.string().min(2).max(200),
    contactName: z.string().min(2).max(120),
    contactPhone: z.string().min(5).max(40),
    contactEmail: z.preprocess(
      (val) => (typeof val === "string" && val.trim() === "" ? undefined : val),
      z.string().email().max(200).optional(),
    ),
    serviceType: z.string().min(2).max(64),
    professionLines: z.array(professionLineSchema).min(1).max(8),
    city: z.string().min(2).max(120),
    budgetMonthly: z.coerce.number().int().optional(),
    urgency: z.nativeEnum(Urgency).optional().default(Urgency.NORMAL),
    comment: z.string().max(5000).optional(),
    source: z.string().max(64).default("form"),
    sourceUrl: z.string().url().optional().or(z.literal("")),
    utmSource: z.string().max(120).optional(),
    utmMedium: z.string().max(120).optional(),
    utmCampaign: z.string().max(120).optional(),
  })
  .superRefine((data, ctx) => {
    const slugs = data.professionLines.map((r) => r.slug);
    if (new Set(slugs).size !== slugs.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "duplicate_profession_lines",
        path: ["professionLines"],
      });
    }
  });
