# El Sifón - Resource Pack PBR (Vibrant Visuals)

## ⚠️ IMPORTANTE: Compatibilidad

**Este pack NO es compatible con Actions & Stuff (Oreville Studios) simultáneamente.**

| Configuración | Actions & Stuff | Vibrant Visuals | Pack PBR |
|---------------|-----------------|-----------------|----------|
| Solo Aventura | ✅ Sí | ❌ No | No usar |
| Completo (PBR) | ❌ No | ✅ Sí (requerido) | **Usar este pack** |

### ¿Por qué?
- Actions & Stuff sobreescribe `player.json` y animaciones/geometrías vanilla
- Vibrant Visuals requiere `capabilities: ["pbr"]` en manifest.json
- Mojang confirmó que ambos no funcionan juntos actualmente

---

## 🎨 Estructura del Pack PBR

```
resource_pack_pbr/
├── manifest.json                    # Con "capabilities": ["pbr"]
├── texture_sets/                    # Un directorio por entidad principal
│   ├── rastrero/
│   │   ├── texture_set.json
│   │   ├── rastrero.png (base)
│   │   ├── rastrero_normal.png
│   │   ├── rastrero_height.png
│   │   ├── rastrero_mer.png
│   │   └── rastrero_subsurface.png
│   ├── guardián_perjuro/
│   ├── doncella_cristal/
│   ├── roble_devorado/
│   └── rey_sifon/
├── keyframes/                       # Keyframes de Vibrant Visuals
│   ├── lighting/
│   │   ├── sanctuary_phase1.json
│   │   ├── sanctuary_phase2.json
│   │   ├── crystal_sanctuary.json
│   │   ├── corrupted_forest.json
│   │   └── sifon_heart_phases.json
│   └── atmospherics/
│       ├── corruption_fog.json
│       ├── sanctuary_light.json
│       └── final_battle.json
└── README_PBR.md                    # Este archivo
```

---

## 🎯 texture_set.json - Referencia Completa

### Propiedades Principales

```json
{
  "format_version": "1.21.0",
  "minecraft:texture_set": {
    "description": {
      "identifier": "sifon:nombre_entidad"
    },
    "textures": {
      "base": "textures/entity/nombre",      // Textura base (albedo)
      "normal": "textures/entity/nombre_normal",  // Normal map (RGB = XYZ)
      "height": "textures/entity/nombre_height",  // Height map (R = altura)
      "mer": "textures/entity/nombre_mer",        // MER map (R=Metalness, G=Emissive, B=Roughness)
      "subsurface": "textures/entity/nombre_subsurface"  // Subsurface scattering
    },
    "material_instances": {
      "nombre_material": {
        "render_method": "opaque|alpha_test|translucent",
        "face_culling": true|false,
        "ambient_occlusion": true|false,
        "metalness": 0.0-1.0,
        "roughness": 0.0-1.0,
        "emissive_intensity": 0.0+,
        "subsurface_scattering": 0.0-1.0,
        "subsurface_color": [r, g, b]  // 0.0-1.0
      }
    }
  }
}
```

### Render Methods

| Método | Uso | Ejemplos |
|--------|-----|----------|
| `opaque` | Sólidos sin transparencia | Armadura metálica, piedra, metal |
| `alpha_test` | Transparencia binaria (on/off) | Hojas, hierba, partes corruptas con emissive |
| `translucent` | Transparencia gradual | Cristal, agua, subsurface scattering |

### MER Map (Metalness / Emissive / Roughness)

**Canal R - Metalness (0-1):**
- 0.0 = No metálico (piel, tela, madera, cristal)
- 1.0 = Metálico (armadura, espadas, joyas)
- Valores intermedios para mezclas

**Canal G - Emissive (0-1+):**
- 0.0 = Sin emisión
- 0.5-1.0 = Brillo suave
- 1.0-3.0 = Brillo fuerte (grietas corruptas)
- 3.0+ = Brillo intenso (núcleos de luz, ojos)

**Canal B - Roughness (0-1):**
- 0.0 = Espejo perfecto
- 0.1-0.2 = Metal pulido, cristal
- 0.3-0.5 = Plástico, cerámica, corrupción
- 0.6-0.8 = Madera, piedra, tela
- 1.0 = Completamente mate

