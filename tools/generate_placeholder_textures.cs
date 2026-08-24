using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;

class TextureGenerator
{
    static string OUTPUT_DIR = @"C:\Users\Adriel Rodriguez\Desktop\mods\mi-mod-aventura\resource_pack\textures\entity";

    // Paleta de colores
    static Color GOLD = Color.FromArgb(255, 215, 0);           // Dorado brillante
    static Color GOLD_DARK = Color.FromArgb(200, 160, 0);      // Dorado oscuro
    static Color BLACK = Color.FromArgb(10, 10, 15);           // Negro profundo
    static Color BLACK_LIGHT = Color.FromArgb(30, 30, 40);     // Negro claro
    static Color VIOLET = Color.FromArgb(123, 44, 191);        // Violeta enfermo #7B2CBF
    static Color VIOLET_BRIGHT = Color.FromArgb(187, 134, 252); // Violeta brillante #BB86FC
    static Color VIOLET_DARK = Color.FromArgb(45, 0, 71);      // Violeta muy oscuro #2D0047
    static Color WHITE = Color.FromArgb(255, 255, 255);        // Blanco

    static void Main()
    {
        Directory.CreateDirectory(OUTPUT_DIR);

        using (Bitmap baseTex = CreateRastreroTexture())
        using (Bitmap corruptedTex = CreateRastreroCorruptedTexture())
        {
            baseTex.Save(Path.Combine(OUTPUT_DIR, "rastrero.png"), ImageFormat.Png);
            corruptedTex.Save(Path.Combine(OUTPUT_DIR, "rastrero_corrupted.png"), ImageFormat.Png);
        }

        Console.WriteLine($"✅ Generadas texturas placeholder en {OUTPUT_DIR}");
        Console.WriteLine("   - rastrero.png (base dorada)");
        Console.WriteLine("   - rastrero_corrupted.png (variante corrupta negra/violeta)");
        Console.WriteLine("\n⚠️  Son placeholders programáticos - reemplazar por arte final después");
    }

