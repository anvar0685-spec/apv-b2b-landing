#!/usr/bin/env python3
"""
Благодарственные письма в PDF — палитра как на сайте (globals.css light):
--accent #0d9488, --primary #071525, --neutral-700 #404040, surface #f4f6f9
Генерация на рабочий стол (macOS; шрифт Arial из Supplemental).
"""

from __future__ import annotations

from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

# Единая ширина контента под поля (таблица адресата = ширина текста)
_PAGE_W_PT, _ = A4
_MARGIN_LR_PT = 18 * mm
_MARGIN_TOP_PT = 20 * mm
_MARGIN_BOT_PT = 20 * mm
CONTENT_WIDTH_PT = _PAGE_W_PT - 2 * _MARGIN_LR_PT

# Фирменные цвета (light theme)
ACCENT = HexColor("#0d9488")
PRIMARY = HexColor("#071525")
BODY = HexColor("#404040")
MUTED = HexColor("#737373")
RULE = HexColor("#e5e5e5")
SURFACE = HexColor("#f4f6f9")

FONT_PATHS = [
    Path("/System/Library/Fonts/Supplemental/Arial.ttf"),
    Path("/Library/Fonts/Arial.ttf"),
]

DESKTOP = Path.home() / "Desktop"
OUT_DIR = DESKTOP / "APV_blagodarnosti_logistika"


def _register_font() -> str:
    for p in FONT_PATHS:
        if p.is_file():
            pdfmetrics.registerFont(TTFont("SiteSans", str(p)))
            return "SiteSans"
    raise FileNotFoundError("Не найден Arial.ttf — установите шрифт или поправьте FONT_PATHS в скрипте.")


def _styles(font: str) -> dict[str, ParagraphStyle]:
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle(
            name="title",
            parent=base["Heading1"],
            fontName=font,
            fontSize=16,
            textColor=PRIMARY,
            alignment=TA_CENTER,
            spaceAfter=4,
            leading=19,
        ),
        "meta": ParagraphStyle(
            name="meta",
            parent=base["Normal"],
            fontName=font,
            fontSize=9,
            textColor=MUTED,
            alignment=TA_CENTER,
            leading=11,
            spaceAfter=2,
        ),
        "addr": ParagraphStyle(
            name="addr",
            parent=base["Normal"],
            fontName=font,
            fontSize=9,
            textColor=PRIMARY,
            alignment=TA_LEFT,
            leading=11.5,
            spaceAfter=0,
        ),
        "body": ParagraphStyle(
            name="body",
            parent=base["Normal"],
            fontName=font,
            fontSize=9.5,
            textColor=BODY,
            alignment=TA_JUSTIFY,
            leading=12.4,
            spaceAfter=3,
        ),
        "sign_label": ParagraphStyle(
            name="sign_label",
            parent=base["Normal"],
            fontName=font,
            fontSize=8.5,
            textColor=MUTED,
            alignment=TA_LEFT,
            leading=11,
        ),
    }


