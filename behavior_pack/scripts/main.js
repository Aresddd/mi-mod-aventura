/**
 * El Sifón - Main Script Entry Point
 *
 * Este archivo es el punto de entrada principal para el Behavior Pack.
 * Maneja la inicialización del sistema de misiones, eventos de entidades,
 * y la progresión del jugador a través del contenido del addon.
 *
 * Namespace: sifon
 * Versión: 1.0.0
 * API mínima: 1.21.60
 */

import { world, system, Entity, Player, Block, Vector3, Dimension } from "@minecraft/server";
import { ActionFormData, MessageFormData, ModalFormData } from "@minecraft/server-ui";

// ============================================================================
// CONSTANTES Y CONFIGURACIÓN
// ============================================================================

const NAMESPACE = "sifon";
const VERSION = [1, 0, 0];

// IDs de entidades registradas
const ENTITY_IDS = {
  RASTRERO: `${NAMESPACE}:rastrero`,
  // Jefes principales (fase posterior)
  GUARDIAN_PERJURO: `${NAMESPACE}:guardian_perjuro`,
  DONCELLA_CRISTAL: `${NAMESPACE}:doncella_cristal`,
  ROBLE_DEVOREADO: `${NAMESPACE}:roble_devorado`,
  REY_SIFON: `${NAMESPACE}:rey_sifon`,
  // Minijefes
  CENTINELA_OXIDADO: `${NAMESPACE}:centinela_oxidado`,
  ESPINA_REINA: `${NAMESPACE}:espina_reina`,
  FAUNO_QUEBRADO: `${NAMESPACE}:fauno_quebrado`,
  // Mobs comunes
  MOTA_LUZ: `${NAMESPACE}:mota_luz`,
  ALDEANO_SIFONADO: `${NAMESPACE}:aldeano_sifonado`
};

// Sistema de misiones - Fases de progresión
const QUEST_PHASES = {
  INICIO: "inicio",
  GUARDIAN_DERROTADO: "guardian_derrotado",
  DONCELLA_DERROTADA: "doncella_derrotada",
  ROBLE_DERROTADO: "roble_derrotado",
  REY_SIFON_DESBLOQUEADO: "rey_sifon_desbloqueado",
  REY_SIFON_DERROTADO: "rey_sifon_derrotado"
};

// Ítems de progresión (identificadores normalizados sin tildes para compatibilidad Bedrock)
const PROGRESSION_ITEMS = {
  ESGUIRLA_GUARDIAN: `${NAMESPACE}:esquirla_guardian`,
  ESGUIRLA_DONCELLA: `${NAMESPACE}:esquirla_doncella`,
  ESGUIRLA_ROBLE: `${NAMESPACE}:esquirla_roble`,
  LLAVE_REY_SIFON: `${NAMESPACE}:llave_rey_sifon`,
  ESENCIA_CORRUPTA: `${NAMESPACE}:corrupted_essence`,
  TROFEO_RASTRERO: `${NAMESPACE}:rastrero_trophy`,
  // Minijefe drops
  PLACA_OXIDADA: `${NAMESPACE}:placa_oxidada`,
  CAPARAZON_AGRIETADO: `${NAMESPACE}:caparazon_agrietado`,
  ASTILLA_CORNAMENTA: `${NAMESPACE}:astilla_cornamenta`,
  // Mob común drops
  POLVO_ESTRELLA: `${NAMESPACE}:polvo_estrella`,
  ESENCIA_SIFONADA: `${NAMESPACE}:esencia_sifonada`
};

// Dynamic property keys para tracking de progreso por jugador
const PLAYER_PROPS = {
  QUEST_PHASE: `${NAMESPACE}:quest_phase`,
  GUARDIAN_KILLED: `${NAMESPACE}:guardian_killed`,
  DONCELLA_KILLED: `${NAMESPACE}:doncella_killed`,
  ROBLE_KILLED: `${NAMESPACE}:roble_killed`,
  REY_SIFON_KILLED: `${NAMESPACE}:rey_sifon_killed`,
  ZONAS_LIBERADAS: `${NAMESPACE}:zonas_liberadas`
};

// ============================================================================
// SISTEMA DE MISIONES Y PROGRESIÓN
// ============================================================================

/**
 * Obtiene la fase actual de la misión del jugador
 */
function getPlayerQuestPhase(player) {
  return player.getDynamicProperty(PLAYER_PROPS.QUEST_PHASE) || QUEST_PHASES.INICIO;
}

/**
 * Establece la fase de la misión del jugador
 */
