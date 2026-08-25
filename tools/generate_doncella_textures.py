#!/usr/bin/env python3
"""
Genera texturas placeholder para la Doncella de Cristal usando el layout UV de doncella_cristal.geo.json
Mitad izquierda: cristal brillante con luz interior (azul/blanco)
Mitad derecha: hueca y oscura por dentro (negro con grietas violetas)
"""

from PIL import Image, ImageDraw
import os

OUTPUT_DIR = r"C:\Users\Adriel Rodriguez\Desktop\mods\mi-mod-aventura\resource_pack\textures\entity"
SIZE = 128

# Paleta
CRYSTAL_GLOW = (180, 230, 255)     # Azul cristalino brillante (mitad luminosa)
CRYSTAL_GLOW_DARK = (120, 180, 220) # Sombra de cristal
CRYSTAL_BRIGHT = (220, 250, 255)   # Blanco azulado - highlights
VOID_BLACK = (5, 5, 10)            # Negro profundo - interior hueco
VOID_DARK = (20, 15, 30)           # Negro violeta oscuro
VIOLET = (123, 44, 191)            # Violeta corrupto
VIOLET_BRIGHT = (187, 134, 252)    # Violeta brillante emissive
GOLD = (255, 215, 0)               # Dorado (detalles corona)
SKIN_DARK = (60, 50, 70)           # Piel oscura