    static Bitmap CreateRastreroTexture()
    {
        Bitmap bmp = new Bitmap(64, 64, PixelFormat.Format32bppArgb);
        using (Graphics g = Graphics.FromImage(bmp))
        {
            g.Clear(Color.Transparent);
            using (SolidBrush brush = new SolidBrush(Color.Transparent))
            {
                // ===== BODY (UV: 0,0 - 8x12x6 box) =====
                // Front face (8x12) at UV 0,0
                FillRect(g, 0, 0, 8, 12, GOLD);
                FillRect(g, 1, 1, 6, 10, GOLD_DARK);
                // Back face (8x12) at UV 8,0
                FillRect(g, 8, 0, 8, 12, GOLD_DARK);
                // Right side (6x12) at UV 16,0
                FillRect(g, 16, 0, 6, 12, GOLD);
                // Left side (6x12) at UV 22,0
                FillRect(g, 22, 0, 6, 12, GOLD_DARK);
                // Top (8x6) at UV 28,0
                FillRect(g, 28, 0, 8, 6, GOLD);
                // Bottom (8x6) at UV 28,6
                FillRect(g, 28, 6, 8, 6, BLACK);

                // ===== HEAD (UV: 0,18 - 8x8x8 box) =====
                // Front (8x8) at 0,18
                FillRect(g, 0, 18, 8, 8, GOLD);
                FillRect(g, 1, 19, 6, 6, GOLD_DARK);
                // Eyes - violeta emissive
                FillRect(g, 2, 20, 1, 1, VIOLET_BRIGHT);
                FillRect(g, 5, 20, 1, 1, VIOLET_BRIGHT);
                // Back (8x8) at 8,18
                FillRect(g, 8, 18, 8, 8, GOLD_DARK);
                // Right side (8x8) at 16,18
                FillRect(g, 16, 18, 8, 8, GOLD);
                // Left side (8x8) at 24,18
                FillRect(g, 24, 18, 8, 8, GOLD_DARK);
                // Top (8x8) at 32,18
                FillRect(g, 32, 18, 8, 8, GOLD);
                // Bottom (8x8) at 40,18
                FillRect(g, 40, 18, 8, 8, BLACK);

                // ===== HORNS (UV: 32,0 - 2x6x2 each) =====
                // Left horn
                FillRect(g, 32, 0, 2, 6, GOLD);
                FillRect(g, 34, 0, 2, 6, GOLD_DARK);
                FillRect(g, 36, 0, 2, 6, GOLD);
                FillRect(g, 38, 0, 2, 6, GOLD_DARK);
                FillRect(g, 40, 0, 2, 2, GOLD);
                FillRect(g, 42, 0, 2, 2, GOLD);
                // Right horn
                FillRect(g, 44, 0, 2, 6, GOLD);
                FillRect(g, 46, 0, 2, 6, GOLD_DARK);
                FillRect(g, 48, 0, 2, 6, GOLD);
                FillRect(g, 50, 0, 2, 6, GOLD_DARK);
                FillRect(g, 52, 0, 2, 2, GOLD);
                FillRect(g, 54, 0, 2, 2, GOLD);

                // ===== ARMS (UV: 28,18 - 4x12x4 each) =====
                // Left arm
                FillRect(g, 28, 18, 4, 12, GOLD);
                FillRect(g, 32, 18, 4, 12, GOLD_DARK);
                FillRect(g, 36, 18, 4, 12, GOLD);
                FillRect(g, 40, 18, 4, 12, GOLD_DARK);
                FillRect(g, 44, 18, 4, 4, GOLD);
                FillRect(g, 48, 18, 4, 4, BLACK);
                // Right arm
                FillRect(g, 28, 30, 4, 12, GOLD);
                FillRect(g, 32, 30, 4, 12, GOLD_DARK);
                FillRect(g, 36, 30, 4, 12, GOLD);
                FillRect(g, 40, 30, 4, 12, GOLD_DARK);
                FillRect(g, 44, 30, 4, 4, GOLD);
                FillRect(g, 48, 30, 4, 4, BLACK);

                // ===== LEGS (UV: 0,34 - 4x12x4 each) =====
                // Left leg
                FillRect(g, 0, 34, 4, 12, GOLD);
                FillRect(g, 4, 34, 4, 12, GOLD_DARK);
                FillRect(g, 8, 34, 4, 12, GOLD);
                FillRect(g, 12, 34, 4, 12, GOLD_DARK);
                FillRect(g, 16, 34, 4, 4, GOLD);
                FillRect(g, 20, 34, 4, 4, BLACK);
                // Right leg
                FillRect(g, 24, 34, 4, 12, GOLD);
                FillRect(g, 28, 34, 4, 12, GOLD_DARK);
                FillRect(g, 32, 34, 4, 12, GOLD);
                FillRect(g, 36, 34, 4, 12, GOLD_DARK);
                FillRect(g, 40, 34, 4, 4, GOLD);
                FillRect(g, 44, 34, 4, 4, BLACK);

                // ===== CORRUPTION TENDRILS (UV: 40,0 and 40,10) =====
                // Tendril 1 (2x8x2) at 40,0 -> mapped to 56,0
                FillRect(g, 56, 0, 2, 8, VIOLET);
                FillRect(g, 58, 0, 2, 8, VIOLET_DARK);
                FillRect(g, 60, 0, 2, 8, VIOLET);
                FillRect(g, 62, 0, 2, 8, VIOLET_DARK);
                // Tendril 2 (2x6x2) at 40,10 -> mapped to 56,10
                FillRect(g, 56, 10, 2, 6, VIOLET_BRIGHT);
                FillRect(g, 58, 10, 2, 6, VIOLET);
                FillRect(g, 60, 10, 2, 6, VIOLET_BRIGHT);
                FillRect(g, 62, 10, 2, 6, VIOLET);

                // Crack lines on body
                DrawLine(g, 4, 0, 4, 12, VIOLET, 1);
                DrawLine(g, 12, 6, 16, 6, VIOLET, 1);
            }
        }
        return bmp;
    }

