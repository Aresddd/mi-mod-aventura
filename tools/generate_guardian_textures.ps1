#!/usr/bin/env pwsh
<#
Texturas placeholder del Guardián Perjuro (128x64, UV real de guardian_perjuro.geo.json)
Fase 1 (guardian_perjuro.png): mitad dorada intacta / mitad negra con grietas contenidas
Fase 2 (guardian_perjuro_phase2.png): dorado oxidado, grietas expandidas brillantes por todo el cuerpo
#>

Add-Type -AssemblyName System.Drawing

$OUTPUT_DIR = "C:\Users\Adriel Rodriguez\Desktop\mods\mi-mod-aventura\resource_pack\textures\entity"
New-Item -ItemType Directory -Force -Path $OUTPUT_DIR | Out-Null

# Paleta
$GOLD          = [System.Drawing.Color]::FromArgb(255, 215, 0)
$GOLD_DARK     = [System.Drawing.Color]::FromArgb(200, 160, 0)
$TARNISHED     = [System.Drawing.Color]::FromArgb(122, 92, 0)    # dorado oxidado (fase 2)
$TARNISHED_DK  = [System.Drawing.Color]::FromArgb(90, 66, 0)
$STEEL         = [System.Drawing.Color]::FromArgb(192, 192, 198)
$STEEL_DARK    = [System.Drawing.Color]::FromArgb(120, 128, 138)
$BLACK         = [System.Drawing.Color]::FromArgb(20, 20, 26)
$BLACK_LIGHT   = [System.Drawing.Color]::FromArgb(38, 38, 47)
$VIOLET        = [System.Drawing.Color]::FromArgb(123, 44, 191)
$VIOLET_BRIGHT = [System.Drawing.Color]::FromArgb(187, 134, 252)
$WOOD          = [System.Drawing.Color]::FromArgb(58, 42, 26)
$WOOD_DARK     = [System.Drawing.Color]::FromArgb(38, 27, 17)

