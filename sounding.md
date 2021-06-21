---
layout: posts
title: Curva de estado
---
Las curvas de estado dan miedo... lo sé. Todos hemos pasado por ello, así que… ¡ánimo!

Lo primero es decir una palabra de por qué merece la pena aprender a interpretar este tipo de gráficas. Cada vez es más habitual encontrar visualizaciones de datos meteorológicos más y más bonitas pero que, sin embargo, no proporcionan la visión global requerida para evaluar un día de vuelo.

Las curvas de estado ofrecen información de las propiedades atmosféricas a todas las alturas así como del viento. De un vistazo informan sobre el techo del día, la posibilidad de tormentas, la calidad de la térmica, la presencia de diferentes tipos de nubes, la temperatura del aire en altura, intensidad y dirección del viento...  
¡Mucha información en muy poco espacio!

Lo primero es que no hay que dejarse imtimidar por toda la información que estas gráficas presentan, por muy abrumadoras que parezcan al principio.
<img class='post__img' src='/assets/images/explanation.png'/>

Lo primero que vamos a hacer es intentar separar cada sección de la gráfica

<img class='post__img' src='/assets/images/sections.png'/>

- <span style='background:rgb(254,205,203);border: 1px red solid;'>
Curva de estado
</span>.
La sección roja, la mayor del gráfico, muestra la temperatura del aire y la temperatura de rocío a distintas alturas (ya llegaremos)
- <span style='background:rgb(205,227,255);border: 1px rgb(0,112,255) solid;'>
Wind Barbs
</span>.
Las banderolas muestran la velocidad y direccióndel viento a distintas alturas.
- <span style='background:rgb(199,240,198);border: 1px rgb(9,214,0) solid;'>
Nubosidad
</span>.
Esta sección no es para nada standard, la hemos desarrollado nosotros, por lo que no la encontraréis en otros gráficos. Esta gráfica muestra en 2 columnas nubes convectivas (cúmulos) y no convectivas (frentes, orográficas...).
- <span style='background:rgb(248,205,255);border: 1px rgb(222,0,255) solid;'>
Intensidad del viento
</span>.
Este gráfico muestra la intensidad del viento a todas las alturas.
- <span style='background:rgb(180,180,180);border: 1px rgb(0,0,0) solid;'>
Hodógrafa
</span>.
Técnicamente la gráfica que mostramos no es una [hodógrafa](https://es.wikipedia.org/wiki/Hodografa)… pero nos vale como primera aproximación. Cada punto de la gráfica muestra la intensidad y dirección de donde viene el viento. Puesto que tenemos la gráfica de la intensidad, y por falta de espacio he quitado los labels de las intensidades.


# Curva de estado
Sólo esta sección ya contiene muchísima información. Vamos a empezar por entender los ejes que utiliza. Pero primero una puntualización.

Esta parte de la gráfica en realidad contiene dos gráficas yuxtapuestas verticalmente. La zona de abajo es un "zoom" a las capas bajas (`0-6000m`) mientras que la parte de arriba muestra el resto de alturas (`6000-15000m`). Uno podría pensar que lo que pase a `10000m` de altura no nos importa para volar… pero a estas altitudes podemos ver cirradas que pueden conllevar una menor actividad térmica de lo esperado.

## Ejes
<img class='post__img' src='/assets/images/axis.png'/>

Los ejes a) muestran unas líneas horizontales que marcan distintas altitudes y unas líneas inclinadas (unos 30°C respecto a la vertical) que marcan la temperatura. Cada una de las líneas inclinadas se llama isoterma ya que muestra puntos de temperatura constante.  
Es un poco raro tener los ejes inclinados, pero no tiene mayor dificultad.  
Por ejemplo, midiésemos la temperatura del aire a `3000m` (`~700mb`) y obtuviésemos `-10°C`, tal medida se representaría en el círculo rojo de la gráfica: en la intersección de los `700mb` con los `-10°C`.

Las líneas b) no son tanto unos ejes como unas *trayectorias* de referencia. Si registrásemos cómo se enfria una parcela de aire al elevarse en la atmósfera veríamos los puntos aparecer a lo largo de estas líneas *siempre y cuando la humedad contenida no condensase*. Estas líneas se llaman adiabáticas secas.

Las líneas c) son lo mismo que las b), pero cuando la humedad ha condensado, es decir, es el ritmo al que se enfría el aire dentro de una nube. Estas líneas se llama adiabáticas húmedas.

Las lineas d) muestran el ritmo al que cambia la temperatura de rocío con la altura. Por ejemplo, si la temperatura de rocío a `1000mb` es `-18°C`, a `400mb` la correspondiente temperatura de rocíoserá unos `-28°C` (basta con seguir la línea más a la izquierda)

## Curva de estado y Temperatura de rocío
Sobre estos ejes y trayectorias se dibujan dos curvas, normalmente en rojo y azul o verde. Estas curvas son datos o cálculos de la temperatura y de la temperatura de rocío a distintas alturas. Tan simple como eso…