### Subsurface Scattering

Para materiales translúcidos que dejan pasar luz:
- `subsurface_scattering`: 0.0-1.0 (intensidad)
- `subsurface_color`: [r, g, b] color de la luz dispersada

**Valores típicos:**
- Cristal/piel: 0.8-1.0, color cálido [1.0, 0.95, 0.8]
- Cristal corrupto: 0.2-0.4, color enfermo [0.1, 0.05, 0.15]
- Hojas: 0.3-0.5, color verde

---

## 🗺️ Mapa de Entidades y Materiales

### Rastrero (Mob Común)
| Material | Render | Metalness | Roughness | Emissive | Subsurface |
|----------|--------|-----------|-----------|----------|------------|
| default | alpha_test | 0.0 | 0.7 | 0.0 | 0.0 |
| corrupted (zarcillos) | alpha_test | 0.0 | 0.3 | **2.0** | 0.0 |

### Guardaín Perjuro (Jefe 1)
| Material | Render | Metalness | Roughness | Emissive | Notas |
|----------|--------|-----------|-----------|----------|-------|
| default | opaque | 0.0 | 0.6 | 0.0 | Cuerpo base |
| armor_golden | opaque | **0.9** | **0.1** | 0.0 | Fase 1 - mitad dorada |
| armor_corrupted | alpha_test | 0.7 | 0.4 | **3.0** | Fase 2 - mitad corrupta |
| weapon_golden | opaque | **0.95** | **0.05** | 0.0 | Arma fase 1 |
| weapon_corrupted | alpha_test | 0.6 | 0.5 | **2.5** | Arma fase 2 |

### Doncella de Cristal (Jefe 2) - ★ SUBSURFACE CRÍTICO
| Material | Render | Metalness | Roughness | Emissive | Subsurface |
|----------|--------|-----------|-----------|----------|------------|
| crystal_intact | translucent | 0.0 | **0.05** | **1.5** | **1.0** |
| crystal_corrupted | translucent | 0.0 | 0.3 | **2.5** | **0.3** |
| shard_projectile | translucent | 0.0 | 0.1 | **3.0** | **0.9** |

### Roble Devorado (Jefe 3)
| Material | Render | Metalness | Roughness | Emissive | Subsurface |
|----------|--------|-----------|-----------|----------|------------|
| bark_healthy | opaque | 0.0 | 0.8 | 0.0 | 0.0 |
| bark_corrupted | alpha_test | 0.0 | 0.5 | **2.0** | 0.0 |
| leaves_golden | alpha_test | 0.0 | 0.4 | **1.0** | 0.0 |
| roots_corrupted | alpha_test | 0.0 | 0.3 | **2.5** | 0.0 |

### Rey Sifón (Jefe Final)
| Material | Render | Metalness | Roughness | Emissive | Subsurface |
|----------|--------|-----------|-----------|----------|------------|
| corruption_mass | opaque | 0.0 | 0.6 | 0.0 | 0.0 |
| trapped_light_veins | translucent | 0.0 | **0.05** | **4.0** | **0.9** |

---

## 🌈 Keyframes de Vibrant Visuals

### Lighting Keyframes (`keyframes/lighting/`)

Controlan: dirección/intensidad/color del sol, luna, luz ambiental, niebla

**Ejemplo: `sanctuary_phase1.json`**
```json
{
  "format_version": "1.21.0",
  "minecraft:lighting_keyframe": {
    "description": { "identifier": "sifon:sanctuary_phase1" },
    "keyframes": [
      { "time": 0.0, "sun_color": [1.0, 0.95, 0.8], "sun_intensity": 1.2, "ambient_color": [0.3, 0.25, 0.2], "fog_color": [0.9, 0.85, 0.7], "fog_density": 0.02 },
      { "time": 0.5, "sun_color": [1.0, 0.9, 0.7], "sun_intensity": 1.0, "ambient_color": [0.25, 0.2, 0.15], "fog_color": [0.8, 0.7, 0.6], "fog_density": 0.05 }
    ]
  }
}
```

