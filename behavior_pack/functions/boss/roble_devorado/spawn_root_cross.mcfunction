# Roble Devorado - Spawn cruz de raíces (ataque melee fase 2)
# Uso: /function boss/roble_devorado/spawn_root_cross <count> <radius>
# $1 = número de raíces (típicamente 4)
# $2 = radio en bloques (típicamente 3, zona de melee)

# Spawnear 4 raíces en cruz cardinal a distancia melee
summon sifon:raiz_corrupta ~ ~ ~ {Rotation:[0f,0f]}
summon sifon:raiz_corrupta ~ ~ ~ {Rotation:[90f,0f]}
summon sifon:raiz_corrupta ~ ~ ~ {Rotation:[180f,0f]}
summon sifon:raiz_corrupta ~ ~ ~ {Rotation:[270f,0f]}

# Posicionar a $radius bloques (corto alcance para melee)
execute as @e[type=sifon:raiz_corrupta,sort=nearest,limit=$1] at @s rotated as @s run tp @s ^ ^ ^$2

# Partículas de advertencia en zona melee
execute as @e[type=sifon:roble_devorado,tag=phase2] at @s run particle minecraft:dripstone_drip_lava ~ ~1 ~ 3 0.5 3 0.02 10