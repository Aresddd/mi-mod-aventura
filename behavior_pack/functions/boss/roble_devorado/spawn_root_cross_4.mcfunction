# Roble Devorado - Spawn 4 raíces en cruz melee (radio 3) - Fase 2
# Uso: /function boss/roble_devorado/spawn_root_cross_4

summon sifon:raiz_corrupta ~ ~ ~ {Rotation:[0f,0f]}
summon sifon:raiz_corrupta ~ ~ ~ {Rotation:[90f,0f]}
summon sifon:raiz_corrupta ~ ~ ~ {Rotation:[180f,0f]}
summon sifon:raiz_corrupta ~ ~ ~ {Rotation:[270f,0f]}

execute as @e[type=sifon:raiz_corrupta,sort=nearest,limit=4] at @s rotated as @s run tp @s ^ ^ ^3

# Partículas de advertencia en zona melee
particle minecraft:dripstone_drip_lava ~ ~1 ~ 3 0.5 3 0.02 10