import { Urgency } from "@prisma/client";
import { z } from "zod";

/** Шаги мультистеп-формы `/zayavka` (клиентская валидация перед API). */
export const leadMultistepStep0Schema = z.object({
  contactName: z.string().min(2, "Имя — минимум 2 символа").max(120),
  companyName: z.string().min(2, "Компания — минимум 2 символа").max(200),
  contactPhone: z.string().min(5, "Укажите телефон").max(40),
});

export const leadMultistepStep1Schema = z.object({
  serviceType: z.string().min(2).max(64),
  profession: z.string().min(1).max(64),
  city: z.string().min(1).max(120),
  headcount: z.coerce.number().int().min(1, "Минимум 1").max(5000),
});

export const leadMultistepStep2Schema = z.object({
  comment: z.string().max(5000).optional().default(""),
  consent: z.boolean().refine((v) => v === true, {
    message: "Нужно согласие на обработку персональных данных.",
  }),
});

export const leadCreateSchema = z.object({
  companyName: z.string().min(2).max(200),
  contactName: z.string().min(2).max(120),
  contactPhone: z.string().min(5).max(40),
  contactEmail: z.string().max(200).optional(),
  serviceType: z.string().min(2).max(64),
  profession: z.string().min(2).max(64),
  city: z.string().min(2).max(120),
  headcount: z.coerce.number().int().min(1).max(5000),
  budgetMonthly: z.coerce.number().int().optional(),
  urgency: z.nativeEnum(Urgency).optional().default(Urgency.NORMAL),
  comment: z.string().max(5000).optional(),
  source: z.string().max(64).default("form"),
  sourceUrl: z.string().url().optional().or(z.literal("")),
  utmSource: z.string().max(120).optional(),
  utmMedium: z.string().max(120).optional(),
  utmCampaign: z.string().max(120).optional(),
});
