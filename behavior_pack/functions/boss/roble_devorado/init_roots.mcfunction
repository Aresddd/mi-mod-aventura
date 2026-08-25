# Roble Devorado - Inicialización de raíces en la arena
# Uso: /function boss/roble_devorado/init_roots
# Se ejecuta al spawnear el jefe (entity_spawned event)

# Limpiar raíces antiguas en radio 30
kill @e[type=sifon:raiz_corrupta,r=30]

# Anunciar la llegada
tellraw @a {"rawtext":[{"text":"§b§l[El Sifón]§r §a¡El Roble Devorado despierta! Las raíces del bosque se retuercen bajo sus pies...§r"}]}

# Partículas de entrada dramática
particle minecraft:ash_emitter ~ ~2 ~ 2 2 2 0.05 30
particle minecraft:soul_emitter ~ ~1.5 ~ 1.5 1.5 1.5 0.03 20
playsound mob.warden.roar @a[r=60] ~ ~ ~ 1.0 0.8