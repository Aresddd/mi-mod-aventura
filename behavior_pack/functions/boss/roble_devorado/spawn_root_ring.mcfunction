# Roble Devorado - Spawn anillo de raíces
# Uso: /function boss/roble_devorado/spawn_root_ring <count> <radius>
# $1 = número de raíces (ej: 4, 8)
# $2 = radio en bloques (ej: 5, 8)
# Nota: mcfunction no soporta parámetros directos, se usa scoreboard o se crean variantes

# Variante para 4 raíces (cruz cardinal) - radio 5 (fase 1)
execute if score @s roble_ring_count matches 4 run summon sifon:raiz_corrupta ~ ~ ~ {Rotation:[0f,0f]}
execute if score @s roble_ring_count matches 4 run summon sifon:raiz_corrupta ~ ~ ~ {Rotation:[90f,0f]}
execute if score @s roble_ring_count matches 4 run summon sifon:raiz_corrupta ~ ~ ~ {Rotation:[180f,0f]}
execute if score @s roble_ring_count matches 4 run summon sifon:raiz_corrupta ~ ~ ~ {Rotation:[270f,0f]}
execute as @e[type=sifon:raiz_corrupta,sort=nearest,limit=4] at @s rotated as @s run tp @s ^ ^ ^5

# Variante para 8 raíces (anillo completo) - radio 8 (fase 2)
execute if score @s roble_ring_count matches 8 run summon sifon:raiz_corrupta ~ ~ ~ {Rotation:[0f,0f]}
execute if score @s roble_ring_count matches 8 run summon sifon:raiz_corrupta ~ ~ ~ {Rotation:[45f,0f]}
execute if score @s roble_ring_count matches 8 run summon sifon:raiz_corrupta ~ ~ ~ {Rotation:[90f,0f]}
execute if score @s roble_ring_count matches 8 run summon sifon:raiz_corrupta ~ ~ ~ {Rotation:[135f,0f]}
execute if score @s roble_ring_count matches 8 run summon sifon:raiz_corrupta ~ ~ ~ {Rotation:[180f,0f]}
execute if score @s roble_ring_count matches 8 run summon sifon:raiz_corrupta ~ ~ ~ {Rotation:[225f,0f]}
execute if score @s roble_ring_count matches 8 run summon sifon:raiz_corrupta ~ ~ ~ {Rotation:[270f,0f]}
execute if score @s roble_ring_count matches 8 run summon sifon:raiz_corrupta ~ ~ ~ {Rotation:[315f,0f]}
execute as @e[type=sifon:raiz_corrupta,sort=nearest,limit=8] at @s rotated as @s run tp @s ^ ^ ^8