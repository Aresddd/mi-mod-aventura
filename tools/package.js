/**
 * El Sifón - Packaging Script
 * Genera archivos .mcaddon y .mcpack para distribución
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync, cpSync } from "fs";
import { join, relative, basename } from "path";
import { createRequire } from "module";
import { execSync } from "child_process";

const require = createRequire(import.meta.url);
const PROJECT_ROOT = join(__dirname, "..");
const ADDON_ROOT = join(PROJECT_ROOT, "mi-mod-aventura");
const DIST_DIR = join(PROJECT_ROOT, "dist");

// Leer versión de los manifests
function getVersion() {
  const manifestPath = join(ADDON_ROOT, "behavior_pack", "manifest.json");
  const manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));
  return manifest.header.version.join(".");
}

function getVersionArray() {
  const manifestPath = join(ADDON_ROOT, "behavior_pack", "manifest.json");
  const manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));
  return manifest.header.version;
}

function cleanDist() {
  if (existsSync(DIST_DIR)) {
    rmSync(DIST_DIR, { recursive: true });
  }
  mkdirSync(DIST_DIR, { recursive: true });
}

function zipDirectory(sourceDir, outputPath) {
  // Usar zip command line para mejor compatibilidad
  const cmd = `cd "${sourceDir}" && zip -r "${outputPath}" . -x "*.DS_Store" "*/*/\\.*" "__MACOSX/*"`;
  execSync(cmd, { stdio: "inherit" });
}

function copyDir(src, dest) {
  if (!existsSync(src)) return;
  mkdirSync(dest, { recursive: true });
  cpSync(src, dest, { recursive: true });
}

async function main() {
  const version = getVersion();
  const versionArray = getVersionArray();

  console.log(`📦 Empaquetando El Sifón v${version}...\n`);

  cleanDist();

  // 1. Behavior Pack .mcpack
  console.log("1️⃣  Creando Behavior Pack...");
  const behaviorPackDir = join(DIST_DIR, "behavior_pack");
  copyDir(join(ADDON_ROOT, "behavior_pack"), behaviorPackDir);
  zipDirectory(behaviorPackDir, join(DIST_DIR, `el-sifon-behavior-${version}.mcpack`));
  console.log(`   ✅ el-sifon-behavior-${version}.mcpack`);

  // 2. Resource Pack Base .mcpack
  console.log("2️⃣  Creando Resource Pack (Base)...");
  const resourceBaseDir = join(DIST_DIR, "resource_pack");
  copyDir(join(ADDON_ROOT, "resource_pack"), resourceBaseDir);
  zipDirectory(resourceBaseDir, join(DIST_DIR, `el-sifon-resource-base-${version}.mcpack`));
  console.log(`   ✅ el-sifon-resource-base-${version}.mcpack`);

  // 3. Resource Pack PBR .mcpack
  console.log("3️⃣  Creando Resource Pack (PBR)...");
  const resourcePbrDir = join(DIST_DIR, "resource_pack_pbr");
  copyDir(join(ADDON_ROOT, "resource_pack_pbr"), resourcePbrDir);
  zipDirectory(resourcePbrDir, join(DIST_DIR, `el-sifon-resource-pbr-${version}.mcpack`));
  console.log(`   ✅ el-sifon-resource-pbr-${version}.mcpack`);

  // 4. Combined .mcaddon (Complete - all three packs)
  console.log("4️⃣  Creando .mcaddon Completo (Behavior + Resource Base + Resource PBR)...");
  const completeDir = join(DIST_DIR, "complete");
  mkdirSync(completeDir, { recursive: true });
  copyDir(join(ADDON_ROOT, "behavior_pack"), join(completeDir, "behavior_pack"));
  copyDir(join(ADDON_ROOT, "resource_pack"), join(completeDir, "resource_pack"));
  copyDir(join(ADDON_ROOT, "resource_pack_pbr"), join(completeDir, "resource_pack_pbr"));
  zipDirectory(completeDir, join(DIST_DIR, `el-sifon-complete-${version}.mcaddon`));
  console.log(`   ✅ el-sifon-complete-${version}.mcaddon`);

  // 5. Base Only .mcaddon (Behavior + Resource Base - compatible with Actions & Stuff)
  console.log("5️⃣  Creando .mcaddon Solo Base (Compatible con Actions & Stuff)...");
  const baseOnlyDir = join(DIST_DIR, "base_only");
  mkdirSync(baseOnlyDir, { recursive: true });
  copyDir(join(ADDON_ROOT, "behavior_pack"), join(baseOnlyDir, "behavior_pack"));
  copyDir(join(ADDON_ROOT, "resource_pack"), join(baseOnlyDir, "resource_pack"));
  zipDirectory(baseOnlyDir, join(DIST_DIR, `el-sifon-base-only-${version}.mcaddon`));
  console.log(`   ✅ el-sifon-base-only-${version}.mcaddon`);

  // Generar README de distribución
  console.log("\n6️⃣  Generando README de distribución...");
  const distReadme = `# El Sifón v${version} - Archivos de Distribución

## 📦 Contenido

| Archivo | Contenido | Uso Recomendado |
|---------|-----------|-----------------|
| \`el-sifon-complete-${version}.mcaddon\` | Behavior + Resource Base + Resource PBR | Juego solo con Vibrant Visuals |
| \`el-sifon-base-only-${version}.mcaddon\` | Behavior + Resource Base | **Compatible con Actions & Stuff** |
| \`el-sifon-behavior-${version}.mcpack\` | Solo Behavior Pack | Desarrollo/Testing |
| \`el-sifon-resource-base-${version}.mcpack\` | Solo Resource Pack Base | Desarrollo/Testing |
| \`el-sifon-resource-pbr-${version}.mcpack\` | Solo Resource Pack PBR | Desarrollo/Testing |

## ⚙️ Instalación

### Opción A: Pack Completo (Vibrant Visuals/PBR)
1. Instala \`el-sifon-complete-${version}.mcaddon\`
2. Activa **Vibrant Visuals** en *Ajustes > Video*
3. ⚠️ **NO compatible con Actions & Stuff**

### Opción B: Solo Aventura (Compatible con Actions & Stuff)
1. Instala \`el-sifon-base-only-${version}.mcaddon\`
2. ✅ Compatible con **Actions & Stuff** (Oreville Studios)
3. Sin Vibrant Visuals / PBR

### Opción C: Packs Separados
Instala los \`.mcpack\` individualmente desde *Ajustes > Perfil > Paquetes de complementos*.

## 🔑 Requisitos
- Minecraft Bedrock 1.21.60+
- Vibrant Visuals (solo para pack PBR)

---
Generado automáticamente el $(new Date().toISOString())
`;

  writeFileSync(join(DIST_DIR, "README_DISTRIBUTION.md"), distReadme);
  console.log(`   ✅ README_DISTRIBUTION.md`);

  console.log("\n" + "=".repeat(50));
  console.log("✅ EMPAQUETADO COMPLETADO");
  console.log(`📁 Archivos en: ${DIST_DIR}`);
  console.log("=".repeat(50));

  // Listar archivos generados
  const files = require("fs").readdirSync(DIST_DIR);
  for (const f of files) {
    const stats = require("fs").statSync(join(DIST_DIR, f));
    const size = (stats.size / 1024 / 1024).toFixed(2);
    console.log(`   ${f} (${size} MB)`);
  }
}

main().catch(err => {
  console.error("❌ Error:", err);
  process.exit(1);
});