### Atmospherics Keyframes (`keyframes/atmospherics/`)

Controlan: niebla volumétrica, partículas atmosféricas, dispersión de luz

**Ejemplo: `corruption_fog.json`**
```json
{
  "format_version": "1.21.0",
  "minecraft:atmospherics_keyframe": {
    "description": { "identifier": "sifon:corruption_fog" },
    "keyframes": [
      { "time": 0.0, "fog_density": 0.1, "fog_color": [0.05, 0.02, 0.08], "volumetric_fog": true, "particle_density": 0.3, "particle_color": [0.4, 0.1, 0.5] },
      { "time": 1.0, "fog_density": 0.3, "fog_color": [0.08, 0.02, 0.12], "volumetric_fog": true, "particle_density": 0.6, "particle_color": [0.5, 0.1, 0.6] }
    ]
  }
}
```

---

## 🛠️ Pipeline de Creación de Texturas PBR

### 1. Textura Base (Albedo)
- Resolución: 128x128 (jefes), 64x64 (mobs comunes), 256x256 (jefe final)
- Sin sombra horneada (no baked lighting)
- Colores puros, la iluminación la hace Vibrant Visuals

### 2. Normal Map
- Generar desde High-poly en Blender/Substance/ZBrush
- O desde Height Map usando xNormal / Substance Designer
- RGB = XYZ (tangent space)

### 3. Height Map
- Blanco = alto, Negro = bajo
- Grietas profundas = negro
- Detalles de superficie = gris medio

### 4. MER Map (Combinar 3 canales)
- **R**: Metalness map
- **G**: Emissive map (¡IMPORTANTE: grietas corruptas = blanco!)
- **B**: Roughness map
- Exportar como PNG de 3 canales

### 5. Subsurface Map (Opcional)
- Solo para materiales translúcidos (cristal, piel, hojas)
- Blanco = más subsurface, Negro = opaco

---

## 🎮 Testing en Juego

### Requisitos
1. Minecraft Bedrock 1.21.60+
2. **Vibrant Visuals ACTIVADO**: Ajustes > Video > Vibrant Visuals = ON
3. Pack PBR instalado Y activado
4. Pack base (behavior_pack + resource_pack) también instalado

### Verificar que funciona
1. Spawnea un Rastrero: `/summon sifon:rastrero`
2. Deberías ver:
   - Zarcillos con brillo violeta (emissive)
   - Relieve en la piel (normal map)
   - Reflexiones metálicas si hay partes metálicas
3. En zona de corrupción: niebla volumétrica, partículas

### Debug
- `/gamerule vibranVisualsDebug true` (si existe en versión)
- Revisar consola por errores de texture_set

---

## 📝 Checklist para Artistas

Por cada entidad principal:

- [ ] Base texture (albedo) - sin baked lighting
- [ ] Normal map - tangent space, RGB=XYZ
- [ ] Height map - detalles de relieve
- [ ] MER map - R=Metalness, G=Emissive, B=Roughness
- [ ] Subsurface map (si aplica) - translucidez
- [ ] texture_set.json configurado correctamente
- [ ] Material instances definidos por parte del modelo
- [ ] Test en juego con Vibrant Visuals ON
- [ ] Verificar emissive en grietas corruptas (canal G del MER)
- [ ] Verificar metalness en armaduras/armas (canal R del MER)
- [ ] Verificar roughness apropiado por material (canal B del MER)

---

## 🔗 Recursos Útiles

- **Material Maker** (gratis, open source): https://github.com/rodzie/material-maker
- **ArmorPaint** (gratis, open source): https://armorpaint.org/
- **Blockbench** (modelado + preview): https://blockbench.net/
- **xNormal** (normal maps gratis): https://xnormal.net/
- **Documentación oficial Bedrock PBR**: https://learn.microsoft.com/en-us/minecraft/creator/documents/pbrtexturing

---

## 📦 Distribución

El pack PBR se distribuye como:
- `el-sifon-resource-pbr-vX.Y.Z.mcpack` (individual)
- `el-sifon-complete-vX.Y.Z.mcaddon` (combinado con behavior + resource base)

Ver `../tools/package.js` para generación automática.