En lugar de intentar dar una explicación teórica creo que por ahora es más práctico aprender el significado de todo esto interpretando algunos [ejemplos](#ejemplos).


## Datos extra
Una de las cosas más confusas de las curvas de estado es que en sí mismas no contienen toda la información necesaria para evaluar el día. En particular es necesario averiguar la temperatura esperada.
Nosotros añadimos esa información en la parte baja de la gráfica dibujando su correspondiente isoterma hasta el nivel del suelo.

Añadimos también (no todos los servicios añaden esta información) una línea negra que muestra la trayectoria que seguiría una parcela de aire al elevarse (y por tanto enfriarse) en la atmósfera.

Por último añadimos el techo (tope de las térmicas o base de la nube) con la línea punteada a media altura.

# Viento
Distintos servicios dan la información del viento de distinta forma. Nosotros hemos personalizado un poco la gráfica para hacerla más legible.

Las banderolas suelen darse en nudos (`1knot=1.852km/h`), pero ya que la mayoría de pilotos de parapente usamos habitualmente `km/h` he decidido dejarlo en estas unidades. **Esto no es standard**, pero me parece más fácil de leer (si suficiente gente se queja puedo cambiar las unidades en cualquier momento).

La gráfica de las intensidades no reviste más complicación. El eje X muestra la intensidad del viento y el eje Y muestra las respectivas altitudes. Por ejemplo, en la primera gráfica,a ras de suelo (línea punteada `GND:1080m`) el viento está entre `8-10km/h`.

## Hodógrafa
**Técnicamente esto no es una hodógrafa**. Nosotros mostramos la dirección de donde viene el viento. Esta gráfica y la gráfica de intensidad del viento se relacionan por el código de colores. El viento en el suelo es el punto morado, las primeras capas son rojas y verdes, y a partir de ahí oscila a naranja y azul, pero esto es a altitudes que no nos interesan.


# Nubosidad
Esta gráfica la hemos desarrollado nosotros y puede que sufra algunos cambios en el futuro. Se muestran 2 columnas rotuladas `O` y `C` en la parte de abajo con distintos rectángulos variando del blanco al negro. Por ahora es difícil extraer cuantitativamente el porcentaje de cielo cubierto, pero debería ser un indicativo visual razonable de la nubosidad esperada.

Consideramos `overcast` cuando la curva de estado y la curva de temperatura de rocío coinciden en las capas bajas, aunque en altura pintamos cierta nubosidad aunque no lleguen a solaparse. Esto nos permite intuir posibles cirradas de las capas altas.


# Ejemplos
Esta sección irá creciendo con el tiempo. Si alguien tiene una curva interesante puede mandárnosla y si es útil para explicar algún concepto la podemos añadir aquí

## Térmica Azul
Este es un ejemplo típico de un día con buena térmica, y bastante baja probabilidad de tormenta. Vamos a ver por qué.
<img class='post__img' src='/assets/images/sounding_termica_azul.png'/>
Lo primero cuando vayamos a evaluar unas condiciones de vuelo usando la curva de estado es buscar la temperatura esperada. <span class='info pro'> Esta temperatura es la temperatura esperada a 2m, el standard meteorológico y comparable otros modelos y estaciones meteorológicas</span>. En este ejemplo nuestro modelo predice `21.8°C`, aún si esta predicción se quedase corta o larga podríamos usar esta temperatura como referencia para hacernos una idea.

Si dibujamos esta información tendríamos que poner un punto (negro) a lo largo de la isoterma de `21.8°C` a la altura del terreno (línea punteada marcada con la altura del suelo `GND:1081m`). Nosotros ya hacemos esto automáticamente marcando la isoterma con una línea negra punteada.

Esa temperatura es mayor que la temperatura del aire de alrededor, y por tanto las parcelas de aire que alcancen esa temperatura empezarían a ascender en la atmósfera. Ahora, ¿Cómo se enfría la parcela de aire al ascender?  
Pues hay dos posibles trayectorias que la parcela de aire caliente puede seguir al enfriarse durante su ascenso: La adiabática seca y la adiabática húmeda.
Puesto que a la altura del suelo la temperatura de rocío es mucho más baja que la temperatura del aire (`~4°C`), a esa altitud no hay nube, y se le llama "aire seco".  
El aire caliente asciende, pues siguiendo la línea negra, paralela en este tramo a la adiabática seca.

Alcanzados los `3045m` podemos ver que la línea negra y la curva roja se cruzan. ¿Qué significa esto? Significa que a esa altitud la parcela de aire que se había calentado en el suelo y ha ascendido se encuentra ahora a la misma temperatura que el aire de su alrededor, y por tanto ya no va a seguir subiendo.
**El cruce de la trayectoria de la parcela de aire con la curva de estado marca la altura máxima a la que ascenderán las térmicas**

¿Cómo sabemos que no se va a formar nube? La temperatura de rocío de la parcela de aire a nivel del suelo era `~4°C`, en su ascenso el aire no se ha mezclado



## Térmica con Nube
<img class='post__img' src='/assets/images/sounding_termica.png'/>
## Posible Tormenta
<img class='post__img' src='/assets/images/sounding_tormenta.png'/>