LETTERS: list[dict[str, str | None]] = [
    {
        "file": "Blagodarnost_01_Logistika_Sofino.pdf",
        "org_line": 'ООО «Логистика для Вас»',
        "warehouse_line": 'Склад «Софьино»',
        "lead": (
            "Выражаем благодарность за аутсорсинг складского персонала на РЦ в зоне Софьино: своевременное закрытие "
            "смен у ворот и на приёмке поддержало слоты отгрузки и темп входящего потока."
        ),
        "body_mid": (
            "Отмечаем вывод бригад на ПРР и такелаж КГТ: предсказуемые смены, замены без «пожара», соблюдение "
            "инструктажа и требований площадки без перекладывания на нашу кадровую службу."
        ),
        "body_close": (
            "Это для нас пример подряда на смены с понятными условиями по явке — такой формат готовы рекомендовать "
            "коллегам в рознице и на РЦ."
        ),
    },
    {
        "file": "Blagodarnost_02_Logistika_Britovo.pdf",
        "org_line": 'ООО «Логистика для Вас»',
        "warehouse_line": 'Склад «Бритово»',
        "lead": (
            "Благодарим за партнёрство по закрытию линейных ролей на объекте Бритово. При неравномерной загрузке "
            "важно не терять темп комплектации и отгрузки — подменяемость состава сохранила операционный график."
        ),
        "body_mid": (
            "Ценим отчётность по явке и порядок замен: при срыве был понятный контакт и окно реакции, не разрозненные "
            "объяснения в мессенджерах — меньше простоя линии и шума между экспедицией и службой безопасности."
        ),
        "body_close": (
            "Рассматриваем продолжение как базовый сценарий при расширении зон и объёмов при том же стандарте ввода людей."
        ),
    },
    {
        "file": "Blagodarnost_03_Logistika_Zhukovskiy.pdf",
        "org_line": 'ООО «Логистика для Вас»',
        "warehouse_line": 'Склад «Жуковский»',
        "lead": (
            "Благодарим за организацию персонала на складе в г.&nbsp;Жуковский. Короткие интервалы между выдачей заказа "
            "и выходом транспорта требуют предсказуемой явки комплектовщиков и экспедиции — это поддержало договорённости "
            "с контрагентами."
        ),
        "body_mid": (
            "Отмечаем дисциплину отбора мелкоштучного товара и аккуратность упаковки — меньше ошибок строки и переделок "
            "на отгрузке. Единая точка контакта по сменам упростила сверку между линейными руководителями и закупкой."
        ),
        "body_close": (
            "Готовы рекомендовать ваш аутсорсинг смен там, где нужны измеримые KPI по явке и живой операционный контакт."
        ),
    },
    {
        "file": "Blagodarnost_04_TD_Lazurit.pdf",
        "org_line": 'ООО «ТД «Лазурит»»',
        "warehouse_line": None,
        "lead": (
            "Признательность за подряд складских смен для торгового дома. В сезон и промо от нас отделяют от провала "
            "по отгрузкам не презентации, а факт закрытия смен и подбор людей под профиль линии."
        ),
        "body_mid": (
            "Связка «заявка — выход на объект — табель» держалась стабильно: меньше споров о методике явки. Инструктажи "
            "и допуски — по согласованным регламентам, часть нагрузки на запуск людей снята с нашей службы ОТ."
        ),
        "body_close": (
            "Для закупки и операций это управляемый контракт на людей с понятными последствиями при отклонениях — эталон "
            "для долгого партнёрства."
        ),
    },
    {
        "file": "Blagodarnost_05_Lazurit_Kuhni.pdf",
        "org_line": 'ООО «Лазурит Кухни»',
        "warehouse_line": None,
        "lead": (
            "Благодарим за персонал на производственно-складском контуре «Лазурит Кухни». При КГТ и отделочных материалах "
            "важны аккуратность перемещений, маршруты и непрерывность смен на приёмке и выдаче."
        ),
        "body_mid": (
            "Бригады разнорабочих и грузчиков работали под наш стандарт безопасности: меньше инцидентов на трапе — меньше "
            "остановок линии. Замены шли по процедуре, без случайных людей без инструктажа."
        ),
        "body_close": (
            "Связываем это с экономией времени руководителей участков и логистики и охотно рекомендуем вас как проверенного подрядчика."
        ),
    },
    {
        "file": "Blagodarnost_06_AF_Logistik.pdf",
        "org_line": 'ООО «АФ – Логистик»',
        "warehouse_line": None,
        "lead": (
            "Благодарим за аутсорсинг персонала под наши логистические операции. При переменной загрузке важен подрядчик, "
            "который держит численность и время реакции на замену — на практике мы это получили."
        ),
        "body_mid": (
            "Единый формат отчётности по сменам для диспетчерской и финансов: одни метрики по явке и инцидентам — меньше "
            "расхождений с табелём и быстрее разбор спорных случаев перед руководством."
        ),
        "body_close": (
            "Ждём развития при новых маршрутах и ролях при тех же прозрачных правилах подряда на смены."
        ),
    },
]


def _header_footer(canvas, doc) -> None:
    canvas.saveState()
    w, h = A4
    # Верхняя акцентная полоса (как «ребро» бренда на сайте)
    canvas.setFillColor(ACCENT)
    canvas.rect(0, h - 7 * mm, w, 7 * mm, stroke=0, fill=1)
    # Нижняя тонкая линия
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.8)
    y_rule = 22 * mm
    canvas.line(18 * mm, y_rule, w - 18 * mm, y_rule)
    canvas.restoreState()


