/**
 * El Sifón - Validation Script
 * Valida todos los archivos JSON contra schemas de Bedrock
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { join, extname, relative } from "path";
import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true, strict: false });
const PROJECT_ROOT = join(__dirname, "..");
const ADDON_ROOT = join(PROJECT_ROOT, "mi-mod-aventura");

// Schemas de Bedrock (simplificados para validación básica)
const SCHEMAS = {
  manifest: {
    type: "object",
    required: ["format_version", "header", "modules"],
    properties: {
      format_version: { type: "integer", enum: [1, 2] },
      header: {
        type: "object",
        required: ["name", "uuid", "version", "min_engine_version"],
        properties: {
          name: { type: "string" },
          description: { type: "string" },
          uuid: { type: "string", format: "uuid" },
          version: { type: "array", items: { type: "integer" }, minItems: 3, maxItems: 3 },
          min_engine_version: { type: "array", items: { type: "integer" }, minItems: 3, maxItems: 3 }
        }
      },
      modules: {
        type: "array",
        items: {
          type: "object",
          required: ["type", "uuid", "version"],
          properties: {
            type: { type: "string", enum: ["data", "resources", "script"] },
            uuid: { type: "string", format: "uuid" },
            version: { type: "array", items: { type: "integer" }, minItems: 3, maxItems: 3 },
            entry: { type: "string" }
          }
        }
      },
      dependencies: { type: "array" },
      capabilities: { type: "array", items: { type: "string" } }
    }
  },
  entity: {
    type: "object",
    required: ["format_version", "minecraft:entity"],
    properties: {
      format_version: { type: "string" },
      "minecraft:entity": {
        type: "object",
        required: ["description", "components"],
        properties: {
          description: {
            type: "object",
            required: ["identifier"],
            properties: {
              identifier: { type: "string", pattern: "^[a-z_]+:[a-z_]+$" },
              is_spawnable: { type: "boolean" },
              is_summonable: { type: "boolean" },
              animations: { type: "object" },
              animation_controllers: { type: "array" },
              geometry: { type: "object" },
              materials: { type: "object" },
              textures: { type: "object" },
              spawn_egg: { type: "object" }
            }
          },
          components: { type: "object" },
          component_groups: { type: "object" },
          events: { type: "object" }
        }
      }
    }
  },
  geometry: {
    type: "object",
    required: ["format_version", "minecraft:geometry"],
    properties: {
      format_version: { type: "string" },
      "minecraft:geometry": {
        type: "array",
        items: {
          type: "object",
          required: ["description", "bones"],
          properties: {
            description: {
              type: "object",
              required: ["identifier", "texture_width", "texture_height"],
              properties: {
                identifier: { type: "string", pattern: "^geometry\\.[a-z_]+" },
                texture_width: { type: "integer" },
                texture_height: { type: "integer" },
                visible_bounds_width: { type: "number" },
                visible_bounds_height: { type: "number" },
                visible_bounds_offset: { type: "array", items: { type: "number" }, minItems: 3, maxItems: 3 }
              }
            },
            bones: { type: "array" }
          }
        }
      }
    }
  },
  animation: {
    type: "object",
    required: ["format_version", "animations"],
    properties: {
      format_version: { type: "string" },
      animations: { type: "object" }
    }
  },
  animation_controller: {
    type: "object",
    required: ["format_version", "animation_controllers"],
    properties: {
      format_version: { type: "string" },
      animation_controllers: { type: "object" }
    }
  },
  spawn_rules: {
    type: "object",
    required: ["format_version", "minecraft:spawn_rules"],
    properties: {
      format_version: { type: "string" },
      "minecraft:spawn_rules": {
        type: "object",
        required: ["description", "conditions"],
        properties: {
          description: {
            type: "object",
            required: ["identifier", "population_control"],
            properties: {
              identifier: { type: "string", pattern: "^[a-z_]+:[a-z_]+$" },
              population_control: { type: "string" }
            }
          },
          conditions: { type: "array" }
        }
      }
    }
  },
  loot_table: {
    type: "object",
    required: ["format_version", "pools"],
    properties: {
      format_version: { type: "string" },
      pools: {
        type: "array",
        items: {
          type: "object",
          required: ["rolls", "entries"],
          properties: {
            rolls: { type: "number" },
            entries: { type: "array" },
            conditions: { type: "array" }
          }
        }
      }
    }
  },
  recipe: {
    type: "object",
    required: ["format_version"],
    properties: {
      format_version: { type: "string" }
    }
  },
  item: {
    type: "object",
    required: ["format_version", "minecraft:item"],
    properties: {
      format_version: { type: "string" },
      "minecraft:item": {
        type: "object",
        required: ["description", "components"],
        properties: {
          description: {
            type: "object",
            required: ["identifier"],
            properties: {
              identifier: { type: "string", pattern: "^[a-z_]+:[a-z_]+$" },
              category: { type: "string" }
            }
          },
          components: { type: "object" }
        }
      }
    }
  }
};

function validateFile(filePath, schemaName) {
  try {
    const content = readFileSync(filePath, "utf-8");
    const data = JSON.parse(content);
    const schema = SCHEMAS[schemaName];
    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (!valid) {
      console.error(`❌ ${relative(PROJECT_ROOT, filePath)}: Validation failed`);
      validate.errors?.forEach(err => {
        console.error(`   ${err.instancePath} ${err.message}`);
      });
      return false;
    }
    console.log(`✅ ${relative(PROJECT_ROOT, filePath)}`);
    return true;
  } catch (error) {
    console.error(`❌ ${relative(PROJECT_ROOT, filePath)}: ${error.message}`);
    return false;
  }
}

function findFiles(dir, pattern) {
  const results = [];
  function walk(currentDir) {
    const entries = readdirSync(currentDir);
    for (const entry of entries) {
      const fullPath = join(currentDir, entry);
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (pattern.test(entry)) {
        results.push(fullPath);
      }
    }
  }
  walk(dir);
  return results;
}

console.log("🔍 Validando El Sifón Addon...\n");

let allValid = true;

// Validar manifests
const manifests = [
  { path: join(ADDON_ROOT, "behavior_pack", "manifest.json"), schema: "manifest" },
  { path: join(ADDON_ROOT, "resource_pack", "manifest.json"), schema: "manifest" },
  { path: join(ADDON_ROOT, "resource_pack_pbr", "manifest.json"), schema: "manifest" }
];

console.log("📋 Validando Manifests...");
for (const m of manifests) {
  if (!validateFile(m.path, m.schema)) allValid = false;
}

// Validar entidades
console.log("\n👾 Validando Entidades...");
const entities = findFiles(join(ADDON_ROOT, "behavior_pack", "entities"), /\.json$/);
for (const e of entities) {
  if (!validateFile(e, "entity")) allValid = false;
}

// Validar spawn rules
console.log("\n🌱 Validando Spawn Rules...");
const spawnRules = findFiles(join(ADDON_ROOT, "behavior_pack", "spawn_rules"), /\.json$/);
for (const s of spawnRules) {
  if (!validateFile(s, "spawn_rules")) allValid = false;
}

// Validar loot tables
console.log("\n🎁 Validando Loot Tables...");
const lootTables = findFiles(join(ADDON_ROOT, "behavior_pack", "loot_tables"), /\.json$/);
for (const l of lootTables) {
  if (!validateFile(l, "loot_table")) allValid = false;
}

// Validar recipes
console.log("\n🔨 Validando Recipes...");
const recipes = findFiles(join(ADDON_ROOT, "behavior_pack", "recipes"), /\.json$/);
for (const r of recipes) {
  if (!validateFile(r, "recipe")) allValid = false;
}

// Validar items
console.log("\n📦 Validando Items...");
const items = findFiles(join(ADDON_ROOT, "behavior_pack", "items"), /\.json$/);
for (const i of items) {
  if (!validateFile(i, "item")) allValid = false;
}

// Validar geometrías
console.log("\n📐 Validando Geometrías...");
const geometries = findFiles(join(ADDON_ROOT, "resource_pack", "models"), /\.geo\.json$/);
for (const g of geometries) {
  if (!validateFile(g, "geometry")) allValid = false;
}

// Validar animaciones
console.log("\n🎬 Validando Animaciones...");
const animations = findFiles(join(ADDON_ROOT, "resource_pack", "animations"), /\.animation\.json$/);
for (const a of animations) {
  if (!validateFile(a, "animation")) allValid = false;
}

// Validar animation controllers
console.log("\n🎮 Validando Animation Controllers...");
const controllers = findFiles(join(ADDON_ROOT, "resource_pack", "animation_controllers"), /\.animation_controllers\.json$/);
for (const c of controllers) {
  if (!validateFile(c, "animation_controller")) allValid = false;
}

// Validar namespace consistency
console.log("\n🔍 Verificando consistencia de namespace...");
const namespace = "sifon";
const entityFiles = findFiles(join(ADDON_ROOT, "behavior_pack", "entities"), /\.json$/);
for (const ef of entityFiles) {
  const content = readFileSync(ef, "utf-8");
  const matches = content.match(new RegExp(`${namespace}:[a-z_]+`, "g"));
  if (!matches || matches.length === 0) {
    console.warn(`⚠️  ${relative(PROJECT_ROOT, ef)}: No se encontraron identificadores ${namespace}:`);
  }
}

// Validar UUIDs únicos
console.log("\n🔑 Verificando UUIDs únicos...");
const allManifests = [
  join(ADDON_ROOT, "behavior_pack", "manifest.json"),
  join(ADDON_ROOT, "resource_pack", "manifest.json"),
  join(ADDON_ROOT, "resource_pack_pbr", "manifest.json")
];
const uuids = new Set();
let uuidConflict = false;
for (const mf of allManifests) {
  const data = JSON.parse(readFileSync(mf, "utf-8"));
  const headerUuid = data.header.uuid;
  if (uuids.has(headerUuid)) {
    console.error(`❌ UUID duplicado (header): ${headerUuid} en ${relative(PROJECT_ROOT, mf)}`);
    uuidConflict = true;
  }
  uuids.add(headerUuid);
  for (const mod of data.modules) {
    if (uuids.has(mod.uuid)) {
      console.error(`❌ UUID duplicado (module): ${mod.uuid} en ${relative(PROJECT_ROOT, mf)}`);
      uuidConflict = true;
    }
    uuids.add(mod.uuid);
  }
}
if (!uuidConflict) console.log("✅ Todos los UUIDs son únicos");

// Verificar versiones consistentes
console.log("\n📌 Verificando consistencia de versiones...");
const versions = {};
for (const mf of allManifests) {
  const data = JSON.parse(readFileSync(mf, "utf-8"));
  versions[mf] = data.header.version.join(".");
}
const uniqueVersions = new Set(Object.values(versions));
if (uniqueVersions.size > 1) {
  console.error("❌ Versiones inconsistentes:", versions);
  allValid = false;
} else {
  console.log(`✅ Versión consistente: ${Object.values(versions)[0]}`);
}

console.log("\n" + "=".repeat(50));
if (allValid) {
  console.log("✅ TODAS LAS VALIDACIONES PASARON");
  process.exit(0);
} else {
  console.log("❌ ALGUNAS VALIDACIONES FALLARON");
  process.exit(1);
}