function setPlayerQuestPhase(player, phase) {
  player.setDynamicProperty(PLAYER_PROPS.QUEST_PHASE, phase);
  // Notificar al cliente si es necesario
  sendQuestUpdate(player, phase);
}

/**
 * Verifica si el jugador tiene un ítem de progresión
 */
function hasProgressionItem(player, itemId) {
  const inventory = player.getComponent("minecraft:inventory");
  if (!inventory) return false;

  const container = inventory.container;
  for (let i = 0; i < container.size; i++) {
    const item = container.getItem(i);
    if (item && item.typeId === itemId) {
      return true;
    }
  }
  return false;
}

/**
 * Otorga un ítem de progresión al jugador
 */
function giveProgressionItem(player, itemId, count = 1) {
  const inventory = player.getComponent("minecraft:inventory");
  if (!inventory) return false;

  const container = inventory.container;
  // Crear ItemStack correctamente: new ItemStack(typeId, count)
  const ItemStack = require("@minecraft/server").ItemStack;
  const itemStack = new ItemStack(itemId, count);
  return container.addItem(itemStack);
}

/**
 * Envía actualización de misión al jugador (para UI)
 */
function sendQuestUpdate(player, phase) {
  // Enviar evento al cliente para actualizar HUD/UI
  player.runCommand(`scriptevent ${NAMESPACE}:quest_update ${phase}`);
}

/**
 * Maneja la muerte de un jefe principal
 */
function handleBossDefeat(player, bossType) {
  const currentPhase = getPlayerQuestPhase(player);
  let newPhase = currentPhase;
  let itemToGive = null;

  switch (bossType) {
    case ENTITY_IDS.GUARDIAN_PERJURO:
      if (currentPhase === QUEST_PHASES.INICIO || currentPhase === QUEST_PHASES.GUARDIAN_DERROTADO) {
        newPhase = QUEST_PHASES.GUARDIAN_DERROTADO;
        itemToGive = PROGRESSION_ITEMS.ESGUIRLA_GUARDIAN;
        player.setDynamicProperty(PLAYER_PROPS.GUARDIAN_KILLED, true);
      }
      break;

    case ENTITY_IDS.DONCELLA_CRISTAL:
      if (currentPhase === QUEST_PHASES.GUARDIAN_DERROTADO) {
        newPhase = QUEST_PHASES.DONCELLA_DERROTADA;
        itemToGive = PROGRESSION_ITEMS.ESGUIRLA_DONCELLA;
        player.setDynamicProperty(PLAYER_PROPS.DONCELLA_KILLED, true);
      }
      break;

    case ENTITY_IDS.ROBLE_DEVOREADO:
      if (currentPhase === QUEST_PHASES.DONCELLA_DERROTADA) {
        newPhase = QUEST_PHASES.ROBLE_DERROTADO;
        itemToGive = PROGRESSION_ITEMS.ESGUIRLA_ROBLE;
        player.setDynamicProperty(PLAYER_PROPS.ROBLE_KILLED, true);
      }
      break;

    case ENTITY_IDS.REY_SIFON:
      if (currentPhase === QUEST_PHASES.REY_SIFON_DESBLOQUEADO) {
        newPhase = QUEST_PHASES.REY_SIFON_DERROTADO;
        player.setDynamicProperty(PLAYER_PROPS.REY_SIFON_KILLED, true);
      }
      break;
  }

  if (newPhase !== currentPhase) {
    setPlayerQuestPhase(player, newPhase);

    if (itemToGive) {
      giveProgressionItem(player, itemToGive);
      player.sendMessage({
        rawtext: [
          { text: "§b§l[El Sifón] §rHas obtenido: " },
          { text: `§6${itemToGive.replace(`${NAMESPACE}:`, "")}§r` }
        ]
      });
    }

    // Verificar si se desbloquea el Rey Sifón
    if (newPhase === QUEST_PHASES.ROBLE_DERROTADO) {
      system.runTimeout(() => {
        setPlayerQuestPhase(player, QUEST_PHASES.REY_SIFON_DESBLOQUEADO);
        giveProgressionItem(player, PROGRESSION_ITEMS.LLAVE_REY_SIFON);
        player.sendMessage({
          rawtext: [
            { text: "§b§l[El Sifón] §r§e¡Los tres fragmentos de luz pura se han unido!§r\n" },
            { text: "§d§lLa llave al corazón del Sifón ha aparecido en tu inventario.§r" }
          ]
        });
      }, 20); // 1 tick delay
    }
  }
}

/**
 * Inicializa el progreso del jugador si es nuevo
 */
