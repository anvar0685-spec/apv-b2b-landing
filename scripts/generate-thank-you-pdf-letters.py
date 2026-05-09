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
            "Настоящим выражаем искреннюю благодарность за сотрудничество по аутсорсингу складского персонала на "
            "нашем распределительном контуре в зоне Софьино: своевременное закрытие смен у ворот и на приёмке "
            "имело прямое влияние на соблюдение слотов отгрузки и темп обработки входящего потока."
        ),
        "body_mid": (
            "Отдельно отмечаем выстроенный формат вывода бригад на погрузочно-разгрузочные работы и такелаж КГТ: "
            "люди приходили в смену предсказуемо, замены не превращались в «пожар», инструктаж и требования "
            "площадки соблюдались без перекладывания ответственности на нашу кадровую службу."
        ),
        "body_close": (
            "Для нас это практический пример модели подряда на смены с понятным SLA по явке — именно такой формат "
            "мы готовы рекомендовать коллегам в рознице и на РЦ при выборе поставщика персонала."
        ),
    },
    {
        "file": "Blagodarnost_02_Logistika_Britovo.pdf",
        "org_line": 'ООО «Логистика для Вас»',
        "warehouse_line": 'Склад «Бритово»',
        "lead": (
            "Благодарим вас за устойчивое партнёрство по закрытию линейных ролей на объекте Бритово. В периоды "
            "неравномерной загрузки и смены «пик — спад» критично было не терять темп комплектации и отгрузки — "
            "ваша команда обеспечила подменяемость состава без разрыва операционного графика."
        ),
        "body_mid": (
            "Ценим прозрачную отчётность по явке и порядок замен: при срыве смены мы получали понятный контакт и "
            "окно реакции, а не разрозненные объяснения в мессенджерах. Это сокращало простой линии и снимало лишний "
            "шум между экспедицией, внутренним расписанием и службой безопасности объекта."
        ),
        "body_close": (
            "Рассматриваем продолжение сотрудничества как базовый сценарий при расширении зон хранения и наращивании "
            "объёмов — при сохранении единого стандарта ввода людей на площадку."
        ),
    },
    {
        "file": "Blagodarnost_03_Logistika_Zhukovskiy.pdf",
        "org_line": 'ООО «Логистика для Вас»',
        "warehouse_line": 'Склад «Жуковский»',
        "lead": (
            "Направляем благодарность за профессиональную организацию персонала на складе в г.&nbsp;Жуковский. "
            "Для нашего узла важны короткие интервалы между выдачей заказа и окном выхода транспорта; предсказуемая "
            "явка комплектовщиков и работников экспедиции напрямую поддерживала выполнение договорённостей с контрагентами."
        ),
        "body_mid": (
            "Отмечаем дисциплину на отборе мелкоштучного товара и аккуратность при работе с упаковкой: меньше возвратов "
            "по ошибке строки заказа — меньше переделок на отгрузке. Регламент замен и единая точка контакта по сменам "
            "упростили сверку фактов между линейными руководителями и закупкой."
        ),
        "body_close": (
            "Готовы рекомендовать вашу модель аутсорсинга смен коллегам, кому важны измеримые KPI по явке и живой "
            "операционный контакт, а не формальный отчёт «ради галочки»."
        ),
    },
    {
        "file": "Blagodarnost_04_TD_Lazurit.pdf",
        "org_line": 'ООО «ТД «Лазурит»»',
        "warehouse_line": None,
        "lead": (
            "Выражаем признательность за результативное сотрудничество по подряду складских смен для нужд торгового дома. "
            "В высокий сезон и при промо-кампаниях нас отделяют от провала по отгрузкам не «красивые презентации», а факт "
            "закрытия смен и качество подбора людей под профиль работ на линии."
        ),
        "body_mid": (
            "Ваша сторона последовательно держала связку «заявка — выход на объект — табель», что упрощало сверку "
            "с внутренним учётом и снижало споры о методике расчёта явки. Инструктажи и допуски соблюдались в рамках "
            "согласованных регламентов — это снимало часть нагрузки с нашей службы охраны труда на этапе запуска новых людей."
        ),
        "body_close": (
            "Для закупки и операций это выглядит как управляемый контракт на людей с понятными последствиями при отклонениях — "
            "именно такой формат мы считаем эталоном для долгосрочного партнёрства."
        ),
    },
    {
        "file": "Blagodarnost_05_Lazurit_Kuhni.pdf",
        "org_line": 'ООО «Лазурит Кухни»',
        "warehouse_line": None,
        "lead": (
            "Благодарим за организацию персонала на производственно-складском контуре компании «Лазурит Кухни». "
            "При работе с крупногабаритными изделиями и отделочными материалами критичны аккуратность при перемещении, "
            "соблюдение маршрутов и непрерывность смен на участках приёмки и выдачи."
        ),
        "body_mid": (
            "Отмечаем выстроенную работу бригад разнорабочих и грузчиков под наш стандарт безопасности: меньше инцидентов "
            "на трапе и в проходах — меньше остановок линии. Замены выполнялись по понятной процедуре, без хаотичного "
            "подключения «любых свободных рук» без инструктажа."
        ),
        "body_close": (
            "Такой подход к аутсорсингу смен мы связываем с реальной экономией времени руководителей участков и "
            "логистики — и охотно будем относить вашу компанию как проверенного подрядчика в профессиональном окружении."
        ),
    },
    {
        "file": "Blagodarnost_06_AF_Logistik.pdf",
        "org_line": 'ООО «АФ – Логистик»',
        "warehouse_line": None,
        "lead": (
            "Настоящим благодарим за партнёрство в модели аутсорсинга персонала под наши логистические операции. "
            "При переменной загрузке складов и необходимости быстро наращивать объём на участках приёмки и отгрузки "
            "важно иметь подрядчика, который держит слово по численности и времени реакции на замену — это мы и получили на практике."
        ),
        "body_mid": (
            "Ценим единый формат отчётности по сменам для нашей диспетчерской и финансового блока: одни и те же метрики "
            "в статусе явки и инцидентах, без расхождений «у нас в табеле одно — у подрядчика другое». Это ускоряет разбор "
            "спорных случаев и защищает модель закупки перед руководством."
        ),
        "body_close": (
            "Рассчитываем на развитие сотрудничества при подключении новых маршрутов и расширении пула ролей — с сохранением "
            "прозрачных правил подряда на смены, которые уже доказали свою работоспособность на наших объектах."
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
    story.append(Paragraph(str(meta["body_mid"]), sty["body"]))
    story.append(Paragraph(str(meta["body_close"]), sty["body"]))
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
        "Тексты в письмах уникальны (по смыслу и формулировкам), общий стиль — благодарность за аутсорсинг "
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
