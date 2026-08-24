#!/usr/bin/env pwsh
<#
Genera texturas placeholder para El Sifón usando el layout UV real de rastrero.geo.json
Paleta: dorado (intacto), negro (corrupto), violeta enfermo (emissive/grietas)
#>

Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.Drawing.Common

$OUTPUT_DIR = "C:\Users\Adriel Rodriguez\Desktop\mods\mi-mod-aventura\resource_pack\textures\entity"
New-Item -ItemType Directory -Force -Path $OUTPUT_DIR | Out-Null

# Paleta de colores
$GOLD = [System.Drawing.Color]::FromArgb(255, 215, 0)           # Dorado brillante
$GOLD_DARK = [System.Drawing.Color]::FromArgb(200, 160, 0)      # Dorado oscuro
$BLACK = [System.Drawing.Color]::FromArgb(10, 10, 15)           # Negro profundo
$BLACK_LIGHT = [System.Drawing.Color]::FromArgb(30, 30, 40)     # Negro claro
$VIOLET = [System.Drawing.Color]::FromArgb(123, 44, 191)        # Violeta enfermo #7B2CBF
$VIOLET_BRIGHT = [System.Drawing.Color]::FromArgb(187, 134, 252) # Violeta brillante #BB86FC
$VIOLET_DARK = [System.Drawing.Color]::FromArgb(45, 0, 71)      # Violeta muy oscuro #2D0047

function FillRect($g, $x, $y, $w, $h, $color) {
    $brush = New-Object System.Drawing.SolidBrush($color)
    $g.FillRectangle($brush, $x, $y, $w, $h)
    $brush.Dispose()
}

function DrawLine($g, $x1, $y1, $x2, $y2, $color, $width) {
    $pen = New-Object System.Drawing.Pen($color, $width)
    $g.DrawLine($pen, $x1, $y1, $x2, $y2)
    $pen.Dispose()
}

