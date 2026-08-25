# El Sifón - Invocación de la Doncella de Cristal (Jefe 2)
# Uso: /function boss/doncella_cristal
# Debe invocarse en la arena del santuario en ruinas (segunda sección).

summon sifon:doncella_cristal ~ ~1 ~
playsound mob.warden.soul_escape @a[r=48]
particle minecraft:end_gateway_spawn_emitter ~ ~1.2 ~
tellraw @a {"rawtext":[{"text":"§b§l[El Sifón]§r §e¡La Doncella de Cristal despierta! Sus esquirlas cantan en la oscuridad...§r"}]}