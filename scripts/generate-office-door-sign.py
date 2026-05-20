#!/usr/bin/env python3
"""
Премиум-табличка на дверь офиса (A4/A3 @ 300 DPI).
Визуальный язык: OperationalDarkHero + токены globals.css (Inter Tight, teal, grain).
"""
from __future__ import annotations

from pathlib import Path

import qrcode
from PIL import Image, ImageDraw, ImageFont

SITE_URL = "https://апв-система.рф"
PHONE = "+7 (925) 437-12-11"
OFFICE = "г. Бронницы, Каширский пер., 46, офис 120"
DESKTOP = Path.home() / "Desktop"

# Системные шрифты macOS (близко к Inter Tight / премиум B2B)
FONT_STACK = {
    "display": ("/System/Library/Fonts/HelveticaNeue.ttc", 1),
    "semi": ("/System/Library/Fonts/HelveticaNeue.ttc", 1),
    "regular": ("/System/Library/Fonts/HelveticaNeue.ttc", 0),
    "mono": ("/System/Library/Fonts/SFNSMono.ttf", 0),
}

# Design tokens (site)
C_HERO_TOP = (13, 25, 23)
C_HERO_BOT = (8, 20, 18)
C_BG = (7, 21, 37)
C_ACCENT = (13, 148, 136)
C_ACCENT_L = (45, 212, 191)
C_SOFT = (204, 251, 241)
C_WHITE = (255, 255, 255)
C_MUTED = (148, 163, 184)
C_FAINT = (100, 116, 139)

DPI = 300
FORMATS = {"A4": (210, 297), "A3": (297, 420)}

def mm_px(mm: float) -> int:
    return int(mm / 25.4 * DPI)


def font(role: str, px: int) -> ImageFont.FreeTypeFont:
    path, index = FONT_STACK[role]
    try:
        if path.endswith(".ttc"):
            return ImageFont.truetype(path, px, index=index)
        return ImageFont.truetype(path, px)
    except OSError:
        fallback = "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if role != "regular" else "/System/Library/Fonts/Supplemental/Arial.ttf"
        return ImageFont.truetype(fallback, px)


class L:
    """Мини-вёрстка с метриками."""

    def __init__(self, draw: ImageDraw.ImageDraw):
        self.d = draw

    def h(self, text: str, f: ImageFont.FreeTypeFont) -> int:
        return self.d.textbbox((0, 0), text, font=f)[3]

    def w(self, text: str, f: ImageFont.FreeTypeFont) -> int:
        return int(self.d.textlength(text, font=f))

    def draw(self, xy: tuple[int, int], text: str, f: ImageFont.FreeTypeFont, fill: tuple) -> int:
        self.d.text(xy, text, font=f, fill=fill)
        return self.h(text, f)


def paint_bg(w: int, h: int, rail_w: int) -> Image.Image:
    img = Image.new("RGB", (w, h), C_BG)
    px = img.load()

    # Градиент hero operational (слева)
    for y in range(h):
        t = y / h
        r = int(C_HERO_TOP[0] + (C_HERO_BOT[0] - C_HERO_TOP[0]) * t)
        g = int(C_HERO_TOP[1] + (C_HERO_BOT[1] - C_HERO_TOP[1]) * t)
        b = int(C_HERO_TOP[2] + (C_HERO_BOT[2] - C_HERO_TOP[2]) * t)
        for x in range(w - rail_w):
            px[x, y] = (r, g, b)

    # Правая панель — акцентный градиент
    for y in range(h):
        t = y / h
        for x in range(w - rail_w, w):
            xt = (x - (w - rail_w)) / max(rail_w, 1)
            r = int(C_HERO_BOT[0] + (C_ACCENT[0] - C_HERO_BOT[0]) * (0.35 + 0.65 * t))
            g = int(C_HERO_BOT[1] + (C_ACCENT[1] - C_HERO_BOT[1]) * (0.35 + 0.65 * t))
            b = int(C_HERO_BOT[2] + (C_ACCENT[2] - C_HERO_BOT[2]) * (0.35 + 0.65 * t))
            blend = 0.55 + 0.45 * xt
            px[x, y] = (
                int(px[x, y][0] * (1 - blend) + r * blend),
                int(px[x, y][1] * (1 - blend) + g * blend),
                int(px[x, y][2] * (1 - blend) + b * blend),
            )

    img = img.convert("RGBA")

    # Диагональный луч (как ux-pattern-hero)
    beam = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    bd = ImageDraw.Draw(beam)
    bd.polygon(
        [(0, int(h * 0.05)), (int(w * 0.72), 0), (int(w * 0.55), int(h * 0.42)), (0, int(h * 0.28))],
        fill=(*C_ACCENT_L, 18),
    )
    img.alpha_composite(beam)

    # Сетка
    grid = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    g = ImageDraw.Draw(grid)
    step = mm_px(7)
    for x in range(0, w - rail_w, step):
        g.line([(x, 0), (x, h)], fill=(*C_ACCENT, 12))
    for y in range(0, h, step):
        g.line([(0, y), (w - rail_w, y)], fill=(*C_ACCENT, 12))
    img.alpha_composite(grid)

    # Grain (как .grain-dark на сайте)
    nw, nh = w // 4, h // 4
    noise = Image.effect_noise((nw, nh), 14).convert("L").resize((w, h), Image.Resampling.BILINEAR)
    noise_rgba = Image.merge("RGBA", (noise, noise, noise, noise.point(lambda _: 16)))
    img = Image.alpha_composite(img, noise_rgba)

    return img