function New-Tex {
    $bmp = New-Object System.Drawing.Bitmap(128, 64, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.Clear([System.Drawing.Color]::Transparent)
    return @($bmp, $g)
}

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

# Grietas deterministas dentro de un rectángulo (jagged hacia abajo)
function DrawCracks($g, $x, $y, $w, $h, $color, $count, $brightColor) {
    for ($i = 0; $i -lt $count; $i++) {
        $cx = $x + (($i * 7 + 3) % ($w - 2)) + 1
        $cy = $y + 1
        $len = 3 + (($i * 5) % [Math]::Max(1, $h - 5))
        while ($len -gt 0 -and $cy -lt $y + $h - 1) {
            $step = [Math]::Min(3, $len)
            $dx = (($i + $cy) % 3) - 1
            DrawLine $g $cx $cy ($cx + $dx) ($cy + $step) $color 1
            if (($i % 3) -eq 0) { DrawLine $g $cx $cy $cx ($cy + 1) $brightColor 1 }
            $cx += $dx
            $cy += $step
            $len -= $step
        }
    }
}

# ===== FASE 1: corrupción contenida =====
function Create-GuardianPhase1 {
    $bmp, $g = New-Tex

    # --- HEAD (uv 0,0 | x0-32 y0-16): casco mitad oro / mitad negro ---
    FillRect $g 0 0 16 16 $GOLD        # lado dorado
    FillRect $g 16 0 16 16 $BLACK      # lado corrompido
    FillRect $g 2 2 12 4 $GOLD_DARK    # cresta dorada
    FillRect $g 18 2 12 4 $BLACK_LIGHT
    # Visor: franja oscura + ojos violeta brillante
    FillRect $g 8 10 8 2 ([System.Drawing.Color]::FromArgb(15, 10, 20))
    FillRect $g 9 10 2 2 $VIOLET_BRIGHT
    FillRect $g 13 10 2 2 $VIOLET_BRIGHT
    DrawCracks $g 16 0 16 16 $VIOLET 3 $VIOLET_BRIGHT

    # --- BODY (uv 0,16 | x0-32 y16-34): peto partido ---
    FillRect $g 0 16 16 18 $GOLD       # mitad dorada
    FillRect $g 16 16 16 18 $BLACK     # mitad corrupta
    FillRect $g 3 20 10 8 $GOLD_DARK   # placa pectoral dorada
    FillRect $g 19 20 10 8 $BLACK_LIGHT
    FillRect $g 21 22 6 4 $VIOLET      # núcleo enfermo visible
    FillRect $g 22 23 2 2 $VIOLET_BRIGHT
    DrawCracks $g 16 16 16 18 $VIOLET 4 $VIOLET_BRIGHT

    # --- RIGHT ARM (uv 32,16 | x32-48): dorado intacto ---
    FillRect $g 32 16 16 16 $GOLD
    FillRect $g 36 20 4 12 $GOLD_DARK

    # --- LEFT ARM (uv 48,16 | x48-64): negro agrietado ---
    FillRect $g 48 16 16 16 $BLACK
    FillRect $g 52 20 4 12 $BLACK_LIGHT
    DrawCracks $g 48 16 16 16 $VIOLET 3 $VIOLET_BRIGHT

    # --- LEGS (uv 0,34 y 16,34 | y34-50) ---
    FillRect $g 0 34 16 16 $GOLD       # derecha dorada
    FillRect $g 4 38 4 12 $GOLD_DARK
    FillRect $g 16 34 16 16 $BLACK     # izquierda corrupta
    FillRect $g 20 38 4 12 $BLACK_LIGHT
    DrawCracks $g 16 34 16 16 $VIOLET 3 $VIOLET_BRIGHT

    # --- WAIST (uv 64,0 | x64-98 y0-13): falda partida ---
    FillRect $g 64 0 17 13 $GOLD
    FillRect $g 81 0 17 13 $BLACK
    FillRect $g 66 7 13 2 $GOLD_DARK
    FillRect $g 83 7 13 2 $BLACK_LIGHT
    DrawCracks $g 81 0 17 13 $VIOLET 2 $VIOLET_BRIGHT

    # --- PAULDRONS (uv 100,0 y 100,12) ---
    FillRect $g 100 0 24 12 $GOLD      # derecho dorado
    FillRect $g 104 4 12 6 $GOLD_DARK
    FillRect $g 100 12 24 12 $BLACK    # izquierdo corrupto
    FillRect $g 104 16 12 6 $BLACK_LIGHT
    DrawCracks $g 100 12 24 12 $VIOLET 3 $VIOLET_BRIGHT

    # --- WEAPON: alabarda partida ---
    FillRect $g 64 14 8 28 $WOOD       # asta (uv 64,14)
    FillRect $g 66 16 2 24 $WOOD_DARK
    # Hoja: mitad acero pulido, mitad corroída (uv 72,14 | x72-86 y14-25)
    FillRect $g 72 14 7 11 $STEEL
    FillRect $g 79 14 7 11 $BLACK
    FillRect $g 74 16 3 7 $STEEL_DARK
    FillRect $g 81 16 3 7 $VIOLET
    FillRect $g 82 17 2 5 $VIOLET_BRIGHT
    # Pomo dorado (uv 88,14 | x88-96 y14-19)
    FillRect $g 88 14 8 5 $GOLD
    FillRect $g 90 15 4 3 $GOLD_DARK

    $g.Dispose()
    return $bmp
}

# ===== FASE 2: corrupción expandida =====
function Create-GuardianPhase2 {
    $bmp, $g = New-Tex

    # --- HEAD: casco oxidado agrietado por completo ---
    FillRect $g 0 0 32 16 $TARNISHED
    FillRect $g 2 2 12 4 $TARNISHED_DK
    FillRect $g 18 2 12 4 $BLACK
    FillRect $g 8 10 8 2 ([System.Drawing.Color]::FromArgb(15, 10, 20))
    FillRect $g 8 10 3 2 $VIOLET_BRIGHT   # ojos agrandados
    FillRect $g 13 10 3 2 $VIOLET_BRIGHT
    DrawCracks $g 0 0 32 16 $VIOLET 8 $VIOLET_BRIGHT

    # --- BODY: peto entero consumido, núcleo desbordado ---
    FillRect $g 0 16 32 18 $TARNISHED
    FillRect $g 3 20 10 8 $TARNISHED_DK
    FillRect $g 19 20 10 8 $BLACK
    FillRect $g 19 20 10 8 $BLACK
    FillRect $g 20 21 8 6 $VIOLET
    FillRect $g 21 22 6 4 $VIOLET_BRIGHT   # núcleo brillando fuerte
    DrawCracks $g 0 16 32 18 $VIOLET 10 $VIOLET_BRIGHT

    # --- ARMS: ambos corrompidos con vetas ---
    FillRect $g 32 16 16 16 $TARNISHED
    FillRect $g 36 20 4 12 $TARNISHED_DK
    FillRect $g 48 16 16 16 $BLACK
    FillRect $g 52 20 4 12 $BLACK_LIGHT
    DrawCracks $g 32 16 16 16 $VIOLET 5 $VIOLET_BRIGHT
    DrawCracks $g 48 16 16 16 $VIOLET 5 $VIOLET_BRIGHT

    # --- LEGS ---
    FillRect $g 0 34 16 16 $TARNISHED
    FillRect $g 4 38 4 12 $TARNISHED_DK
    FillRect $g 16 34 16 16 $BLACK
    FillRect $g 20 38 4 12 $BLACK_LIGHT
    DrawCracks $g 0 34 32 16 $VIOLET 7 $VIOLET_BRIGHT

    # --- WAIST ---
    FillRect $g 64 0 34 13 $TARNISHED
    FillRect $g 83 0 15 13 $BLACK
    FillRect $g 66 7 30 2 $TARNISHED_DK
    DrawCracks $g 64 0 34 13 $VIOLET 5 $VIOLET_BRIGHT

    # --- PAULDRONS ---
    FillRect $g 100 0 24 24 $TARNISHED
    FillRect $g 104 4 12 6 $TARNISHED_DK
    FillRect $g 104 16 12 6 $BLACK
    DrawCracks $g 100 0 24 24 $VIOLET 7 $VIOLET_BRIGHT

    # --- WEAPON: hoja completamente corroída con filo emisivo ---
    FillRect $g 64 14 8 28 $WOOD_DARK
    FillRect $g 66 16 2 24 ([System.Drawing.Color]::FromArgb(60, 20, 80))
    FillRect $g 72 14 14 11 $BLACK
    FillRect $g 74 16 10 7 $VIOLET
    DrawLine $g 73 15 85 23 $VIOLET_BRIGHT 2   # filo emisivo
    DrawLine $g 73 23 85 15 $VIOLET 1
    FillRect $g 88 14 8 5 $TARNISHED
    FillRect $g 90 15 4 3 $TARNISHED_DK

    $g.Dispose()
    return $bmp
}

$p1 = Create-GuardianPhase1
$p2 = Create-GuardianPhase2
$p1.Save("$OUTPUT_DIR\guardian_perjuro.png", [System.Drawing.Imaging.ImageFormat]::Png)
$p2.Save("$OUTPUT_DIR\guardian_perjuro_phase2.png", [System.Drawing.Imaging.ImageFormat]::Png)
$p1.Dispose(); $p2.Dispose()

Write-Host "OK texturas generadas en $OUTPUT_DIR"
Write-Host "  - guardian_perjuro.png (fase 1: corrupcion contenida)"
Write-Host "  - guardian_perjuro_phase2.png (fase 2: corrupcion expandida)"