/** Юридические тексты сайта: полные редакции + тип раздела. */

export type { LegalSection } from "@/content/legal-types";

import {
  buildConsentPdSections,
  buildPrivacyPolicySections,
  buildPublicOfferSections,
  buildSiteRulesSections,
} from "@/content/legal-site-documents";

export const PRIVACY_POLICY_SECTIONS = buildPrivacyPolicySections();
export const OFFER_SECTIONS = buildPublicOfferSections();
export const CONSENT_SECTIONS = buildConsentPdSections();
export const SITE_RULES_SECTIONS = buildSiteRulesSections();