function initializePlayerProgress(player) {
  if (!player.getDynamicProperty(PLAYER_PROPS.QUEST_PHASE)) {
    setPlayerQuestPhase(player, QUEST_PHASES.INICIO);
    player.sendMessage({
      rawtext: [
        { text: "§b§l[El Sifón] §r§7Bienvenido. La corrupción se extiende bajo tierra...§r\n" },
        { text: "§7Derrota al §cGuardián Perjuro§7 en el santuario para comenzar tu camino.§r" }
      ]
    });
  }
}

// ============================================================================
// EVENTOS DEL SISTEMA
// ============================================================================

/**
 * Evento: Jugador se une al mundo
 */
world.afterEvents.playerJoin.subscribe((event) => {
  const player = event.player;
  initializePlayerProgress(player);

  // Registrar scoreboard para tracking visual
  const scoreboard = world.scoreboard;
  if (!scoreboard.getObjective(`${NAMESPACE}_progress`)) {
    scoreboard.addObjective(`${NAMESPACE}_progress`, "Progreso El Sifón");
  }
  scoreboard.setScore(player.name, `${NAMESPACE}_progress`, getQuestPhaseValue(getPlayerQuestPhase(player)));
});

/**
 * Convierte fase de misión a valor numérico para scoreboard
 */
function getQuestPhaseValue(phase) {
  const values = {
    [QUEST_PHASES.INICIO]: 0,
    [QUEST_PHASES.GUARDIAN_DERROTADO]: 1,
    [QUEST_PHASES.DONCELLA_DERROTADA]: 2,
    [QUEST_PHASES.ROBLE_DERROTADO]: 3,
    [QUEST_PHASES.REY_SIFON_DESBLOQUEADO]: 4,
    [QUEST_PHASES.REY_SIFON_DERROTADO]: 5
  };
  return values[phase] || 0;
}

/**
 * Evento: Entidad muere (para detectar muertes de jefes)
 */
world.afterEvents.entityDie.subscribe((event) => {
  const entity = event.deadEntity;
  const damageSource = event.damageSource;
  const killer = damageSource?.damagingEntity;

  // Solo procesar si fue matado por un jugador
  if (killer && killer.typeId === "minecraft:player") {
    const entityType = entity.typeId;

    // Verificar si es uno de nuestros jefes
    if (Object.values(ENTITY_IDS).includes(entityType)) {
      handleBossDefeat(killer, entityType);
    }

    // Dropear esencia corrupta de mobs corruptos
    if (entity.getComponent("minecraft:type_family")?.hasTag("sifon_corrupted")) {
      if (Math.random() < 0.3) { // 30% chance
        const loc = entity.location;
        world.getDimension(loc.dimension.id).spawnItem(
          PROGRESSION_ITEMS.ESENCIA_CORRUPTA,
          loc,
          1
        );
      }
    }
  }
});

/**
 * Evento: Jugador rompe bloque (para detectar entrada a zonas)
 */
world.afterEvents.playerBreakBlock.subscribe((event) => {
  const player = event.player;
  const block = event.block;

  // Detectar bloques especiales del addon (se definirán en fases posteriores)
  if (block.typeId.startsWith(`${NAMESPACE}:`)) {
    // Lógica para bloques especiales
  }
});

/**
 * Evento: Tick del sistema (para tareas periódicas)
 */
system.runInterval(() => {
  // Verificar zonas de corrupción, spawn de jefes, etc.
  // Se implementará en fases posteriores
}, 20 * 60); // Cada minuto

// ============================================================================
// COMANDOS PERSONALIZADOS (Script Events)
// ============================================================================

/**
 * Maneja script events personalizados
 */
world.beforeEvents.chatSend.subscribe((event) => {
  const message = event.message;
  const player = event.sender;

  if (message.startsWith("!sifon")) {
    event.cancel = true;
    handleSifonCommand(player, message.split(" "));
  }
});

/**
 * Procesa comandos del addon
 */
