# Texturas Requeridas - El Sifón

## Estructura de Archivos

```
resource_pack/textures/
├── entity/
│   ├── rastrero.png              # Textura base del Rastrero (64x64)
│   ├── rastrero_corrupted.png    # Variante corrupta (64x64)
│   ├── guardián_perjuro.png      # Jefe 1 - fase 1 (128x128)
│   ├── guardián_perjuro_corrupted.png  # Jefe 1 - fase 2 (128x128)
│   ├── doncella_cristal.png      # Jefe 2 - base (128x128)
│   ├── doncella_cristal_emissive.png # Jefe 2 - parte translúcida (128x128)
│   ├── roble_devorado.png        # Jefe 3 - base (128x128)
│   ├── roble_devorado_corrupted.png  # Jefe 3 - raíces (128x128)
│   ├── rey_sifon.png             # Jefe final (256x256)
│   ├── centinela_oxidado.png     # Minijefe 1 (64x64)
│   ├── espina_reina.png          # Minijefe 2 (64x64)
│   ├── fauno_quebrado.png        # Minijefe 3 (64x64)
│   ├── motas_luz.png             # Mob pasivo (32x32)
│   └── aldeanos_sifonados.png    # Mob común (64x64)
├── blocks/
│   └── (bloques del addon)
└── items/
    ├── rastrero_trophy.png
    ├── corrupted_essence.png
    ├── esquirla_guardián.png
    ├── esquirla_doncella.png
    ├── esquirla_roble.png
    ├── llave_rey_sifon.png
    ├── espada_luz_pura.png
    ├── armadura_luz_casco.png
    ├── armadura_luz_peto.png
    ├── armadura_luz_leggings.png
    └── armadura_luz_botas.png
```

## Guía Visual - Esquema de Corrupción

Todas las criaturas siguen la misma lengua visual:

