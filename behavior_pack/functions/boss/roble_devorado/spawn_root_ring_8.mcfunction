# Roble Devorado - Spawn 8 raíces en anillo completo (radio 8) - Fase 2
# Uso: /function boss/roble_devorado/spawn_root_ring_8

summon sifon:raiz_corrupta ~ ~ ~ {Rotation:[0f,0f]}
summon sifon:raiz_corrupta ~ ~ ~ {Rotation:[45f,0f]}
summon sifon:raiz_corrupta ~ ~ ~ {Rotation:[90f,0f]}
summon sifon:raiz_corrupta ~ ~ ~ {Rotation:[135f,0f]}
summon sifon:raiz_corrupta ~ ~ ~ {Rotation:[180f,0f]}
summon sifon:raiz_corrupta ~ ~ ~ {Rotation:[225f,0f]}
summon sifon:raiz_corrupta ~ ~ ~ {Rotation:[270f,0f]}
summon sifon:raiz_corrupta ~ ~ ~ {Rotation:[315f,0f]}

execute as @e[type=sifon:raiz_corrupta,sort=nearest,limit=8] at @s rotated as @s run tp @s ^ ^ ^8