function handleSifonCommand(player, args) {
  const subcommand = args[1]?.toLowerCase();

  switch (subcommand) {
    case "progreso":
    case "progress":
      showProgressUI(player);
      break;

    case "reset":
      if (player.hasTag("admin") || player.isOp()) {
        resetPlayerProgress(player);
        player.sendMessage("§aProgreso reiniciado.");
      } else {
        player.sendMessage("§cNo tienes permisos.");
      }
      break;

    case "spawn":
      if (player.hasTag("admin") || player.isOp()) {
        const entityType = args[2];
        const validTypes = Object.keys(ENTITY_IDS);
        if (entityType && validTypes.some(key => key.toLowerCase() === entityType.toLowerCase())) {
          // Find the exact key to get the proper entity ID
          const exactKey = validTypes.find(key => key.toLowerCase() === entityType.toLowerCase());
          spawnEntityNearPlayer(player, ENTITY_IDS[exactKey]);
          player.sendMessage(`§aEntidad ${entityType} invocada.`);
        } else {
          player.sendMessage("§cEntidad no válida. Opciones: " + validTypes.map(k => k.toLowerCase()).join(", "));
        }
      }
      break;

    case "ayuda":
    case "help":
    default:
      player.sendMessage({
        rawtext: [
          { text: "§b§l=== El Sifón - Comandos ===\n" },
          { text: "§e!sifon progreso§r - Ver tu progreso actual\n" },
          { text: "§e!sifon ayuda§r - Mostrar esta ayuda\n" },
          { text: "§7(Comandos admin: reset, spawn <entidad>)" }
        ]
      });
  }
}

/**
 * Muestra UI de progreso al jugador
 */
function showProgressUI(player) {
  const phase = getPlayerQuestPhase(player);
  const phaseNames = {
    [QUEST_PHASES.INICIO]: "§7Inicio - Busca el Santuario",
    [QUEST_PHASES.GUARDIAN_DERROTADO]: "§aGuardián Perjuro §r§7derrotado - Busca el Santuario en Ruinas",
    [QUEST_PHASES.DONCELLA_DERROTADA]: "§aDoncella de Cristal §r§7derrotada - Busca el Bosque Corrupto",
    [QUEST_PHASES.ROBLE_DERROTADO]: "§aRoble Devorado §r§7derrotado - §d¡El Rey Sifón está accesible!",
    [QUEST_PHASES.REY_SIFON_DESBLOQUEADO]: "§d§lREY SIFÓN DESBLOQUEADO§r - Usa la llave para acceder",
    [QUEST_PHASES.REY_SIFON_DERROTADO]: "§6§l¡VICTORIA!§r El Sifón ha sido detenido... por ahora."
  };

  const form = new ActionFormData()
    .title("§b§lEl Sifón - Progreso")
    .body(`§rFase actual: ${phaseNames[phase] || "Desconocida"}\n\n` +
          `§7Objetivo: Limpia las zonas corruptas derrotando a los jefes.\n` +
          `Cada jefe dropea una esquirla de luz pura.\n` +
          `Las tres esquirlas abren el camino al corazón del Sifón.`)
    .button("§aCerrar")
    .show(player);
}

/**
 * Reinicia el progreso del jugador (admin)
 */
function resetPlayerProgress(player) {
  Object.values(PLAYER_PROPS).forEach(prop => {
    player.setDynamicProperty(prop, undefined);
  });
  setPlayerQuestPhase(player, QUEST_PHASES.INICIO);

  // Quitar items de progresión
  const inventory = player.getComponent("minecraft:inventory")?.container;
  if (inventory) {
    for (let i = 0; i < inventory.size; i++) {
      const item = inventory.getItem(i);
      if (item && item.typeId.startsWith(NAMESPACE)) {
        inventory.setItem(i, undefined);
      }
    }
  }
}

/**
 * Invoca una entidad cerca del jugador (admin)
 */
function spawnEntityNearPlayer(player, entityType) {
  const loc = player.location;
  const dim = player.dimension;
  const spawnLoc = {
    x: loc.x + (Math.random() - 0.5) * 4,
    y: loc.y + 1,
    z: loc.z + (Math.random() - 0.5) * 4
  };
  dim.spawnEntity(entityType, spawnLoc);
}

// ============================================================================
// INICIALIZACIÓN
// ============================================================================

// Registrar objetivo de scoreboard al inicio
system.runTimeout(() => {
  const scoreboard = world.scoreboard;
  if (!scoreboard.getObjective(`${NAMESPACE}_progress`)) {
    scoreboard.addObjective(`${NAMESPACE}_progress`, "Progreso El Sifón");
  }
}, 1);

console.log(`[${NAMESPACE}] Addon cargado v${VERSION.join(".")} - Script API inicializado`);

// Exportar funciones para uso en otros módulos
export {
  NAMESPACE,
  VERSION,
  ENTITY_IDS,
  QUEST_PHASES,
  PROGRESSION_ITEMS,
  PLAYER_PROPS,
  getPlayerQuestPhase,
  setPlayerQuestPhase,
  hasProgressionItem,
  giveProgressionItem,
  handleBossDefeat,
  initializePlayerProgress
};