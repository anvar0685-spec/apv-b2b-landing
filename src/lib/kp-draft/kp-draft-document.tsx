import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { ReactElement } from "react";

const ACCENT = "#0d9488";
const PRIMARY = "#071525";
const MUTED = "#737373";
const SURFACE = "#f4f6f9";
const RULE = "#e5e5e5";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    fontSize: 10,
    paddingTop: 36,
    paddingBottom: 40,
    paddingHorizontal: 44,
    color: PRIMARY,
    lineHeight: 1.45,
  },
  accentBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 8,
    backgroundColor: ACCENT,
  },
  brand: {
    fontSize: 9,
    color: MUTED,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 4,
    color: PRIMARY,
  },
  subtitle: {
    fontSize: 10,
    color: MUTED,
    marginBottom: 18,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: SURFACE,
    borderWidth: 1,
    borderColor: RULE,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    marginBottom: 16,
  },
  badgeText: {
    fontSize: 9,
    color: MUTED,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    marginBottom: 8,
    marginTop: 12,
    color: PRIMARY,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: RULE,
    paddingVertical: 6,
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  cellLabel: {
    width: "42%",
    fontSize: 9,
    color: MUTED,
  },
  cellValue: {
    width: "58%",
    fontSize: 10,
    fontWeight: 400,
  },
  box: {
    backgroundColor: SURFACE,
    borderWidth: 1,
    borderColor: RULE,
    borderRadius: 6,
    padding: 12,
    marginTop: 8,
  },
  numbersRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  numCol: {
    width: "31%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: RULE,
    borderRadius: 4,
    padding: 10,
    minHeight: 52,
  },
  numLabel: {
    fontSize: 8,
    color: MUTED,
    marginBottom: 6,
  },
  /** Только цифры — «₽» выносим отдельным Text, иначе в PDF наезжают глифы */
  numFigures: {
    fontSize: 12,
    fontWeight: 700,
    color: ACCENT,
    paddingRight: 5,
  },
  numCurrency: {
    fontSize: 11,
    fontWeight: 700,
    color: ACCENT,
  },
  moneyRow: {
    flexDirection: "row",
    alignItems: "baseline",
    flexWrap: "nowrap",
    justifyContent: "flex-end",
    width: "100%",
  },
  cellMoneyWrap: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "flex-end",
    width: "100%",
  },
  cellMoneyFigures: {
    fontSize: 10,
    fontWeight: 400,
    paddingRight: 5,
  },
  cellMoneySuffix: {
    fontSize: 9,
    color: PRIMARY,
  },
  disclaimer: {
    marginTop: 18,
    fontSize: 8,
    color: MUTED,
    lineHeight: 1.55,
  },
  footer: {
    position: "absolute",
    bottom: 22,
    left: 44,
    right: 44,
    borderTopWidth: 1,
    borderTopColor: RULE,
    paddingTop: 8,
    fontSize: 8,
    color: MUTED,
  },
});

function formatMoneyRu(n: number): string {
  return n.toLocaleString("ru-RU");
}

/** Строка «цифры + суффикс» в правой колонке таблицы */
function CellMoneyLine(props: { figures: string; suffix: string }) {
  return (
    <View style={styles.cellMoneyWrap}>
      <Text style={styles.cellMoneyFigures}>{props.figures}</Text>
      <Text style={styles.cellMoneySuffix}>{props.suffix}</Text>
    </View>
  );
}

function CardMoney(props: { amount: number }) {
  return (
    <View style={styles.moneyRow}>
      <Text style={styles.numFigures}>{formatMoneyRu(props.amount)}</Text>
      <Text style={styles.numCurrency}>₽</Text>
    </View>
  );
}

export type KpDraftPdfProps = {
  brandName: string;
  legalLine: string;
  issuedAt: Date;
  leadIdShort: string;
  companyName: string;
  contactName: string;
  contactPhone: string;
  contactEmail?: string;
  professionRu: string;
  cityRu: string;
  headcount: number;
  serviceRu: string;
  comment?: string;
  hourlyBase: number;
  monthlyMid: number;
  low: number;
  high: number;
};