    static Bitmap CreateRastreroCorruptedTexture()
    {
        Bitmap bmp = new Bitmap(64, 64, PixelFormat.Format32bppArgb);
        using (Graphics g = Graphics.FromImage(bmp))
        {
            g.Clear(Color.Transparent);
            using (SolidBrush brush = new SolidBrush(Color.Transparent))
            {
                // ===== BODY - mayormente negro con grietas violetas =====
                FillRect(g, 0, 0, 8, 12, BLACK);
                FillRect(g, 1, 1, 6, 10, BLACK_LIGHT);
                FillRect(g, 8, 0, 8, 12, BLACK);
                FillRect(g, 16, 0, 6, 12, BLACK_LIGHT);
                FillRect(g, 22, 0, 6, 12, BLACK);
                FillRect(g, 28, 0, 8, 6, BLACK_LIGHT);
                FillRect(g, 28, 6, 8, 6, BLACK);

                // Grietas violetas en el cuerpo
                for (int i = 0; i < 8; i += 2)
                    DrawLine(g, i, 0, i + 1, 12, VIOLET, 1);
                DrawLine(g, 4, 0, 8, 12, VIOLET_BRIGHT, 2);

                // ===== HEAD - negro con ojos violeta brillantes =====
                FillRect(g, 0, 18, 8, 8, BLACK);
                FillRect(g, 1, 19, 6, 6, BLACK_LIGHT);
                // Ojos grandes brillantes
                FillRect(g, 1, 20, 3, 3, VIOLET_BRIGHT);
                FillRect(g, 5, 20, 3, 3, VIOLET_BRIGHT);
                FillRect(g, 8, 18, 8, 8, BLACK);
                FillRect(g, 16, 18, 8, 8, BLACK_LIGHT);
                FillRect(g, 24, 18, 8, 8, BLACK);
                FillRect(g, 32, 18, 8, 8, BLACK_LIGHT);
                FillRect(g, 40, 18, 8, 8, BLACK);

                // ===== HORNS - cristalizados violeta =====
                for (int xStart = 32; xStart <= 44; xStart += 12)
                {
                    FillRect(g, xStart, 0, 2, 6, VIOLET);
                    FillRect(g, xStart + 2, 0, 2, 6, VIOLET_DARK);
                    FillRect(g, xStart + 4, 0, 2, 6, VIOLET);
                    FillRect(g, xStart + 6, 0, 2, 6, VIOLET_DARK);
                    FillRect(g, xStart + 8, 0, 2, 2, VIOLET_BRIGHT);
                    FillRect(g, xStart + 10, 0, 2, 2, VIOLET_BRIGHT);
                }

                // ===== ARMS - negros con vetas violetas =====
                for (int yStart = 18; yStart <= 30; yStart += 12)
                {
                    FillRect(g, 28, yStart, 4, 12, BLACK);
                    FillRect(g, 32, yStart, 4, 12, BLACK_LIGHT);
                    FillRect(g, 36, yStart, 4, 12, BLACK);
                    FillRect(g, 40, yStart, 4, 12, BLACK_LIGHT);
                    // Veta emissive central
                    DrawLine(g, 30, yStart, 30, yStart + 12, VIOLET_BRIGHT, 2);
                    FillRect(g, 44, yStart, 4, 4, VIOLET);
                    FillRect(g, 48, yStart, 4, 4, BLACK);
                }

                // ===== LEGS =====
                for (int xStart = 0; xStart <= 24; xStart += 24)
                {
                    FillRect(g, xStart, 34, 4, 12, BLACK);
                    FillRect(g, xStart + 4, 34, 4, 12, BLACK_LIGHT);
                    FillRect(g, xStart + 8, 34, 4, 12, BLACK);
                    FillRect(g, xStart + 12, 34, 4, 12, BLACK_LIGHT);
                    FillRect(g, xStart + 16, 34, 4, 4, VIOLET);
                    FillRect(g, xStart + 20, 34, 4, 4, BLACK);
                }

                // ===== TENDRILS - más brillantes =====
                FillRect(g, 56, 0, 2, 8, VIOLET_BRIGHT);
                FillRect(g, 58, 0, 2, 8, VIOLET);
                FillRect(g, 60, 0, 2, 8, VIOLET_BRIGHT);
                FillRect(g, 62, 0, 2, 8, VIOLET);
                FillRect(g, 56, 10, 2, 6, VIOLET_BRIGHT);
                FillRect(g, 58, 10, 2, 6, VIOLET);
                FillRect(g, 60, 10, 2, 6, VIOLET_BRIGHT);
                FillRect(g, 62, 10, 2, 6, VIOLET);

                // Grietas adicionales
                DrawLine(g, 0, 34, 64, 34, VIOLET, 1);
                DrawLine(g, 32, 18, 32, 46, VIOLET, 1);
            }
        }
        return bmp;
    }

    static void FillRect(Graphics g, int x, int y, int w, int h, Color color)
    {
        using (SolidBrush brush = new SolidBrush(color))
        {
            g.FillRectangle(brush, x, y, w, h);
        }
    }

    static void DrawLine(Graphics g, int x1, int y1, int x2, int y2, Color color, int width)
    {
        using (Pen pen = new Pen(color, width))
        {
            g.DrawLine(pen, x1, y1, x2, y2);
        }
    }
}