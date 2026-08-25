# Roble Devorado - Invocación de raíces FASE 2
# Uso: /function boss/roble_devorado/summon_roots_phase2
# Se ejecuta periódicamente en fase 2 (cada ~6s via timer, más agresivo)
# Patrón: 2 oleadas - anillo exterior + explosión central
# El evento sifon:summon_roots_phase2 es invocado desde el timer del entity

# Primera oleada: 8 raíces en anillo a 8 bloques (doble radio que fase 1)
function boss/roble_devorado/spawn_root_ring_8

# Segunda oleada: 4 raíces en cruz a 3 bloques (zona de melee)
function boss/roble_devorado/spawn_root_cross_4

# Sonido y partículas intensificados
playsound block.roots.place @a[r=40] ~ ~ ~ 0.9 0.9
playsound mob.warden.heartbeat @a[r=40] ~ ~ ~ 0.7 1.0
particle minecraft:soul_emitter ~ ~1 ~ 5 2 5 0.08 25
particle minecraft:ash_emitter ~ ~1.5 ~ 4 1.5 4 0.05 20