export function KpDraftDocument(props: KpDraftPdfProps): ReactElement {
  const dateStr = props.issuedAt.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.accentBar} fixed />
        <Text style={styles.brand}>{props.brandName}</Text>
        <Text style={styles.title}>Коммерческое предложение</Text>
        <Text style={styles.subtitle}>Черновик-ориентир по заявке от {dateStr}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            Не является публичной офертой. Итоговые условия — в согласованном КП и договоре. № заявки:{" "}
            {props.leadIdShort}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Заказчик</Text>
        <View style={styles.box}>
          <View style={styles.row}>
            <Text style={styles.cellLabel}>Организация</Text>
            <Text style={styles.cellValue}>{props.companyName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellLabel}>Контакт</Text>
            <Text style={styles.cellValue}>{props.contactName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellLabel}>Телефон</Text>
            <Text style={styles.cellValue}>{props.contactPhone}</Text>
          </View>
          {props.contactEmail ? (
            <View style={[styles.row, styles.rowLast]}>
              <Text style={styles.cellLabel}>E-mail</Text>
              <Text style={styles.cellValue}>{props.contactEmail}</Text>
            </View>
          ) : (
            <View style={[styles.row, styles.rowLast]}>
              <Text style={styles.cellLabel}>E-mail</Text>
              <Text style={styles.cellValue}>—</Text>
            </View>
          )}
        </View>

        <Text style={styles.sectionTitle}>Параметры запроса</Text>
        <View style={styles.box}>
          <View style={styles.row}>
            <Text style={styles.cellLabel}>Модель</Text>
            <Text style={styles.cellValue}>{props.serviceRu}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellLabel}>Профиль</Text>
            <Text style={styles.cellValue}>{props.professionRu}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellLabel}>Локация</Text>
            <Text style={styles.cellValue}>{props.cityRu}</Text>
          </View>
          <View style={[styles.row, styles.rowLast]}>
            <Text style={styles.cellLabel}>Численность (ориентир)</Text>
            <Text style={styles.cellValue}>{props.headcount} чел.</Text>
          </View>
        </View>

        {props.comment ? (
          <>
            <Text style={styles.sectionTitle}>Комментарий к заявке</Text>
            <View style={styles.box}>
              <Text style={{ fontSize: 9, color: PRIMARY }}>{props.comment}</Text>
            </View>
          </>
        ) : null}

        <Text style={styles.sectionTitle}>Ориентир по фонду (упрощённо)</Text>
        <Text style={{ fontSize: 9, color: MUTED, marginBottom: 6 }}>
          Базовая ставка из прайса витрины (день, Москва/МО). Расчёт: 40 ч/нед × 4,3 нед/мес × численность,
          без ночных коэффициентов и надбавок за пик — как стартовая вилка калькулятора на сайте.
        </Text>
        <View style={styles.box}>
          <View style={styles.row}>
            <Text style={styles.cellLabel}>Базовая ставка</Text>
            <View style={{ width: "58%" }}>
              <CellMoneyLine figures={formatMoneyRu(props.hourlyBase)} suffix="₽/час" />
            </View>
          </View>
          <View style={[styles.row, styles.rowLast]}>
            <Text style={styles.cellLabel}>Оценка фонда «в середине»</Text>
            <View style={{ width: "58%" }}>
              <CellMoneyLine figures={formatMoneyRu(props.monthlyMid)} suffix="₽/мес" />
            </View>
          </View>
          <View style={styles.numbersRow}>
            <View style={styles.numCol}>
              <Text style={styles.numLabel}>Нижняя граница вилки</Text>
              <CardMoney amount={props.low} />
            </View>
            <View style={styles.numCol}>
              <Text style={styles.numLabel}>Верхняя граница вилки</Text>
              <CardMoney amount={props.high} />
            </View>
            <View style={styles.numCol}>
              <Text style={styles.numLabel}>Месяц (ориентир)</Text>
              <CardMoney amount={props.monthlyMid} />
            </View>
          </View>
        </View>

        <Text style={styles.disclaimer}>
          Документ сформирован автоматически для ускорения коммуникации. Цифры не включают НДС и особые условия
          объекта. Ночные смены, сутки, усиленный комплаенс, резерв замены и транспортная доступность могут
          изменить модель — финальный пакет согласуется с менеджером после уточнения ТЗ.
        </Text>

        <View style={styles.footer} fixed>
          <Text>{props.legalLine}</Text>
        </View>
      </Page>
    </Document>
  );
}