def build_pdf(path: Path, meta: dict[str, str | None], font: str, sty: dict[str, ParagraphStyle]) -> None:
    doc = SimpleDocTemplate(
        str(path),
        pagesize=A4,
        leftMargin=_MARGIN_LR_PT,
        rightMargin=_MARGIN_LR_PT,
        topMargin=_MARGIN_TOP_PT,
        bottomMargin=_MARGIN_BOT_PT,
    )

    story: list = []

    story.append(Spacer(1, 5 * mm))
    story.append(Paragraph("Благодарственное письмо", sty["title"]))
    story.append(Spacer(1, 1.5 * mm))

    meta_lines = "От начальника склада<br/>"
    meta_lines += meta["org_line"]
    if meta.get("warehouse_line"):
        meta_lines += f"<br/>{meta['warehouse_line']}"
    story.append(Paragraph(meta_lines, sty["meta"]))
    story.append(Spacer(1, 6 * mm))

    # Карточка адресата на светлом фоне
    addr_block = (
        "<b>Индивидуальному предпринимателю</b><br/>"
        "Махмадову Шарифхону Тагаймуродовичу<br/>"
        "<font color='#737373' size='10'>140125, Московская обл., г.&nbsp;Люберцы, "
        "мкр.&nbsp;Новые Островцы (д.&nbsp;Островцы), ул.&nbsp;Лётчика Волчкова, д.&nbsp;2, кв.&nbsp;155</font>"
    )
    t = Table([[Paragraph(addr_block, sty["addr"])]], colWidths=[CONTENT_WIDTH_PT])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), SURFACE),
                ("BOX", (0, 0), (-1, -1), 0.6, RULE),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ("LEFTPADDING", (0, 0), (-1, -1), 9),
                ("RIGHTPADDING", (0, 0), (-1, -1), 9),
            ]
        )
    )
    story.append(t)
    story.append(Spacer(1, 7 * mm))

    story.append(
        Paragraph(
            "<b>Уважаемый Шарифхон Тагаймуродович!</b>",
            ParagraphStyle(
                name="dear",
                parent=sty["body"],
                alignment=TA_LEFT,
                spaceAfter=5,
            ),
        )
    )

    story.append(Paragraph(str(meta["lead"]), sty["body"]))
    story.append(Paragraph(str(meta["body_mid"]), sty["body"]))
    story.append(Paragraph(str(meta["body_close"]), sty["body"]))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph("С уважением,", sty["body"]))
    story.append(Spacer(1, 11 * mm))

    # Поля под рукописный ввод (компактно — одна страница A4)
    sign_block = (
        "«______» ____________________ 20___ г.<br/>"
        "___________________________________________&nbsp;/ ___________________________________________<br/>"
        '<font color="#737373" size="8">(подпись)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
        "(ФИО полностью)</font><br/>"
        "Начальник склада ___________________________________________________________________<br/>"
        '<font color="#737373" size="8">М.П.</font>'
    )
    story.append(Paragraph(sign_block, sty["sign_label"]))

    doc.build(story, onFirstPage=_header_footer, onLaterPages=_header_footer)


def main() -> None:
    font = _register_font()
    sty = _styles(font)
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    # Удаляем старые docx при наличии — чтобы не путать с PDF
    for old in OUT_DIR.glob("*.docx"):
        old.unlink()

    for letter in LETTERS:
        out = OUT_DIR / str(letter["file"])
        build_pdf(out, letter, font, sty)
        print("PDF:", out)

    readme = OUT_DIR / "README.txt"
    readme.write_text(
        "Тексты в благодарственных письмах уникальны (по смыслу и формулировкам), общий стиль — признательность за аутсорсинг "
        "складских смен и партнёрскую дисциплину.\n\n"
        "Подпись, ФИО и дата — заполняются от руки после печати.\n"
        "При необходимости добавьте скан печати в PDF в Preview или Acrobat.\n\n"
        "Список:\n"
        "  1 — ООО «Логистика для Вас», склад «Софьино»\n"
        "  2 — ООО «Логистика для Вас», склад «Бритово»\n"
        "  3 — ООО «Логистика для Вас», склад «Жуковский»\n"
        "  4 — ООО «ТД «Лазурит»»\n"
        "  5 — ООО «Лазурит Кухни»\n"
        "  6 — ООО «АФ – Логистик»\n\n"
        "Перегенерация: python3 scripts/generate-thank-you-pdf-letters.py\n",
        encoding="utf-8",
    )
    print("README:", readme)


if __name__ == "__main__":
    main()
