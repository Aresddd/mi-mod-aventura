/**
 * El Sifón - Definición de Ítems Personalizados (TypeScript Source)
 *
 * Este archivo define todos los ítems personalizados del addon usando
 * la Script API para registro de ítems personalizados.
 */

import { world, ItemStack } from "@minecraft/server";
import { NAMESPACE, PROGRESSION_ITEMS, ItemConfig } from "./main.js";

// ============================================================================
// REGISTRO DE ÍTEMS PERSONALIZADOS
// ============================================================================

/**
 * Registra todos los ítems personalizados del addon
 */
export function registerCustomItems(): void {
  // Esquirla del Guardián Perjuro
  registerItem(PROGRESSION_ITEMS.ESGUIRLA_GUARDIAN, {
    displayName: "§6Esquirla del Guardián",
    description: "§7Fragmento de luz pura extraído del Guardián Perjuro.\n§7Una de las tres llaves para enfrentar al Rey Sifón.",
    maxStackSize: 1,
    rarity: "epic",
    glow: true,
    categories: ["items", "nature"]
  });

  // Esquirla de la Doncella de Cristal
  registerItem(PROGRESSION_ITEMS.ESGUIRLA_DONCELLA, {
    displayName: "§bEsquirla de la Doncella",
    description: "§7Fragmento de luz pura extraído de la Doncella de Cristal.\n§7Una de las tres llaves para enfrentar al Rey Sifón.",
    maxStackSize: 1,
    rarity: "epic",
    glow: true,
    categories: ["items", "nature"]
  });

  // Esquirla del Roble Devorado
  registerItem(PROGRESSION_ITEMS.ESGUIRLA_ROBLE, {
    displayName: "§aEsquirla del Roble",
    description: "§7Fragmento de luz pura extraído del Roble Devorado.\n§7Una de las tres llaves para enfrentar al Rey Sifón.",
    maxStackSize: 1,
    rarity: "epic",
    glow: true,
    categories: ["items", "nature"]
  });

  // Llave del Rey Sifón (combinación de las 3 esquirlas)
  registerItem(PROGRESSION_ITEMS.LLAVE_REY_SIFON, {
    displayName: "§d§lLlave del Corazón del Sifón",
    description: "§7Las tres esquirlas de luz pura se han fusionado.\n§7§dAbre el camino al corazón de la corrupción.§r",
    maxStackSize: 1,
    rarity: "legendary",
    glow: true,
    categories: ["items", "nature"]
  });

  // Esencia Corrupta (drop común de mobs corruptos)
  registerItem(PROGRESSION_ITEMS.ESENCIA_CORRUPTA, {
    displayName: "§5Esencia Corrupta",
    description: "§7Residuo de la corrupción del Sifón.\n§7Útil para crafting de equipos anti-corrupción.",
    maxStackSize: 64,
    rarity: "uncommon",
    glow: false,
    categories: ["items", "nature"]
  });

  // Trofeo de Rastrero
  registerItem(PROGRESSION_ITEMS.TROFEO_RASTRERO, {
    displayName: "§cTrofeo de Rastrero",
    description: "§7Prueba de haber derrotado a un Rastrero.\n§7Puede usarse para crafting decorativo.",
    maxStackSize: 16,
    rarity: "rare",
    glow: false,
    categories: ["items", "nature"]
  });

  // Ítems de equipamiento anti-corrupción (fase posterior)
  registerAntiCorruptionGear();

  console.log(`[${NAMESPACE}] Ítems personalizados registrados`);
}

/**
 * Función auxiliar para registrar un ítem
 */
function registerItem(itemId: string, config: ItemConfig): void {
  // En Bedrock 1.21+, los ítems personalizados se definen principalmente
  // en el resource pack (item_texture.json, items/*.json) y behavior pack
  // (items/*.json). Este registro via Script API es para funcionalidad adicional.

  // Guardar configuración en dynamic properties del mundo para referencia
  const existing = world.getDynamicProperty(`${NAMESPACE}:item_config_${itemId}`);
  if (!existing) {
    world.setDynamicProperty(`${NAMESPACE}:item_config_${itemId}`, JSON.stringify(config));
  }
}

/**
 * Registra equipamiento anti-corrupción
 */
function registerAntiCorruptionGear(): void {
  const gearItems: Record<string, ItemConfig> = {
    [`${NAMESPACE}:espada_luz_pura`]: {
      displayName: "§f§lEspada de Luz Pura",
      description: "§7Forjada con esquirlas de luz pura.\n§7Inflige daño masivo a entidades corruptas.",
      maxStackSize: 1,
      rarity: "legendary",
      glow: true,
      damage: 12,
      attackSpeed: 1.6,
      categories: ["items", "equipment", "sword"]
    },
    [`${NAMESPACE}:armadura_luz_casco`]: {
      displayName: "§f§lCasco de Luz Pura",
      description: "§7Protege contra la corrupción del Sifón.",
      maxStackSize: 1,
      rarity: "epic",
      glow: true,
      armor: 3,
      toughness: 1,
      categories: ["items", "equipment", "helmet"]
    },
    [`${NAMESPACE}:armadura_luz_peto`]: {
      displayName: "§f§lPeto de Luz Pura",
      description: "§7Protege contra la corrupción del Sifón.",
      maxStackSize: 1,
      rarity: "epic",
      glow: true,
      armor: 6,
      toughness: 2,
      categories: ["items", "equipment", "chestplate"]
    },
    [`${NAMESPACE}:armadura_luz_leggings`]: {
      displayName: "§f§lGrebas de Luz Pura",
      description: "§7Protege contra la corrupción del Sifón.",
      maxStackSize: 1,
      rarity: "epic",
      glow: true,
      armor: 5,
      toughness: 2,
      categories: ["items", "equipment", "leggings"]
    },
    [`${NAMESPACE}:armadura_luz_botas`]: {
      displayName: "§f§lBotas de Luz Pura",
      description: "§7Protege contra la corrupción del Sifón.",
      maxStackSize: 1,
      rarity: "epic",
      glow: true,
      armor: 2,
      toughness: 1,
      categories: ["items", "equipment", "boots"]
    }
  };

  Object.entries(gearItems).forEach(([itemId, config]) => {
    registerItem(itemId, config);
  });
}

/**
 * Obtiene la configuración de un ítem
 */
export function getItemConfig(itemId: string): ItemConfig | null {
  const props = world.getDynamicProperty(`${NAMESPACE}:item_config_${itemId}`);
  return props ? JSON.parse(props as string) : null;
}

/**
 * Verifica si un ítem es de progresión
 */
export function isProgressionItem(itemId: string): boolean {
  return Object.values(PROGRESSION_ITEMS).includes(itemId as any);
}

/**
 * Obtiene el nombre de visualización de un ítem
 */
export function getItemDisplayName(itemId: string): string {
  const config = getItemConfig(itemId);
  return config?.displayName || itemId.replace(`${NAMESPACE}:`, "");
}

// Auto-registrar al cargar
system.runTimeout(() => {
  registerCustomItems();
}, 1);