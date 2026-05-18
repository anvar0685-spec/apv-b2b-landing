/** Человекочитаемый срок сотрудничества для кейсов (RU). */
export function formatCaseCooperationRu(months: number): string {
  if (!Number.isFinite(months) || months <= 0) return "—";
  if (months === 18) return "1,5 года";
  if (months >= 12 && months % 12 === 0) {
    const y = months / 12;
    const mod100 = y % 100;
    const mod10 = y % 10;
    if (mod100 >= 11 && mod100 <= 14) return `${y} лет`;
    if (mod10 === 1) return `${y} год`;
    if (mod10 >= 2 && mod10 <= 4) return `${y} года`;
    return `${y} лет`;
  }
  return `${months} мес.`;
}