function CreateRastreroTexture {
    $bmp = New-Object System.Drawing.Bitmap(64, 64, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.Clear([System.Drawing.Color]::Transparent)

    # ===== BODY (UV: 0,0 - 8x12x6 box) =====
    FillRect $g 0 0 8 12 $GOLD
    FillRect $g 1 1 6 10 $GOLD_DARK
    FillRect $g 8 0 8 12 $GOLD_DARK
    FillRect $g 16 0 6 12 $GOLD
    FillRect $g 22 0 6 12 $GOLD_DARK
    FillRect $g 28 0 8 6 $GOLD
    FillRect $g 28 6 8 6 $BLACK

    # ===== HEAD (UV: 0,18 - 8x8x8 box) =====
    FillRect $g 0 18 8 8 $GOLD
    FillRect $g 1 19 6 6 $GOLD_DARK
    FillRect $g 2 20 1 1 $VIOLET_BRIGHT
    FillRect $g 5 20 1 1 $VIOLET_BRIGHT
    FillRect $g 8 18 8 8 $GOLD_DARK
    FillRect $g 16 18 8 8 $GOLD
    FillRect $g 24 18 8 8 $GOLD_DARK
    FillRect $g 32 18 8 8 $GOLD
    FillRect $g 40 18 8 8 $BLACK

    # ===== HORNS (UV: 32,0 - 2x6x2 each) =====
    FillRect $g 32 0 2 6 $GOLD
    FillRect $g 34 0 2 6 $GOLD_DARK
    FillRect $g 36 0 2 6 $GOLD
    FillRect $g 38 0 2 6 $GOLD_DARK
    FillRect $g 40 0 2 2 $GOLD
    FillRect $g 42 0 2 2 $GOLD
    FillRect $g 44 0 2 6 $GOLD
    FillRect $g 46 0 2 6 $GOLD_DARK
    FillRect $g 48 0 2 6 $GOLD
    FillRect $g 50 0 2 6 $GOLD_DARK
    FillRect $g 52 0 2 2 $GOLD
    FillRect $g 54 0 2 2 $GOLD

    # ===== ARMS (UV: 28,18 - 4x12x4 each) =====
    FillRect $g 28 18 4 12 $GOLD
    FillRect $g 32 18 4 12 $GOLD_DARK
    FillRect $g 36 18 4 12 $GOLD
    FillRect $g 40 18 4 12 $GOLD_DARK
    FillRect $g 44 18 4 4 $GOLD
    FillRect $g 48 18 4 4 $BLACK
    FillRect $g 28 30 4 12 $GOLD
    FillRect $g 32 30 4 12 $GOLD_DARK
    FillRect $g 36 30 4 12 $GOLD
    FillRect $g 40 30 4 12 $GOLD_DARK
    FillRect $g 44 30 4 4 $GOLD
    FillRect $g 48 30 4 4 $BLACK

    # ===== LEGS (UV: 0,34 - 4x12x4 each) =====
    FillRect $g 0 34 4 12 $GOLD
    FillRect $g 4 34 4 12 $GOLD_DARK
    FillRect $g 8 34 4 12 $GOLD
    FillRect $g 12 34 4 12 $GOLD_DARK
    FillRect $g 16 34 4 4 $GOLD
    FillRect $g 20 34 4 4 $BLACK
    FillRect $g 24 34 4 12 $GOLD
    FillRect $g 28 34 4 12 $GOLD_DARK
    FillRect $g 32 34 4 12 $GOLD
    FillRect $g 36 34 4 12 $GOLD_DARK
    FillRect $g 40 34 4 4 $GOLD
    FillRect $g 44 34 4 4 $BLACK

    # ===== CORRUPTION TENDRILS (UV: 40,0 and 40,10) =====
    FillRect $g 56 0 2 8 $VIOLET
    FillRect $g 58 0 2 8 $VIOLET_DARK
    FillRect $g 60 0 2 8 $VIOLET
    FillRect $g 62 0 2 8 $VIOLET_DARK
    FillRect $g 56 10 2 6 $VIOLET_BRIGHT
    FillRect $g 58 10 2 6 $VIOLET
    FillRect $g 60 10 2 6 $VIOLET_BRIGHT
    FillRect $g 62 10 2 6 $VIOLET

    DrawLine $g 4 0 4 12 $VIOLET 1
    DrawLine $g 12 6 16 6 $VIOLET 1

    $g.Dispose()
    return $bmp
}

function CreateRastreroCorruptedTexture {
    $bmp = New-Object System.Drawing.Bitmap(64, 64, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.Clear([System.Drawing.Color]::Transparent)

    # ===== BODY - mayormente negro con grietas violetas =====
    FillRect $g 0 0 8 12 $BLACK
    FillRect $g 1 1 6 10 $BLACK_LIGHT
    FillRect $g 8 0 8 12 $BLACK
    FillRect $g 16 0 6 12 $BLACK_LIGHT
    FillRect $g 22 0 6 12 $BLACK
    FillRect $g 28 0 8 6 $BLACK_LIGHT
    FillRect $g 28 6 8 6 $BLACK

    # Grietas violetas en el cuerpo
    for ($i = 0; $i -lt 8; $i += 2) {
        DrawLine $g $i 0 ($i + 1) 12 $VIOLET 1
    }
    DrawLine $g 4 0 8 12 $VIOLET_BRIGHT 2

    # ===== HEAD - negro con ojos violeta brillantes =====
    FillRect $g 0 18 8 8 $BLACK
    FillRect $g 1 19 6 6 $BLACK_LIGHT
    FillRect $g 1 20 3 3 $VIOLET_BRIGHT
    FillRect $g 5 20 3 3 $VIOLET_BRIGHT
    FillRect $g 8 18 8 8 $BLACK
    FillRect $g 16 18 8 8 $BLACK_LIGHT
    FillRect $g 24 18 8 8 $BLACK
    FillRect $g 32 18 8 8 $BLACK_LIGHT
    FillRect $g 40 18 8 8 $BLACK

    # ===== HORNS - cristalizados violeta =====
    32, 44 | ForEach-Object {
        FillRect $g $_ 0 2 6 $VIOLET
        FillRect $g ($_ + 2) 0 2 6 $VIOLET_DARK
        FillRect $g ($_ + 4) 0 2 6 $VIOLET
        FillRect $g ($_ + 6) 0 2 6 $VIOLET_DARK
        FillRect $g ($_ + 8) 0 2 2 $VIOLET_BRIGHT
        FillRect $g ($_ + 10) 0 2 2 $VIOLET_BRIGHT
    }

    # ===== ARMS - negros con vetas violetas =====
    18, 30 | ForEach-Object {
        FillRect $g 28 $_ 4 12 $BLACK
        FillRect $g 32 $_ 4 12 $BLACK_LIGHT
        FillRect $g 36 $_ 4 12 $BLACK
        FillRect $g 40 $_ 4 12 $BLACK_LIGHT
        DrawLine $g 30 $_ 30 ($_ + 12) $VIOLET_BRIGHT 2
        FillRect $g 44 $_ 4 4 $VIOLET
        FillRect $g 48 $_ 4 4 $BLACK
    }

    # ===== LEGS =====
    0, 24 | ForEach-Object {
        FillRect $g $_ 34 4 12 $BLACK
        FillRect $g ($_ + 4) 34 4 12 $BLACK_LIGHT
        FillRect $g ($_ + 8) 34 4 12 $BLACK
        FillRect $g ($_ + 12) 34 4 12 $BLACK_LIGHT
        FillRect $g ($_ + 16) 34 4 4 $VIOLET
        FillRect $g ($_ + 20) 34 4 4 $BLACK
    }

    # ===== TENDRILS - más brillantes =====
    FillRect $g 56 0 2 8 $VIOLET_BRIGHT
    FillRect $g 58 0 2 8 $VIOLET
    FillRect $g 60 0 2 8 $VIOLET_BRIGHT
    FillRect $g 62 0 2 8 $VIOLET
    FillRect $g 56 10 2 6 $VIOLET_BRIGHT
    FillRect $g 58 10 2 6 $VIOLET
    FillRect $g 60 10 2 6 $VIOLET_BRIGHT
    FillRect $g 62 10 2 6 $VIOLET

    DrawLine $g 0 34 64 34 $VIOLET 1
    DrawLine $g 32 18 32 46 $VIOLET 1

    $g.Dispose()
    return $bmp
}

# Generar texturas
$base = CreateRastreroTexture
$corrupted = CreateRastreroCorruptedTexture

$base.Save("$OUTPUT_DIR\rastrero.png", [System.Drawing.Imaging.ImageFormat]::Png)
$corrupted.Save("$OUTPUT_DIR\rastrero_corrupted.png", [System.Drawing.Imaging.ImageFormat]::Png)

$base.Dispose()
$corrupted.Dispose()

Write-Host "✅ Generadas texturas placeholder en $OUTPUT_DIR"
Write-Host "   - rastrero.png (base dorada)"
Write-Host "   - rastrero_corrupted.png (variante corrupta negra/violeta)"
Write-Host "`n⚠️  Son placeholders programáticos - reemplazar por arte final después"