def chip(draw: ImageDraw.ImageDraw, x: int, y: int, text: str, f: ImageFont.FreeTypeFont) -> tuple[int, int]:
    pad_x, pad_y = mm_px(2.2), mm_px(1.2)
    tw = int(draw.textlength(text, font=f))
    th = draw.textbbox((0, 0), text, font=f)[3]
    w, h = tw + pad_x * 2, th + pad_y * 2
    draw.rounded_rectangle(
        [x, y, x + w, y + h],
        radius=h // 2,
        fill=(255, 255, 255, 12),
        outline=(*C_ACCENT_L, 90),
        width=1,
    )
    draw.text((x + pad_x, y + pad_y - 1), text, font=f, fill=C_SOFT)
    return w, h


def make_qr(px: int) -> Image.Image:
    qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_H, box_size=8, border=1)
    qr.add_data(SITE_URL)
    qr.make(fit=True)
    return qr.make_image(fill_color="#071525", back_color="#ffffff").convert("RGBA").resize((px, px), Image.Resampling.LANCZOS)


def render(fmt: str, out: Path) -> None:
    w_mm, h_mm = FORMATS[fmt]
    W, H = mm_px(w_mm), mm_px(h_mm)
    k = 1.14 if fmt == "A3" else 1.0

    rail_w = int(W * 0.36)
    mx = mm_px(14)
    cx0 = mx
    cx1 = W - rail_w - mm_px(6)
    cw = cx1 - cx0

    F = {
        "idx": font("regular", mm_px(2.6 * k)),
        "kick": font("semi", mm_px(3.1 * k)),
        "brand": font("display", mm_px(17 * k)),
        "lead": font("semi", mm_px(5.8 * k)),
        "chip": font("regular", mm_px(3.1 * k)),
        "card_h": font("semi", mm_px(2.9 * k)),
        "row_l": font("regular", mm_px(3.9 * k)),
        "row_v": font("mono", mm_px(3.9 * k)),
        "domain": font("display", mm_px(8.5 * k)),
        "phone": font("semi", mm_px(4.8 * k)),
        "small": font("regular", mm_px(2.9 * k)),
        "rail": font("semi", mm_px(3.4 * k)),
    }

    img = paint_bg(W, H, rail_w)
    draw = ImageDraw.Draw(img)
    Ld = L(draw)

    y = mm_px(12)

    # Тонкая линия-акцент (как на hero сайта)
    draw.line([(cx0, y), (cx1, y)], fill=(*C_ACCENT_L, 100), width=1)
    y += mm_px(4)
    meta = "APV · OFFICE SIGN · 2026"
    draw.text((cx0, y), meta, font=F["idx"], fill=C_FAINT)
    y += Ld.h(meta, F["idx"]) + mm_px(9)

    # --- Kicker ---
    kick = "Складской аутсорсинг  ·  Москва и Московская область"
    draw.text((cx0, y), kick.upper(), font=F["kick"], fill=C_ACCENT_L)
    y += Ld.h(kick, F["kick"]) + mm_px(8)

    # --- Бренд одной строкой ---
    brand = "АПВ — СИСТЕМА"
    draw.text((cx0, y), brand, font=F["brand"], fill=C_WHITE)
    y += Ld.h(brand, F["brand"]) + mm_px(6)

    # Короткий акцент под названием (как на сайте)
    draw.line([(cx0, y), (cx0 + mm_px(36), y)], fill=C_ACCENT, width=mm_px(0.7))
    y += mm_px(7)

    lead = "Персонал на склады под ключ"
    draw.text((cx0, y), lead, font=F["lead"], fill=(*C_WHITE, 235))
    y += Ld.h(lead, F["lead"]) + mm_px(5)

    sub = "Грузчики · комплектовщики · кладовщики · водители ПРТ"
    draw.text((cx0, y), sub, font=F["small"], fill=C_MUTED)
    y += Ld.h(sub, F["small"]) + mm_px(9)

    # Chips 2×2
    chips = ["Смены", "Явка и замены", "Москва · МО", "B2B подряд"]
    chip_x, chip_y = cx0, y
    gap = mm_px(2.5)
    max_row_w = 0
    row_h = 0
    for i, t in enumerate(chips):
        if i == 2:
            chip_x = cx0
            chip_y += row_h + gap
            max_row_w = 0
            row_h = 0
        cw_chip, ch_chip = chip(draw, chip_x, chip_y, t, F["chip"])
        chip_x += cw_chip + gap
        max_row_w = max(max_row_w, chip_x - cx0)
        row_h = max(row_h, ch_chip)
    y = chip_y + row_h + mm_px(12)

    # --- Schedule card ---
    card_x0, card_x1 = cx0, cx1
    card_y0 = y
    pad = mm_px(5)
    title = "РЕЖИМ РАБОТЫ ОФИСА"
    rows = [
        ("Понедельник — пятница", "09:00 — 19:00"),
        ("Обеденный перерыв", "13:00 — 14:00"),
        ("Суббота, воскресенье", "выходной"),
    ]
    row_h = max(Ld.h(rows[0][0], F["row_l"]), Ld.h(rows[0][1], F["row_v"])) + mm_px(5)
    card_h = pad * 2 + Ld.h(title, F["card_h"]) + mm_px(4) + len(rows) * row_h + mm_px(2)

    card = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    cd = ImageDraw.Draw(card)
    cd.rounded_rectangle(
        [card_x0, card_y0, card_x1, card_y0 + card_h],
        radius=mm_px(3),
        fill=(255, 255, 255, 10),
        outline=(*C_ACCENT_L, 110),
        width=1,
    )
    img.alpha_composite(card)
    draw = ImageDraw.Draw(img)
    Ld = L(draw)

    ty = card_y0 + pad
    draw.text((card_x0 + pad, ty), title, font=F["card_h"], fill=C_SOFT)
    ty += Ld.h(title, F["card_h"]) + mm_px(5)

    for i, (label, val) in enumerate(rows):
        if i > 0:
            draw.line(
                [(card_x0 + pad, ty - mm_px(2)), (card_x1 - pad, ty - mm_px(2))],
                fill=(*C_ACCENT, 50),
                width=1,
            )
        draw.text((card_x0 + pad, ty), label, font=F["row_l"], fill=C_MUTED)
        vw = Ld.w(val, F["row_v"])
        draw.text((card_x1 - pad - vw, ty), val, font=F["row_v"], fill=C_WHITE)
        ty += row_h

    y = card_y0 + card_h + mm_px(12)

    # --- Contact block ---
    draw.text((cx0, y), "Сайт", font=F["kick"], fill=C_ACCENT_L)
    y += Ld.h("Сайт", F["kick"]) + mm_px(3)
    dom = "апв-система.рф"
    draw.text((cx0, y), dom, font=F["domain"], fill=C_SOFT)
    y += Ld.h(dom, F["domain"]) + mm_px(4)
    draw.text((cx0, y), SITE_URL, font=F["small"], fill=C_FAINT)
    y += Ld.h(SITE_URL, F["small"]) + mm_px(8)
    draw.text((cx0, y), PHONE, font=F["phone"], fill=C_WHITE)
    y += Ld.h(PHONE, F["phone"]) + mm_px(3)
    draw.text((cx0, y), OFFICE, font=F["small"], fill=C_MUTED)

    # --- Right rail ---
    rx0 = W - rail_w
    draw.line([(rx0, 0), (rx0, H)], fill=(*C_ACCENT_L, 80), width=1)

    qr_sz = min(rail_w - mm_px(24), mm_px(46 if fmt == "A3" else 40))
    qr = make_qr(qr_sz)
    qx = rx0 + (rail_w - qr_sz) // 2
    qy = (H - qr_sz) // 2 - mm_px(6)
    pad = mm_px(4)
    draw.rounded_rectangle(
        [qx - pad, qy - pad, qx + qr_sz + pad, qy + qr_sz + pad],
        radius=mm_px(2),
        fill=C_WHITE,
    )
    img.paste(qr, (qx, qy), qr)

    lbl = "Сканируйте"
    lw = Ld.w(lbl, F["rail"])
    draw.text((qx + (qr_sz - lw) // 2, qy + qr_sz + mm_px(5)), lbl, font=F["rail"], fill=C_WHITE)
    subl = "апв-система.рф"
    sw = Ld.w(subl, F["small"])
    draw.text((qx + (qr_sz - sw) // 2, qy + qr_sz + mm_px(11)), subl, font=F["small"], fill=(*C_SOFT, 200))

    # Footer line full width
    draw.line([(mx, H - mm_px(10)), (W - mx, H - mm_px(10))], fill=C_ACCENT, width=mm_px(0.5))

    final = img.convert("RGB")
    final.save(out, "PNG", dpi=(DPI, DPI))
    print(f"OK {out.name}  {W}×{H}px")


def main() -> None:
    for fmt in FORMATS:
        render(fmt, DESKTOP / f"APV-office-sign-{fmt}-300dpi.png")
    print("QR →", SITE_URL)


if __name__ == "__main__":
    main()
