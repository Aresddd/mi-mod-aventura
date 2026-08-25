# El Sifón - Invocación del Roble Devorado (Jefe 3)
# Uso: /function boss/roble_devorado
# Debe invocarse en la arena del santuario en ruinas (tercera sección).

summon sifon:roble_devorado ~ ~1 ~
playsound mob.warden.roar @a[r=48]
particle minecraft:ash_emitter ~ ~1.2 ~
particle minecraft:soul_emitter ~ ~0.5 ~
tellraw @a {"rawtext":[{"text":"§b§l[El Sifón]§r §a¡El Roble Devorado despierta! Las raíces del bosque se retuercen bajo sus pies...§r"}]}