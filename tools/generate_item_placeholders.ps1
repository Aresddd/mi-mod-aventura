#!/usr/bin/env pwsh
<#
Genera texturas placeholder para items de El Sifón (16x16)
Paleta por item según su temática
#>

Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.Drawing.Common

$OUTPUT_DIR = "C:\Users\Adriel Rodriguez\Desktop\mods\mi-mod-aventura\resource_pack\textures\items"
New-Item -ItemType Directory -Force -Path $OUTPUT_DIR | Out-Null

function FillRect($g, $x, $y, $w, $h, $color) {
    $brush = New-Object System.Drawing.SolidBrush($color)
    $g.FillRectangle($brush, $x, $y, $w, $h)
    $brush.Dispose()
}

function CreateItemTexture($name, $palette) {
    $bmp = New-Object System.Drawing.Bitmap(16, 16, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.Clear([System.Drawing.Color]::Transparent)

    # Base shape (diamond-ish for items)
    FillRect $g 4 1 8 2 $palette.base
    FillRect $g 3 3 10 2 $palette.base
    FillRect $g 2 5 12 2 $palette.base
    FillRect $g 2 7 12 2 $palette.dark
    FillRect $g 3 9 10 2 $palette.dark
    FillRect $g 4 11 8 2 $palette.base
    FillRect $g 5 13 6 2 $palette.dark

    # Accent/pattern
    if ($palette.accent) {
        FillRect $g 5 5 2 2 $palette.accent
        FillRect $g 9 5 2 2 $palette.accent
        FillRect $g 7 7 2 2 $palette.accent
    }

    # Highlight
    FillRect $g 3 3 1 1 $palette.light
    FillRect $g 12 3 1 1 $palette.light

    $g.Dispose()
    $bmp.Save("$OUTPUT_DIR\$name.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "  ✅ $name.png"
}

# Paletas por item
$palettes = @{
    "rastrero_trophy" = @{
        base = [System.Drawing.Color]::FromArgb(180, 30, 30)    # Rojo oscuro
        dark = [System.Drawing.Color]::FromArgb(120, 10, 10)    # Rojo muy oscuro
        light = [System.Drawing.Color]::FromArgb(220, 80, 80)   # Rojo claro
        accent = [System.Drawing.Color]::FromArgb(123, 44, 191) # Violeta
    }
    "corrupted_essence" = @{
        base = [System.Drawing.Color]::FromArgb(123, 44, 191)   # Violeta #7B2CBF
        dark = [System.Drawing.Color]::FromArgb(45, 0, 71)      # Violeta muy oscuro #2D0047
        light = [System.Drawing.Color]::FromArgb(187, 134, 252) # Violeta brillante #BB86FC
        accent = [System.Drawing.Color]::FromArgb(255, 215, 0)  # Dorado
    }
    "esquirla_guardian" = @{
        base = [System.Drawing.Color]::FromArgb(255, 215, 0)    # Dorado brillante
        dark = [System.Drawing.Color]::FromArgb(200, 160, 0)    # Dorado oscuro
        light = [System.Drawing.Color]::FromArgb(255, 240, 150) # Amarillo muy claro
        accent = [System.Drawing.Color]::FromArgb(255, 140, 0)  # Naranja
    }
    "esquirla_doncella" = @{
        base = [System.Drawing.Color]::FromArgb(0, 191, 255)    # Azul cielo profundo
        dark = [System.Drawing.Color]::FromArgb(0, 100, 180)    # Azul oscuro
        light = [System.Drawing.Color]::FromArgb(150, 220, 255) # Azul muy claro
        accent = [System.Drawing.Color]::FromArgb(255, 255, 255) # Blanco
    }
    "esquirla_roble" = @{
        base = [System.Drawing.Color]::FromArgb(34, 139, 34)    # Verde bosque
        dark = [System.Drawing.Color]::FromArgb(20, 80, 20)     # Verde muy oscuro
        light = [System.Drawing.Color]::FromArgb(100, 200, 100) # Verde claro
        accent = [System.Drawing.Color]::FromArgb(255, 215, 0)  # Dorado
    }
    "llave_rey_sifon" = @{
        base = [System.Drawing.Color]::FromArgb(138, 43, 226)   # Azul violeta
        dark = [System.Drawing.Color]::FromArgb(75, 0, 130)     # Índigo
        light = [System.Drawing.Color]::FromArgb(186, 85, 211)  # Orquídea
        accent = [System.Drawing.Color]::FromArgb(255, 215, 0)  # Dorado
    }
    "espada_luz_pura" = @{
        base = [System.Drawing.Color]::FromArgb(255, 255, 255)  # Blanco puro
        dark = [System.Drawing.Color]::FromArgb(200, 200, 220)  # Blanco azulado
        light = [System.Drawing.Color]::FromArgb(255, 255, 255) # Blanco
        accent = [System.Drawing.Color]::FromArgb(255, 215, 0)  # Dorado
    }
    "armadura_luz_casco" = @{
        base = [System.Drawing.Color]::FromArgb(255, 255, 255)
        dark = [System.Drawing.Color]::FromArgb(200, 200, 220)
        light = [System.Drawing.Color]::FromArgb(255, 255, 255)
        accent = [System.Drawing.Color]::FromArgb(255, 215, 0)
    }
    "armadura_luz_peto" = @{
        base = [System.Drawing.Color]::FromArgb(255, 255, 255)
        dark = [System.Drawing.Color]::FromArgb(200, 200, 220)
        light = [System.Drawing.Color]::FromArgb(255, 255, 255)
        accent = [System.Drawing.Color]::FromArgb(255, 215, 0)
    }
    "armadura_luz_leggings" = @{
        base = [System.Drawing.Color]::FromArgb(255, 255, 255)
        dark = [System.Drawing.Color]::FromArgb(200, 200, 220)
        light = [System.Drawing.Color]::FromArgb(255, 255, 255)
        accent = [System.Drawing.Color]::FromArgb(255, 215, 0)
    }
    "armadura_luz_botas" = @{
        base = [System.Drawing.Color]::FromArgb(255, 255, 255)
        dark = [System.Drawing.Color]::FromArgb(200, 200, 220)
        light = [System.Drawing.Color]::FromArgb(255, 255, 255)
        accent = [System.Drawing.Color]::FromArgb(255, 215, 0)
    }
}

Write-Host "Generando texturas de items (16x16)..."
$palettes.GetEnumerator() | ForEach-Object {
    CreateItemTexture $_.Key $_.Value
}
Write-Host "`n✅ Todas las texturas de items generadas en $OUTPUT_DIR"
Write-Host "⚠️  Son placeholders programáticos - reemplazar por arte final después"