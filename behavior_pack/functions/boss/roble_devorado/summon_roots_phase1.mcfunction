# Roble Devorado - Invocación de raíces FASE 1
# Uso: /function boss/roble_devorado/summon_roots_phase1
# Se ejecuta periódicamente en fase 1 (cada ~10s via timer)
# El evento sifon:summon_roots_phase1 es invocado desde el timer del entity

# Patrón: 4 raíces en cruz cardinal a 5 bloques del jefe
function boss/roble_devorado/spawn_root_ring_4

# Sonido y partículas
playsound block.roots.place @a[r=30] ~ ~ ~ 0.7 1.1
particle minecraft:block soul_soil ~ ~0.5 ~ 3 1 3 0.05 15