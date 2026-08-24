#!/usr/bin/env python3
"""
Genera texturas placeholder para El Sifón usando el layout UV real de rastrero.geo.json
Paleta: dorado (intacto), negro (corrupto), violeta enfermo (emissive/grietas)
"""

from PIL import Image, ImageDraw
import os

OUTPUT_DIR = r"C:\Users\Adriel Rodriguez\Desktop\mods\mi-mod-aventura\resource_pack\textures\entity"

# Paleta de colores (RGB)
GOLD = (255, 215, 0)           # Dorado brillante - partes intactas
GOLD_DARK = (200, 160, 0)      # Dorado oscuro - sombras
BLACK = (10, 10, 15)           # Negro profundo - base corrupta
BLACK_LIGHT = (30, 30, 40)     # Negro claro - detalles
VIOLET = (123, 44, 191)        # Violeta enfermo - emissive/grietas (#7B2CBF)
VIOLET_BRIGHT = (187, 134, 252) # Violeta brillante - emissive fuerte (#BB86FC)
VIOLET_DARK = (45, 0, 71)      # Violeta muy oscuro - grietas profundas (#2D0047)
WHITE = (255, 255, 255)        # Blanco - highlights

def create_rastrero_texture():
    """Textura base del Rastrero (64x64) - estado intacto/dorado"""
    img = Image.new('RGBA', (64, 64), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # ===== BODY (UV: 0,0 - size covers body faces) =====
    # Body UV region roughly: x=0-16, y=0-18 (front/back/sides/top/bottom of 8x12x6 box)
    # Front face (8x12) at UV 0,0
    draw.rectangle([0, 0, 8, 12], fill=GOLD)
    draw.rectangle([1, 1, 7, 11], fill=GOLD_DARK)  # inset for depth
    # Back face (8x12) at UV 8,0
    draw.rectangle([8, 0, 16, 12], fill=GOLD_DARK)
    # Right side (6x12) at UV 16,0
    draw.rectangle([16, 0, 22, 12], fill=GOLD)
    # Left side (6x12) at UV 22,0
    draw.rectangle([22, 0, 28, 12], fill=GOLD_DARK)
    # Top (8x6) at UV 28,0
    draw.rectangle([28, 0, 36, 6], fill=GOLD)
    # Bottom (8x6) at UV 28,6
    draw.rectangle([28, 6, 36, 12], fill=BLACK)

    # ===== HEAD (UV: 0,18 - 8x8x8 box) =====
    # Front (8x8) at 0,18
    draw.rectangle([0, 18, 8, 26], fill=GOLD)
    draw.rectangle([1, 19, 7, 25], fill=GOLD_DARK)
    # Eyes - violeta emissive
    draw.rectangle([2, 20, 3, 21], fill=VIOLET_BRIGHT)
    draw.rectangle([5, 20, 6, 21], fill=VIOLET_BRIGHT)
    # Back (8x8) at 8,18
    draw.rectangle([8, 18, 16, 26], fill=GOLD_DARK)
    # Right side (8x8) at 16,18
    draw.rectangle([16, 18, 24, 26], fill=GOLD)
    # Left side (8x8) at 24,18
    draw.rectangle([24, 18, 32, 26], fill=GOLD_DARK)
    # Top (8x8) at 32,18
    draw.rectangle([32, 18, 40, 26], fill=GOLD)
    # Bottom (8x8) at 40,18
    draw.rectangle([40, 18, 48, 26], fill=BLACK)

    # ===== HORNS (UV: 32,0 - 2x6x2 each) =====
    # Left horn faces
    draw.rectangle([32, 0, 34, 6], fill=GOLD)      # front
    draw.rectangle([34, 0, 36, 6], fill=GOLD_DARK) # back
    draw.rectangle([36, 0, 38, 6], fill=GOLD)      # side
    draw.rectangle([38, 0, 40, 6], fill=GOLD_DARK) # side
    draw.rectangle([40, 0, 42, 2], fill=GOLD)      # top
    draw.rectangle([42, 0, 44, 2], fill=GOLD)      # bottom
    # Right horn (same UV region, mirrored)
    draw.rectangle([44, 0, 46, 6], fill=GOLD)
    draw.rectangle([46, 0, 48, 6], fill=GOLD_DARK)
    draw.rectangle([48, 0, 50, 6], fill=GOLD)
    draw.rectangle([50, 0, 52, 6], fill=GOLD_DARK)
    draw.rectangle([52, 0, 54, 2], fill=GOLD)
    draw.rectangle([54, 0, 56, 2], fill=GOLD)

    # ===== ARMS (UV: 28,18 - 4x12x4 each) =====
    # Left arm
    draw.rectangle([28, 18, 32, 30], fill=GOLD)       # front
    draw.rectangle([32, 18, 36, 30], fill=GOLD_DARK)  # back
    draw.rectangle([36, 18, 40, 30], fill=GOLD)       # side
    draw.rectangle([40, 18, 44, 30], fill=GOLD_DARK)  # side
    draw.rectangle([44, 18, 48, 22], fill=GOLD)       # top
    draw.rectangle([48, 18, 52, 22], fill=BLACK)      # bottom
    # Right arm
    draw.rectangle([28, 30, 32, 42], fill=GOLD)
    draw.rectangle([32, 30, 36, 42], fill=GOLD_DARK)
    draw.rectangle([36, 30, 40, 42], fill=GOLD)
    draw.rectangle([40, 30, 44, 42], fill=GOLD_DARK)
    draw.rectangle([44, 30, 48, 34], fill=GOLD)
    draw.rectangle([48, 30, 52, 34], fill=BLACK)

    # ===== LEGS (UV: 0,34 - 4x12x4 each) =====
    # Left leg
    draw.rectangle([0, 34, 4, 46], fill=GOLD)
    draw.rectangle([4, 34, 8, 46], fill=GOLD_DARK)
    draw.rectangle([8, 34, 12, 46], fill=GOLD)
    draw.rectangle([12, 34, 16, 46], fill=GOLD_DARK)
    draw.rectangle([16, 34, 20, 38], fill=GOLD)
    draw.rectangle([20, 34, 24, 38], fill=BLACK)
    # Right leg
    draw.rectangle([24, 34, 28, 46], fill=GOLD)
    draw.rectangle([28, 34, 32, 46], fill=GOLD_DARK)
    draw.rectangle([32, 34, 36, 46], fill=GOLD)
    draw.rectangle([36, 34, 40, 46], fill=GOLD_DARK)
    draw.rectangle([40, 34, 44, 38], fill=GOLD)
    draw.rectangle([44, 34, 48, 38], fill=BLACK)

    # ===== CORRUPTION TENDRILS (UV: 40,0 and 40,10) =====
    # Tendril 1 (2x8x2) at 40,0
    draw.rectangle([56, 0, 58, 8], fill=VIOLET)      # front - emissive
    draw.rectangle([58, 0, 60, 8], fill=VIOLET_DARK) # back
    draw.rectangle([60, 0, 62, 8], fill=VIOLET)      # side
    draw.rectangle([62, 0, 64, 8], fill=VIOLET_DARK) # side
    # Tendril 2 (2x6x2) at 40,10
    draw.rectangle([56, 10, 58, 16], fill=VIOLET_BRIGHT)
    draw.rectangle([58, 10, 60, 16], fill=VIOLET)
    draw.rectangle([60, 10, 62, 16], fill=VIOLET_BRIGHT)
    draw.rectangle([62, 10, 64, 16], fill=VIOLET)

    # Add crack lines on body (violeta)
    draw.line([4, 0, 4, 12], fill=VIOLET, width=1)
    draw.line([12, 6, 16, 6], fill=VIOLET, width=1)

    return img


def create_rastrero_corrupted_texture():
    """Textura variante corrupta del Rastrero (64x64) - más negro/violeta"""
    img = Image.new('RGBA', (64, 64), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # ===== BODY - mayormente negro con grietas violetas =====
    draw.rectangle([0, 0, 8, 12], fill=BLACK)
    draw.rectangle([1, 1, 7, 11], fill=BLACK_LIGHT)
    draw.rectangle([8, 0, 16, 12], fill=BLACK)
    draw.rectangle([16, 0, 22, 12], fill=BLACK_LIGHT)
    draw.rectangle([22, 0, 28, 12], fill=BLACK)
    draw.rectangle([28, 0, 36, 6], fill=BLACK_LIGHT)
    draw.rectangle([28, 6, 36, 12], fill=BLACK)

    # Grietas violetas en el cuerpo
    for i in range(0, 8, 2):
        draw.line([i, 0, i+1, 12], fill=VIOLET, width=1)
    draw.line([4, 0, 8, 12], fill=VIOLET_BRIGHT, width=2)

    # ===== HEAD - negro con ojos violeta brillantes =====
    draw.rectangle([0, 18, 8, 26], fill=BLACK)
    draw.rectangle([1, 19, 7, 25], fill=BLACK_LIGHT)
    # Ojos grandes brillantes
    draw.rectangle([1, 20, 4, 23], fill=VIOLET_BRIGHT)
    draw.rectangle([5, 20, 8, 23], fill=VIOLET_BRIGHT)
    draw.rectangle([8, 18, 16, 26], fill=BLACK)
    draw.rectangle([16, 18, 24, 26], fill=BLACK_LIGHT)
    draw.rectangle([24, 18, 32, 26], fill=BLACK)
    draw.rectangle([32, 18, 40, 26], fill=BLACK_LIGHT)
    draw.rectangle([40, 18, 48, 26], fill=BLACK)

    # ===== HORNS - cristalizados violeta =====
    for x_start in [32, 44]:
        draw.rectangle([x_start, 0, x_start+2, 6], fill=VIOLET)
        draw.rectangle([x_start+2, 0, x_start+4, 6], fill=VIOLET_DARK)
        draw.rectangle([x_start+4, 0, x_start+6, 6], fill=VIOLET)
        draw.rectangle([x_start+6, 0, x_start+8, 6], fill=VIOLET_DARK)
        draw.rectangle([x_start+8, 0, x_start+10, 2], fill=VIOLET_BRIGHT)
        draw.rectangle([x_start+10, 0, x_start+12, 2], fill=VIOLET_BRIGHT)

    # ===== ARMS - negros con vetas violetas =====
    for y_start in [18, 30]:
        draw.rectangle([28, y_start, 32, y_start+12], fill=BLACK)
        draw.rectangle([32, y_start, 36, y_start+12], fill=BLACK_LIGHT)
        draw.rectangle([36, y_start, 40, y_start+12], fill=BLACK)
        draw.rectangle([40, y_start, 44, y_start+12], fill=BLACK_LIGHT)
        # Veta emissive central
        draw.line([30, y_start, 30, y_start+12], fill=VIOLET_BRIGHT, width=2)
        draw.rectangle([44, y_start, 48, y_start+4], fill=VIOLET)
        draw.rectangle([48, y_start, 52, y_start+4], fill=BLACK)

    # ===== LEGS =====
    for x_start in [0, 24]:
        draw.rectangle([x_start, 34, x_start+4, 46], fill=BLACK)
        draw.rectangle([x_start+4, 34, x_start+8, 46], fill=BLACK_LIGHT)
        draw.rectangle([x_start+8, 34, x_start+12, 46], fill=BLACK)
        draw.rectangle([x_start+12, 34, x_start+16, 46], fill=BLACK_LIGHT)
        draw.rectangle([x_start+16, 34, x_start+20, 38], fill=VIOLET)
        draw.rectangle([x_start+20, 34, x_start+24, 38], fill=BLACK)

    # ===== TENDRILS - más brillantes y largos visualmente =====
    # Tendril 1
    draw.rectangle([56, 0, 58, 8], fill=VIOLET_BRIGHT)
    draw.rectangle([58, 0, 60, 8], fill=VIOLET)
    draw.rectangle([60, 0, 62, 8], fill=VIOLET_BRIGHT)
    draw.rectangle([62, 0, 64, 8], fill=VIOLET)
    # Tendril 2
    draw.rectangle([56, 10, 58, 16], fill=VIOLET_BRIGHT)
    draw.rectangle([58, 10, 60, 16], fill=VIOLET)
    draw.rectangle([60, 10, 62, 16], fill=VIOLET_BRIGHT)
    draw.rectangle([62, 10, 64, 16], fill=VIOLET)

    # Grietas adicionales por todo el cuerpo
    draw.line([0, 34, 64, 34], fill=VIOLET, width=1)
    draw.line([32, 18, 32, 46], fill=VIOLET, width=1)

    return img


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # Generar texturas
    base = create_rastrero_texture()
    corrupted = create_rastrero_corrupted_texture()

    base.save(os.path.join(OUTPUT_DIR, "rastrero.png"))
    corrupted.save(os.path.join(OUTPUT_DIR, "rastrero_corrupted.png"))

    print(f"✅ Generadas texturas placeholder en {OUTPUT_DIR}")
    print("   - rastrero.png (base dorada)")
    print("   - rastrero_corrupted.png (variante corrupta negra/violeta)")
    print("\n⚠️  Son placeholders programáticos - reemplazar por arte final después")


if __name__ == "__main__":
    main()