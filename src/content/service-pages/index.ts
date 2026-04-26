import type { ServicePageBilingual } from "./types";
import { autsorsingPage } from "./autsorsing.data";
import { autstaffingPage } from "./autstaffing.data";
import { managedPage } from "./managed.data";
import { migrationPage } from "./migration.data";
import { recruitingPage } from "./recruiting.data";

export const SERVICE_PAGES_BILINGUAL: Record<string, ServicePageBilingual> = {
  autsorsing: autsorsingPage,
  autstaffing: autstaffingPage,
  "upravlyaemyy-podryad": managedPage,
  "migracionnyy-uchet": migrationPage,
  "podbor-personala": recruitingPage,
};

export type { ServiceFAQ, ServiceLocaleBlock, ServicePageBilingual } from "./types";
