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
            fontSize=20,
            textColor=PRIMARY,
            alignment=TA_CENTER,
            spaceAfter=10,
            leading=24,
        ),
        "meta": ParagraphStyle(
            name="meta",
            parent=base["Normal"],
            fontName=font,
            fontSize=10,
            textColor=MUTED,
            alignment=TA_CENTER,
            leading=13,
            spaceAfter=4,
        ),
        "addr": ParagraphStyle(
            name="addr",
            parent=base["Normal"],
            fontName=font,
            fontSize=11,
            textColor=PRIMARY,
            alignment=TA_LEFT,
            leading=14,
            spaceAfter=3,
        ),
        "body": ParagraphStyle(
            name="body",
            parent=base["Normal"],
            fontName=font,
            fontSize=11,
            textColor=BODY,
            alignment=TA_JUSTIFY,
            leading=15,
            spaceAfter=10,
        ),
        "sign_label": ParagraphStyle(
            name="sign_label",
            parent=base["Normal"],
            fontName=font,
            fontSize=10,
            textColor=MUTED,
            alignment=TA_LEFT,
            leading=13,
        ),
    }


LETTERS: list[dict[str, str | None]] = [
    {
        "file": "Blagodarnost_01_Logistika_Sofino.pdf",
        "org_line": 'ООО «Логистика для Вас»',
        "warehouse_line": 'Склад «Софьино»',
        "lead": (
            "Выражаем признательность за профессиональное сотрудничество по организации складского персонала "
            "и закрытию смен на объекте в зоне ответственности склада «Софьино»."
        ),
    },
    {
        "file": "Blagodarnost_02_Logistika_Britovo.pdf",
        "org_line": 'ООО «Логистика для Вас»',
        "warehouse_line": 'Склад «Бритово»',
        "lead": (
            "Выражаем признательность за профессиональное сотрудничество по организации складского персонала "
            "и закрытию смен на объекте в зоне ответственности склада «Бритово»."
        ),
    },
    {
        "file": "Blagodarnost_03_Logistika_Zhukovskiy.pdf",
        "org_line": 'ООО «Логистика для Вас»',
        "warehouse_line": 'Склад «Жуковский»',
        "lead": (
            "Выражаем признательность за профессиональное сотрудничество по организации складского персонала "
            "и закрытию смен на объекте в г. Жуковский."
        ),
    },
    {
        "file": "Blagodarnost_04_TD_Lazurit.pdf",
        "org_line": 'ООО «ТД «Лазурит»»',
        "warehouse_line": None,
        "lead": (
            "Выражаем признательность за профессиональное сотрудничество по организации складского персонала "
            "и поддержанию операционной дисциплины на складе торгового дома."
        ),
    },
    {
        "file": "Blagodarnost_05_Lazurit_Kuhni.pdf",
        "org_line": 'ООО «Лазурит Кухни»',
        "warehouse_line": None,
        "lead": (
            "Выражаем признательность за профессиональное сотрудничество по организации складского персонала "
            "и стабильному закрытию смен на производственно-складском контуре компании."
        ),
    },
    {
        "file": "Blagodarnost_06_AF_Logistik.pdf",
        "org_line": 'ООО «АФ – Логистик»',
        "warehouse_line": None,
        "lead": (
            "Выражаем признательность за профессиональное сотрудничество по организации складского персонала "
            "и предсказуемому закрытию смен в логистических операциях компании."
        ),
    },
]


COMMON_BODY = (
    "В ходе работы специалисты вашей организации продемонстрировали понимание складской специфики: соблюдение "
    "требований охраны труда и регламентов площадки, дисциплину явки, прозрачный порядок замен и выстроенную "
    "коммуникацию с линейным руководством в периоды повышенной загрузки."
)


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
        leftMargin=22 * mm,
        rightMargin=22 * mm,
        topMargin=26 * mm,
        bottomMargin=28 * mm,
    )

    story: list = []

    story.append(Spacer(1, 8 * mm))
    story.append(Paragraph("БЛАГОДАРНОСТЬ", sty["title"]))
    story.append(Spacer(1, 2 * mm))

    meta_lines = "От начальника склада<br/>"
    meta_lines += meta["org_line"]
    if meta.get("warehouse_line"):
        meta_lines += f"<br/>{meta['warehouse_line']}"
    story.append(Paragraph(meta_lines, sty["meta"]))
    story.append(Spacer(1, 10 * mm))

    # Карточка адресата на светлом фоне
    addr_block = (
        "<b>Индивидуальному предпринимателю</b><br/>"
        "Махмадову Шарифхону Тагаймуродовичу<br/>"
        "<font color='#737373' size='10'>140125, Московская обл., г.&nbsp;Люберцы, "
        "мкр.&nbsp;Новые Островцы (д.&nbsp;Островцы), ул.&nbsp;Лётчика Волчкова, д.&nbsp;2, кв.&nbsp;155</font>"
    )
    t = Table([[Paragraph(addr_block, sty["addr"])]], colWidths=[170 * mm])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), SURFACE),
                ("BOX", (0, 0), (-1, -1), 0.6, RULE),
                ("TOPPADDING", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
            ]
        )
    )
    story.append(t)
    story.append(Spacer(1, 12 * mm))

    story.append(
        Paragraph(
            "<b>Уважаемый Шарифхон Тагаймуродович!</b>",
            ParagraphStyle(
                name="dear",
                parent=sty["body"],
                alignment=TA_LEFT,
                spaceAfter=8,
            ),
        )
    )

    story.append(Paragraph(str(meta["lead"]), sty["body"]))
    story.append(Paragraph(COMMON_BODY, sty["body"]))
    story.append(
        Paragraph(
            "Рассчитываем на продолжение партнёрства и готовы рекомендовать вашу компанию как надёжного подрядчика "
            "по аутсорсингу складского персонала.",
            sty["body"],
        )
    )
    story.append(Spacer(1, 6 * mm))
    story.append(Paragraph("С уважением,", sty["body"]))
    story.append(Spacer(1, 22 * mm))

    # Поля под рукописный ввод
    sign_block = (
        "«______» ____________________ 20___ г.<br/><br/>"
        "___________________________________________&nbsp;&nbsp;&nbsp;/ ___________________________________________<br/>"
        '<font color="#737373" size="9">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
        "(подпись)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
        "(ФИО полностью)</font><br/><br/>"
        "Начальник склада ___________________________________________________________________<br/><br/>"
        '<font color="#737373" size="9">М.П.</font>'
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
        "Благодарственные письма в формате PDF (фирменные цвета сайта).\n\n"
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
