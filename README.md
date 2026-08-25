# El Sifón - Minecraft Bedrock Addon

> Un modo aventura completo con jefes, minijefes, mobs propios, misiones, estructuras y capa visual PBR opcional (Vibrant Visuals).

## 📋 Descripción

**El Sifón** es una fuerza de corrupción que avanza desde bajo tierra, enfermando todo lo que toca. Cada criatura existe en una escala visual: **intacta** (luminosa, dorada) → **infectada** (mixta, partida a la mitad) → **consumida** (oscura, agrietada, con luz enferma violeta/verde).

### Contenido Principal

| Categoría | Entidades |
|-----------|-----------|
| **Jefes Principales** | Guardaín Perjuro, Doncella de Cristal, Roble Devorado, Rey Sifón |
| **Minijefes** | Centinela Oxidado, Espina Reina, Fauno Quebrado |
| **Mobs Comunes** | Rastreros, Motas de Luz, Aldeanos Sifonados |

### Sistema de Progresión

```
Inicio → Derrotar Guardaín Perjuro (Esquirla 1)
      → Derrotar Doncella de Cristal (Esquirla 2)
      → Derrotar Roble Devorado (Esquirla 3)
      → Combinar 3 Esquirlas = Llave del Rey Sifón
      → Enfrentar al Rey Sifón (Jefe Final)
```

---

## 📦 Instalación

### Opción A: Pack Completo (con Vibrant Visuals/PBR)
1. Descarga `el-sifon-complete-vX.Y.Z.mcaddon`
2. Ábrelo en Minecraft Bedrock
3. Activa en **Ajustes > Perfil > Paquetes de complementos**
4. **IMPORTANTE**: Activa **Vibrant Visuals** en *Ajustes > Video*
5. ⚠️ **NO compatible con Actions & Stuff**

### Opción B: Solo Aventura (Compatible con Actions & Stuff)
1. Descarga `el-sifon-base-only-vX.Y.Z.mcaddon`
2. Ábrelo en Minecraft Bedrock
3. Activa en **Ajustes > Perfil > Paquetes de complementos**
4. ✅ **Compatible con Actions & Stuff** (Oreville Studios)
5. Sin Vibrant Visuals / PBR

### Opción C: Packs Separados (Usuarios avanzados)
- `el-sifon-behavior-vX.Y.Z.mcpack` - Solo scripts/comportamiento
- `el-sifon-resource-base-vX.Y.Z.mcpack` - Solo recursos base
- `el-sifon-resource-pbr-vX.Y.Z.mcpack` - Solo capa PBR

> **Nota de compatibilidad**: Actions & Stuff sobreescribe `player.json` y animaciones vanilla. Nuestro resource pack base **NO toca nada de vanilla** - todo nuestro contenido usa namespace `sifon:` propio. El pack PBR sí requiere Vibrant Visuals activado y **no puede coexistir** con Actions & Stuff.

---

## 🎮 Comandos en Juego

| Comando | Descripción |
|---------|-------------|
| `!sifon progreso` | Ver tu progreso actual de misiones |
| `!sifon ayuda` | Mostrar lista de comandos |
| `!sifon reset` | Reiniciar progreso (solo admin/op) |
| `!sifon spawn <entidad>` | Invocar entidad (solo admin/op) |

**Entidades disponibles para spawn:**
- `rastrero`
- `guardian_perjuro` (fase posterior)
- `doncella_cristal` (fase posterior)
- `roble_devorado` (fase posterior)
- `rey_sifon` (fase posterior)
- `centinela_oxidado` (fase posterior)
- `espina_reina` (fase posterior)
- `fauno_quebrado` (fase posterior)
- `motas_luz` (fase posterior)
- `aldeanos_sifonados` (fase posterior)

---

## 🛠️ Desarrollo

### Estructura del Proyecto