def create_doncella_texture():
    """Textura base: mitad izquierda luminosa, mitad derecha hueca"""
    img = Image.new('RGBA', (SIZE, SIZE), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # ===== HEAD (UV: 0,0 - 7x7x7) =====
    # Frente (7x7) en 0,0
    # Mitad izquierda luminosa
    draw.rectangle([0, 0, 3, 7], fill=CRYSTAL_GLOW)
    draw.rectangle([1, 1, 2, 6], fill=CRYSTAL_BRIGHT)
    # Mitad derecha hueca
    draw.rectangle([4, 0, 7, 7], fill=VOID_BLACK)
    draw.rectangle([4, 0, 7, 7], outline=VOID_DARK, width=1)
    # Ojos: izquierdo luminoso, derecho violeta en hueco
    draw.rectangle([1, 3, 2, 4], fill=CRYSTAL_BRIGHT)
    draw.rectangle([5, 3, 6, 4], fill=VIOLET_BRIGHT)
    # Back (7x7) en 7,0
    draw.rectangle([7, 0, 10, 7], fill=CRYSTAL_GLOW_DARK)
    draw.rectangle([11, 0, 14, 7], fill=VOID_DARK)
    # Sides
    draw.rectangle([14, 0, 17, 7], fill=CRYSTAL_GLOW)
    draw.rectangle([18, 0, 21, 7], fill=VOID_BLACK)
    # Top (7x7) en 21,0
    draw.rectangle([21, 0, 28, 7], fill=CRYSTAL_GLOW_DARK)
    # Bottom (7x7) en 28,0
    draw.rectangle([28, 0, 35, 7], fill=VOID_DARK)

    # ===== CHEST (UV: 0,40 - 8x8x5) =====
    # Front (8x8) en 0,40
    draw.rectangle([0, 40, 4, 48], fill=CRYSTAL_GLOW)     # izq luminosa
    draw.rectangle([4, 40, 8, 48], fill=VOID_BLACK)       # der hueca
    draw.rectangle([4, 40, 8, 48], outline=VOID_DARK, width=1)
    # "Vena" de luz que cruza
    draw.line([0, 44, 4, 44], fill=CRYSTAL_BRIGHT, width=1)
    draw.line([4, 44, 8, 44], fill=VIOLET_BRIGHT, width=1)
    # Back (8x8) en 8,40
    draw.rectangle([8, 40, 12, 48], fill=CRYSTAL_GLOW_DARK)
    draw.rectangle([12, 40, 16, 48], fill=VOID_DARK)
    # Sides (5x8) en 16,40 y 21,40
    draw.rectangle([16, 40, 21, 48], fill=CRYSTAL_GLOW)
    draw.rectangle([21, 40, 26, 48], fill=VOID_BLACK)
    # Top (8x5) en 26,40
    draw.rectangle([26, 40, 34, 45], fill=CRYSTAL_GLOW_DARK)
    # Bottom (8x5) en 26,45
    draw.rectangle([26, 45, 34, 50], fill=VOID_DARK)

    # ===== BODY (UV: 0,16 - 8x11x5) =====
    # Front (8x11) en 0,16
    draw.rectangle([0, 16, 4, 27], fill=CRYSTAL_GLOW)
    draw.rectangle([4, 16, 8, 27], fill=VOID_BLACK)
    draw.rectangle([4, 16, 8, 27], outline=VOID_DARK, width=1)
    # Grietas en la parte hueca
    draw.line([5, 16, 7, 27], fill=VIOLET, width=1)
    draw.line([6, 18, 8, 22], fill=VIOLET_BRIGHT, width=1)
    # Back (8x11) en 8,16
    draw.rectangle([8, 16, 12, 27], fill=CRYSTAL_GLOW_DARK)
    draw.rectangle([12, 16, 16, 27], fill=VOID_DARK)
    # Sides (5x11) en 16,16 y 21,16
    draw.rectangle([16, 16, 21, 27], fill=CRYSTAL_GLOW)
    draw.rectangle([21, 16, 26, 27], fill=VOID_BLACK)
    # Top (8x5) en 26,16
    draw.rectangle([26, 16, 34, 21], fill=CRYSTAL_GLOW_DARK)
    # Bottom (8x5) en 26,+21
    draw.rectangle([26, 21, 34, 26], fill=VOID_DARK)

    # ===== WAIST (UV: 64,0 - 7x5x6) =====
    # Front (7x5) en 64,0
    draw.rectangle([64, 0, 67, 5], fill=CRYSTAL_GLOW)
    draw.rectangle([68, 0, 71, 5], fill=VOID_BLACK)
    # Back (7x5) en 64,5
    draw.rectangle([64, 5, 67, 10], fill=CRYSTAL_GLOW_DARK)
    draw.rectangle([68, 5, 71, 10], fill=VOID_DARK)
    # Sides (6x5) en 64,10 y 64,15
    draw.rectangle([64, 10, 70, 15], fill=CRYSTAL_GLOW)
    draw.rectangle([64, 15, 70, 20], fill=VOID_BLACK)
    # Top (7x6) en 64,20
    draw.rectangle([64, 20, 71, 26], fill=CRYSTAL_GLOW_DARK)
    # Bottom (7x6) en 64,26
    draw.rectangle([64, 26, 71, 32], fill=VOID_DARK)

    # ===== RIGHT SHOULDER (UV: 90,0 - 5x5x4) =====
    draw.rectangle([90, 0, 95, 5], fill=CRYSTAL_GLOW)
    draw.rectangle([90, 5, 95, 10], fill=CRYSTAL_GLOW_DARK)
    draw.rectangle([90, 10, 95, 15], fill=CRYSTAL_GLOW)
    draw.rectangle([90, 15, 95, 20], fill=CRYSTAL_GLOW_DARK)
    draw.rectangle([90, 20, 95, 25], fill=CRYSTAL_GLOW)
    draw.rectangle([90, 25, 95, 30], fill=CRYSTAL_GLOW_DARK)

    # ===== LEFT SHOULDER (UV: 102,0 - 5x5x4) =====
    draw.rectangle([102, 0, 107, 5], fill=VOID_BLACK)
    draw.rectangle([102, 5, 107, 10], fill=VOID_DARK)
    draw.rectangle([102, 10, 107, 15], fill=VOID_BLACK)
    draw.rectangle([102, 15, 107, 20], fill=VOID_DARK)
    draw.rectangle([102, 20, 107, 25], fill=VOID_BLACK)
    draw.rectangle([102, 25, 107, 30], fill=VOID_DARK)

    # ===== ARMS (UV: 32,16 / 44,16 - 3x11x3 each) =====
    # Right arm (luminosa)
    draw.rectangle([32, 16, 35, 27], fill=CRYSTAL_GLOW)
    draw.rectangle([35, 16, 38, 27], fill=CRYSTAL_GLOW_DARK)
    draw.rectangle([38, 16, 41, 27], fill=CRYSTAL_GLOW)
    draw.rectangle([41, 16, 44, 27], fill=CRYSTAL_GLOW_DARK)
    draw.rectangle([44, 16, 47, 19], fill=CRYSTAL_GLOW)
    draw.rectangle([47, 16, 50, 19], fill=VOID_DARK)
    # Left arm (hueca)
    draw.rectangle([44, 16, 47, 27], fill=VOID_BLACK)
    draw.rectangle([47, 16, 50, 27], fill=VOID_DARK)
    draw.rectangle([50, 16, 53, 27], fill=VOID_BLACK)
    draw.rectangle([53, 16, 56, 27], fill=VOID_DARK)
    draw.rectangle([56, 16, 59, 19], fill=VOID_BLACK)
    draw.rectangle([59, 16, 62, 19], fill=VOID_DARK)

    # ===== HANDS (UV: 48,48 / 60,48 - 4x4x4) =====
    # Right hand (luminosa)
    draw.rectangle([48, 48, 52, 52], fill=CRYSTAL_BRIGHT)
    draw.rectangle([52, 48, 56, 52], fill=CRYSTAL_GLOW)
    draw.rectangle([56, 48, 60, 52], fill=CRYSTAL_GLOW_DARK)
    draw.rectangle([60, 48, 64, 52], fill=CRYSTAL_GLOW)
    draw.rectangle([64, 48, 68, 52], fill=CRYSTAL_BRIGHT)
    draw.rectangle([68, 48, 72, 52], fill=CRYSTAL_GLOW_DARK)
    # Left hand (hueca)
    draw.rectangle([60, 48, 64, 52], fill=VOID_BLACK)  # overlap avoid
    draw.rectangle([60, 48, 64, 52], fill=VOID_BLACK)
    draw.rectangle([64, 48, 68, 52], fill=VOID_DARK)
    draw.rectangle([68, 48, 72, 52], fill=VOID_BLACK)
    draw.rectangle([72, 48, 76, 52], fill=VOID_DARK)
    draw.rectangle([76, 48, 80, 52], fill=VOID_BLACK)
    draw.rectangle([80, 48, 84, 52], fill=VOID_DARK)

    # ===== LEGS (UV: 0,55 / 12,55 - 3x12x3) =====
    # Right leg (luminosa)
    draw.rectangle([0, 55, 3, 67], fill=CRYSTAL_GLOW)
    draw.rectangle([3, 55, 6, 67], fill=CRYSTAL_GLOW_DARK)
    draw.rectangle([6, 55, 9, 67], fill=CRYSTAL_GLOW)
    draw.rectangle([9, 55, 12, 67], fill=CRYSTAL_GLOW_DARK)
    draw.rectangle([12, 55, 15, 58], fill=CRYSTAL_GLOW)  # top
    draw.rectangle([15, 55, 18, 58], fill=VOID_DARK)     # bottom
    # Left leg (hueca)
    draw.rectangle([12, 55, 15, 67], fill=VOID_BLACK)   # avoid overlap
    draw.rectangle([12, 55, 15, 67], fill=VOID_BLACK)
    draw.rectangle([15, 55, 18, 67], fill=VOID_DARK)
    draw.rectangle([18, 55, 21, 67], fill=VOID_BLACK)
    draw.rectangle([21, 55, 24, 67], fill=VOID_DARK)
    draw.rectangle([24, 55, 27, 58], fill=VOID_BLACK)   # top
    draw.rectangle([27, 55, 30, 58], fill=VOID_DARK)    # bottom

    # ===== FEET (UV: 16,55 / 28,55 - 3x2x4) =====
    # Right foot (luminosa)
    draw.rectangle([16, 55, 19, 57], fill=CRYSTAL_GLOW)
    draw.rectangle([19, 55, 22, 57], fill=CRYSTAL_GLOW_DARK)
    draw.rectangle([22, 55, 25, 57], fill=CRYSTAL_GLOW)
    draw.rectangle([25, 55, 28, 57], fill=CRYSTAL_GLOW_DARK)
    # Left foot (hueca)
    draw.rectangle([28, 55, 31, 57], fill=VOID_BLACK)
    draw.rectangle([31, 55, 34, 57], fill=VOID_DARK)
    draw.rectangle([34, 55, 37, 57], fill=VOID_BLACK)
    draw.rectangle([37, 55, 40, 57], fill=VOID_DARK)

    # ===== CRYSTAL SHARDS (UV: 80,48 / 84,48 - 1x8x1) =====
    # Right shard (luminosa)
    draw.rectangle([80, 48, 81, 56], fill=CRYSTAL_BRIGHT)
    draw.rectangle([81, 48, 82, 56], fill=CRYSTAL_GLOW)
    draw.rectangle([82, 48, 83, 56], fill=CRYSTAL_BRIGHT)
    draw.rectangle([83, 48, 84, 56], fill=CRYSTAL_GLOW)
    # Left shard (hueca pero con borde violeta)
    draw.rectangle([84, 48, 85, 56], fill=VOID_BLACK)
    draw.rectangle([85, 48, 86, 56], fill=VIOLET)
    draw.rectangle([86, 48, 87, 56], fill=VOID_BLACK)
    draw.rectangle([87, 48, 88, 56], fill=VIOLET_BRIGHT)

    # ===== CROWN (UV: 88,48 / 92,48 / 96,48) =====
    # Front crown (dorada)
    draw.rectangle([88, 48, 92, 51], fill=GOLD)
    draw.rectangle([88, 51, 92, 52], fill=GOLD)
    draw.rectangle([89, 48, 91, 50], fill=CRYSTAL_BRIGHT)
    # Left crown (violeta - hueca)
    draw.rectangle([92, 48, 93, 52], fill=VIOLET)
    draw.rectangle([93, 48, 94, 52], fill=VOID_DARK)
    draw.rectangle([94, 48, 95, 52], fill=VIOLET)
    draw.rectangle([95, 48, 96, 52], fill=VOID_DARK)
    # Right crown (luminosa)
    draw.rectangle([96, 48, 97, 52], fill=CRYSTAL_BRIGHT)
    draw.rectangle([97, 48, 98, 52], fill=CRYSTAL_GLOW)
    draw.rectangle([98, 48, 99, 52], fill=CRYSTAL_BRIGHT)
    draw.rectangle([99, 48, 100, 52], fill=CRYSTAL_GLOW)

    return img


def create_doncella_phase2_texture():
    """Textura fase 2: más corrupta, grietas violetas más intensas en ambas mitades"""
    img = create_doncella_texture()
    draw = ImageDraw.Draw(img)

    # Añadir grietas violetas brillantes por toda la textura
    # Cuerpo
    for x in range(0, 8, 2):
        draw.line([x, 16, x+1, 27], fill=VIOLET_BRIGHT, width=1)
    # Pecho
    for x in range(0, 8, 3):
        draw.line([x, 40, x+1, 48], fill=VIOLET_BRIGHT, width=1)
    # Cabeza
    draw.line([0, 0, 3, 7], fill=VIOLET, width=1)
    draw.line([4, 0, 7, 7], fill=VIOLET_BRIGHT, width=2)
    # Brazos
    draw.line([32, 16, 35, 27], fill=VIOLET, width=1)
    draw.line([44, 16, 47, 27], fill=VIOLET_BRIGHT, width=1)
    # Piernas
    draw.line([0, 55, 3, 67], fill=VIOLET, width=1)
    draw.line([15, 55, 18, 67], fill=VIOLET_BRIGHT, width=1)

    # Realzar el borde entre mitades
    draw.line([4, 16, 4, 27], fill=VIOLET_BRIGHT, width=2)  # cuerpo
    draw.line([4, 40, 4, 48], fill=VIOLET, width=2)         # pecho
    draw.line([4, 0, 4, 7], fill=VIOLET_BRIGHT, width=1)    # cabeza
    draw.line([4, 55, 4, 67], fill=VIOLET, width=1)         # piernas

    return img


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    base = create_doncella_texture()
    phase2 = create_doncella_phase2_texture()

    base.save(os.path.join(OUTPUT_DIR, "doncella_cristal.png"))
    phase2.save(os.path.join(OUTPUT_DIR, "doncella_cristal_phase2.png"))

    print(f"[OK] Generadas texturas placeholder en {OUTPUT_DIR}")
    print("   - doncella_cristal.png (mitad luminosa / mitad hueca)")
    print("   - doncella_cristal_phase2.png (fase 2 corrupta)")
    print("\n[WARN]  Son placeholders programáticos - reemplazar por arte final después")


if __name__ == "__main__":
    main()