### Estado ÍNTEGRO (Luz/Dorado)
- Colores: Dorado brillante (#FFD700), Blanco cálido (#FFF8DC), Amarillo claro (#FFFFE0)
- Brillo: Emissive fuerte en áreas clave
- Sensación: Pura, sagrada, luminosa

### Estado INFECTADO (Mitad/Mitad)
- División visual clara (vertical o diagonal)
- Lado intacto: Colores dorados
- Lado corrupto: Ver sección siguiente
- Grietas en la frontera entre ambos lados
- Partículas de transición en la frontera

### Estado CONSUMIDO (Corrupción Total)
- Colores base: Negro profundo (#0A0A0F), Gris muy oscuro (#1A1A2E)
- Grietas: Violeta enfermo (#7B2CBF) o Verde enfermo (#00FF88)
- Emissive: Fuerte en grietas (violeta/verde)
- Partículas: Constantes saliendo de grietas
- Sensación: Enfermiza, antinatural, opresiva

## Especificaciones por Entidad

### Rastrero (64x64)
- Modelo: Humanoide delgado con cuernos y zarcillos de corrupción
- Base: Gris oscuro con detalles violetas
- Corrupto: Más grietas, emissive violeta en zarcillos y cuernos
- Zarcillos (corruption_tendril_1/2): Usan material "corrupted" con emissive

### Guardaín Perjuro (128x128) - FASE POSTERIOR
- Armadura mitad dorada/pulida, mitad negra/agrietada
- Arma (espada/alabarda) partida visualmente
- Fase 2: Más grietas, emissive más fuerte, armadura más rota

### Doncella de Cristal (128x128) - FASE POSTERIOR
- Cuerpo semitransparente de cristal roto
- Mitad: Cristal claro con luz interior dorada (subsurface scattering)
- Mitad: Cristal negro hueco (se ve través), emissive violeta en bordes
- Requiere textura _emissive separada para parte translúcida

### Roble Devorado (128x128) - FASE POSTERIOR
- Corteza: Mitad sana (marrón dorado, hojas doradas), mitad negra retorcida
- Raíces: Textura separada para zarcillos que emergen del suelo
- Emissive en grietas de la corteza negra

### Rey Sifón (256x256) - FASE FINAL
- Masa antropomorfa oscura
- Vetas de luz atrapada (dorado/blanco) en interior visible por grietas
- Múltiples mapas de emissive para diferentes fases de arena

## Pack PBR (resource_pack_pbr/texture_sets/)

Para cada textura de entidad principal, crear:

```
texture_sets/
├── rastrero/
│   ├── normal.png          # Normal map (RGB = XYZ)
│   ├── height.png          # Height map (R = altura)
│   ├── mer.png             # Metalness (R), Emissive (G), Roughness (B)
│   └── subsurface.png      # Opcional: Subsurface scattering
├── guardián_perjuro/
│   ├── normal.png
│   ├── height.png
│   ├── mer.png
│   └── subsurface.png
├── doncella_cristal/
│   ├── normal.png
│   ├── height.png
│   ├── mer.png
│   └── subsurface.png      # IMPORTANTE para translucidez
├── roble_devorado/
│   ├── normal.png
│   ├── height.png
│   └── mer.png
└── rey_sifon/
    ├── normal.png
    ├── height.png
    ├── mer.png
    └── subsurface.png
```

### MER Map (Metalness/Emissive/Roughness)
- **R (Metalness)**: 0 = no metálico (piel, tela), 1 = metálico (armadura, espada)
- **G (Emissive)**: 0 = sin brillo, 1 = brillo máximo. **Usar fuerte en grietas corruptas**
- **B (Roughness)**: 0 = espejo, 1 = mate. Piel ~0.7, armadura pulida ~0.1, corrupción ~0.3

### Normal Map
- Generar desde height map o sculpting en Blender/Substance
- Detalles: Grietas, placas de armadura, textura de corteza, facetas de cristal

### Height Map
- Blanco = alto, Negro = bajo
- Grietas profundas = negro
- Placas elevadas = blanco

## Partículas

```
resource_pack/particles/
├── corruption_hurt.particle.json      # Partícula al recibir daño
├── corruption_ambient.particle.json   # Partícula ambiental en zonas corruptas
├── light_shard.particle.json          # Partícula al conseguir esquirla
└── phase_transition.particle.json     # Partícula en cambio de fase de jefe
```

## Sonidos

```
resource_pack/sounds/
├── mob/
│   ├── rastrero_idle.ogg
│   ├── rastrero_hurt.ogg
│   ├── rastrero_death.ogg
│   ├── rastrero_attack.ogg
│   └── (resto de mobs)
├── boss/
│   ├── guardián_phase1.ogg
│   ├── guardián_phase2.ogg
│   ├── guardián_transition.ogg
│   └── (resto de jefes)
├── ambient/
│   ├── corruption_zone.ogg
│   └── sanctuary.ogg
└── ui/
    ├── quest_complete.ogg
    └── shard_obtained.ogg
```

## Herramientas Recomendadas

- **Texturas base**: Aseprite, Photoshop, GIMP, Krita
- **PBR Maps**: Substance Painter, Material Maker (gratis), ArmorPaint (gratis), Blender
- **Normal maps desde height**: xNormal, Substance Designer, o filtro "Normal Map" en Photoshop/GIMP
- **Testing en juego**: Blockbench para preview de modelos + texturas

## Notas Importantes

1. **NO usar player.json ni animaciones vanilla** - Todo con namespace `sifon:`
2. **Compatible con Actions & Stuff** - Resource pack base SIN capabilities PBR
3. **Pack PBR separado** - Solo se usa con Vibrant Visuals activado
3. **Consistencia visual** - Mismo patrón de corrupción en todas las criaturas
4. **Emissive en grietas** - Es la clave visual del tema del mod
5. **Resoluciones**: Mobs comunes 64x64, Jefes 128x128, Jefe final 256x256