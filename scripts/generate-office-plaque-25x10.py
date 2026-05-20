#!/usr/bin/env python3
"""Горизонтальные таблички 25×10 см @ 300 DPI — стиль вывески, своя вёрстка."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

DESKTOP = Path.home() / "Desktop"
BRAND = "АПВ — СИСТЕМА"
TAGLINE = "Складской персонал под ключ"

PLAQUE_W_MM = 250
PLAQUE_H_MM = 100

FONT_STACK = {
    "display": ("/System/Library/Fonts/HelveticaNeue.ttc", 1),
    "semi": ("/System/Library/Fonts/HelveticaNeue.ttc", 1),
    "regular": ("/System/Library/Fonts/HelveticaNeue.ttc", 0),
    "mono": ("/System/Library/Fonts/SFNSMono.ttf", 0),
}

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


def mm_px(mm: float) -> int:
    return int(mm / 25.4 * DPI)


def font(role: str, px: int) -> ImageFont.FreeTypeFont:
    path, index = FONT_STACK[role]
    try:
        if path.endswith(".ttc"):
            return ImageFont.truetype(path, px, index=index)
        return ImageFont.truetype(path, px)
    except OSError:
        fb = "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if role != "regular" else "/System/Library/Fonts/Supplemental/Arial.ttf"
        return ImageFont.truetype(fb, px)


class Ty:
    def __init__(self, d: ImageDraw.ImageDraw):
        self.d = d

    def h(self, t: str, f: ImageFont.FreeTypeFont) -> int:
        return self.d.textbbox((0, 0), t, font=f)[3]

    def w(self, t: str, f: ImageFont.FreeTypeFont) -> int:
        return int(self.d.textlength(t, font=f))


def paint_bg_full(w: int, h: int) -> Image.Image:
    """Полноширинный фон без QR-рейла."""
    img = Image.new("RGB", (w, h), C_BG)
    px = img.load()
    for y in range(h):
        t = y / max(h, 1)
        r = int(C_HERO_TOP[0] + (C_HERO_BOT[0] - C_HERO_TOP[0]) * t)
        g = int(C_HERO_TOP[1] + (C_HERO_BOT[1] - C_HERO_TOP[1]) * t)
        b = int(C_HERO_TOP[2] + (C_HERO_BOT[2] - C_HERO_TOP[2]) * t)
        for x in range(w):
            px[x, y] = (r, g, b)

    img = img.convert("RGBA")
    beam = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    ImageDraw.Draw(beam).polygon(
        [(int(w * 0.55), 0), (w, 0), (w, h), (int(w * 0.35), h)],
        fill=(*C_ACCENT, 22),
    )
    img.alpha_composite(beam)

    grid = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    g = ImageDraw.Draw(grid)
    step = mm_px(6)
    for x in range(0, w, step):
        g.line([(x, 0), (x, h)], fill=(*C_ACCENT, 8))
    for y in range(0, h, step):
        g.line([(0, y), (w, y)], fill=(*C_ACCENT, 8))
    img.alpha_composite(grid)

    nw, nh = max(1, w // 5), max(1, h // 5)
    noise = Image.effect_noise((nw, nh), 14).convert("L").resize((w, h), Image.Resampling.BILINEAR)
    img.alpha_composite(Image.merge("RGBA", (noise, noise, noise, noise.point(lambda _: 12))))

    bar = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    ImageDraw.Draw(bar).rectangle([0, 0, mm_px(2.2), h], fill=(*C_ACCENT, 255))
    img.alpha_composite(bar)
    return img


def draw_centered(draw: ImageDraw.ImageDraw, T: Ty, text: str, f: ImageFont.FreeTypeFont, cy: int, W: int, fill: tuple) -> int:
    w = T.w(text, f)
    draw.text(((W - w) // 2, cy), text, font=f, fill=fill)
    return cy + T.h(text, f)


def render_main(out: Path) -> None:
    """Бренд + слоган, без режима, сайта и телефона."""
    W, H = mm_px(PLAQUE_W_MM), mm_px(PLAQUE_H_MM)
    m = mm_px(10)

    F = {
        "brand": font("display", mm_px(14)),
        "tag": font("semi", mm_px(5.5)),
    }

    img = paint_bg_full(W, H)
    draw = ImageDraw.Draw(img)
    T = Ty(draw)

    gap = mm_px(7)
    block_h = T.h(BRAND, F["brand"]) + gap + T.h(TAGLINE, F["tag"])
    y = (H - block_h) // 2

    y = draw_centered(draw, T, BRAND, F["brand"], y, W, C_WHITE)
    y += gap
    draw_centered(draw, T, TAGLINE, F["tag"], y, W, C_SOFT)

    draw.line([(m, H - m), (W - m, H - m)], fill=C_ACCENT, width=max(1, mm_px(0.35)))
    img.convert("RGB").save(out, "PNG", dpi=(DPI, DPI))
    print(f"OK {out.name}  {W}×{H}px  (бренд + слоган)")


def _fit_font(T: Ty, text: str, role: str, max_w: int, max_h: int, start_mm: float, min_mm: float) -> ImageFont.FreeTypeFont:
    """Подбор кегля: цифра заполняет пластину с полями."""
    size_mm = start_mm
    while size_mm >= min_mm:
        f = font(role, mm_px(size_mm))
        if T.w(text, f) <= max_w and T.h(text, f) <= max_h:
            return f
        size_mm -= 0.5
    return font(role, mm_px(min_mm))


def render_office_120(out: Path) -> None:
    """НОМЕР ОФИСА + 120 — на всю пластину."""
    W, H = mm_px(PLAQUE_W_MM), mm_px(PLAQUE_H_MM)
    m = mm_px(6)
    pad_x = mm_px(4)

    img = paint_bg_full(W, H)
    draw = ImageDraw.Draw(img)
    T = Ty(draw)

    label = "НОМЕР ОФИСА"
    num = "120"

    F_label = font("semi", mm_px(6.2))
    gap_label_num = mm_px(5)
    rule_gap = mm_px(3)
    rule_w = mm_px(42)

    label_h = T.h(label, F_label)
    reserved = label_h + gap_label_num + rule_gap * 2 + mm_px(2)
    num_max_w = W - 2 * m - 2 * pad_x
    num_max_h = H - 2 * m - reserved
    F_num = _fit_font(T, num, "display", num_max_w, num_max_h, start_mm=50, min_mm=26)

    num_h = T.h(num, F_num)
    block_h = label_h + gap_label_num + rule_gap + num_h
    y0 = (H - block_h) // 2 - mm_px(1)

    # Подпись
    lw = T.w(label, F_label)
    lx = (W - lw) // 2
    draw.text((lx, y0), label, font=F_label, fill=C_ACCENT_L)
    y0 += label_h + gap_label_num

    # Декоративные линии вокруг цифры
    cx = W // 2
    draw.line([(cx - rule_w // 2, y0), (cx + rule_w // 2, y0)], fill=C_ACCENT, width=max(1, mm_px(0.45)))
    y0 += rule_gap

    num_w = T.w(num, F_num)
    draw.text(((W - num_w) // 2, y0), num, font=F_num, fill=C_WHITE)
    y0 += num_h + rule_gap
    draw.line([(cx - rule_w // 2, y0), (cx + rule_w // 2, y0)], fill=(*C_ACCENT_L, 140), width=max(1, mm_px(0.35)))

    draw.line([(m, H - m), (W - m, H - m)], fill=C_ACCENT, width=max(1, mm_px(0.35)))
    img.convert("RGB").save(out, "PNG", dpi=(DPI, DPI))
    print(f"OK {out.name}  {W}×{H}px  (НОМЕР ОФИСА + 120)")


def main() -> None:
    render_main(DESKTOP / "APV-plaque-25x10-main-300dpi.png")
    render_office_120(DESKTOP / "APV-plaque-25x10-office-120-300dpi.png")


if __name__ == "__main__":
    main()
