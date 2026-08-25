# El Sifón - Invocación del Guardián Perjuro (Jefe 1)
# Uso: /function boss/guardian_perjuro
# Debe invocarse en la arena del santuario en ruinas.

summon sifon:guardian_perjuro ~ ~1 ~
playsound mob.ravager.roar @a[r=48]
particle minecraft:huge_explosion_emitter ~ ~1.2 ~
tellraw @a {"rawtext":[{"text":"§b§l[El Sifón]§r §e¡El Guardián Perjuro ha despertado! La corrupción del santuario se agita...§r"}]}