```
mi-mod-aventura/
├── behavior_pack/           # Comportamiento, scripts, loot, spawn rules
│   ├── manifest.json
│   ├── entities/
│   ├── scripts/             # JavaScript compilado (desde scripts-src/)
│   ├── functions/
│   ├── loot_tables/
│   ├── recipes/
│   ├── spawn_rules/
│   └── items/
├── resource_pack/           # Recursos BASE (compatible con Actions & Stuff)
│   ├── manifest.json        # SIN capabilities pbr
│   ├── entity/
│   ├── animations/
│   ├── animation_controllers/
│   ├── models/
│   ├── textures/
│   └── sounds/
├── resource_pack_pbr/       # Capa PBR OPCIONAL (requiere Vibrant Visuals)
│   ├── manifest.json        # CON "capabilities": ["pbr"]
│   └── texture_sets/
├── scripts-src/             # TypeScript fuente
├── tools/                   # Herramientas de build/validación
├── .github/workflows/       # CI/CD
└── README.md
```

### Requisitos Técnicos

- **Minecraft Bedrock**: 1.21.60+
- **Script API**: `@minecraft/server` 1.17.0+, `@minecraft/server-ui` 1.3.0+
- **Vibrant Visuals**: Opcional, solo para pack PBR (Ajustes > Video)
- **Namespace**: `sifon:` para todo contenido propio

### Build Local

```bash
cd tools
npm install
npm run build    # Compila TypeScript -> behavior_pack/scripts/
npm run validate # Valida JSON contra schemas
npm run package  # Genera .mcaddon
```

### Scripts TypeScript

El código fuente está en `scripts-src/` y se compila a `behavior_pack/scripts/`:

```typescript
// scripts-src/main.ts - Punto de entrada principal
// scripts-src/items.ts - Definición de ítems
// scripts-src/bosses/*.ts - Lógica de jefes
// scripts-src/quests/*.ts - Sistema de misiones
// scripts-src/utils/*.ts - Utilidades compartidas
```

---

## 🧪 Testing

### Cargar en Juego (Desarrollo)

1. Copia las carpetas `behavior_pack`, `resource_pack`, `resource_pack_pbr` a:
   - **Windows**: `%LOCALAPPDATA%\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\`
     - `behavior_packs\` y `resource_packs\`
   - **Android**: `/storage/emulated/0/games/com.mojang/`
     - `behavior_packs\` y `resource_packs\`

2. Activa los packs en un mundo nuevo (modo creativo recomendado para testing)

3. Usa `!sifon spawn rastrero` para probar la entidad base

### Validar JSON Localmente

```bash
# Instalar validador
npm install -g ajv-cli

# Validar entity
ajv validate -s bedrock-schemas/entity.json -d behavior_pack/entities/rastrero.json
```

---

## 🗺️ Roadmap

| Fase | Estado | Contenido |
|------|--------|-----------|
| 1 | ✅ Completada | Esqueleto, manifests, CI, entidad prueba (Rastrero) |
| 2 | ✅ Completada | Pipeline CI (validate.yml, release.yml) |
| 3 | ✅ Completada | Rastrero completo (modelo, animaciones, comportamiento) |
| 4 | ⏳ Pendiente | Guardaín Perjuro (jefe 1, 2 fases) |
| 5 | ⏳ Pendiente | Sistema misiones mínimo |
| 6 | ⏳ Pendiente | Minijefes y mobs comunes restantes |
| 7 | ⏳ Pendiente | Doncella de Cristal (jefe 2) |
| 8 | ⏳ Pendiente | Roble Devorado (jefe 3) |
| 9 | ⏳ Pendiente | Capa PBR completa |
| 10 | ⏳ Pendiente | Rey Sifón (jefe final) |
| 11 | ⏳ Pendiente | Pulido, sonidos, balance, optimización |

---

## 📄 Licencia

Este proyecto está bajo licencia MIT. Ver [LICENSE](LICENSE) para detalles.

## 🙏 Créditos

- **Desarrollo**: El Sifón Team
- **Inspiración visual**: Vibrant Visuals (Mojang), sistema de corrupción temático
- **Compatibilidad**: Diseñado para coexistir con Actions & Stuff (Oreville Studios)

---

## 🐛 Reportar Issues

¿Encontraste un bug? [Abrir issue](../../issues/new?template=bug_report.yml) con:
- Versión de Minecraft
- Versión del addon
- Packs instalados (completo/base-only/PBR)
- Pasos para reproducir
- Capturas de pantalla/logs si aplica

---

**¡Disfruta la aventura!** 🌑✨