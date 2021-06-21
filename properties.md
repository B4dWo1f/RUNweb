---
layout: posts
title: Properties
---

# Techo
Es la **altura efectiva** a la que podremos subir gracias a convección **térmica**.
En presencia de nubes puede que la convección suba más de lo indicado por `Techo`, pero no es una altitud que podamos (ni debamos) aprovechar con el parapente.
`Techo` es, en cada punto del dominio, la menor de estas tres cantidades:
* Altura de la térmica aprovechable por un parapente (`W*>1.1m/s`)
* Base de las nubes convectivas
* Base de las nubes no convectivas  


---


<!-- picture missing -->
# Base nube cúmulo
Es la altitud a la que estará la base de las nubes que se formen debido a actividad térmica (cúmulos).


---


# Base nube cubierta
Es la altitud a la que estará la base de las nubes no convectivas (frentes, por ejemplo).


---


# Convergencias
<img class='post__img' src='/assets/images/convergencia.png'/>
Se define como el valor máximo/mínimo de la componente vertical del viento para cada punto sin tener en cuenta térmicas.
Esta cantidad es muy útil para tres cosas:
- Valores marcadamente positivos señalan el barlovento. Valores marcadamente negativos señalan sotaventos.
- Un valor positivo a lo largo de una ladera puede marcar zona de vuelo en **ladera** (obviamente si además hay térmica será un vuelo mixto de temoladera).
- **¡Convergencias!** por eso lo llamamos así. Cuando dos masas de viento se encuentran pueden "colisionar" resultando en una ascensión vertical en la zona donde "convergen".
<!-- picture missing -->

En la imagen he marcado en rojo una convergencia que cruza todo Madrid, desde más allá de Cebreros hasta Guadalajara (al sur de la Muela).

Además en azul he señalado la ladera de Arcones-Somo. El viento es bastante de oeste, por lo que la ladera no muestra un color uniforme sino que hay zonas más rojas que otras señalando zonas mejor y peor orientadas.


La resolución de nuestro modelo es tan alta que incluso puede verse el sotavento del puerto de Navafría y el puerto de la A1 entre Somo y la Cebollera!!

---


# Térmicas
Velocidad vertical esperada de la térmica en `m/s`. Esta cantidad suele llamarse `W*`, y en algún sitio la he visto referenciada como [Deardorff velocity](https://glossary.ametsoc.org/wiki/Deardorff_velocity).
Esta cantidad no es directamente comparable con lo que va a medir el vario (al menos tengo esa impresión) pero sí que es consistente entre días (cuando marque `+4` va a ser el doble de duro que cuando marque `+2`).


---


# BL
Muchas de las propiedades que usamos se definen basadas en la **B**oundary **L**ayer. La BL (a veces también llamada `pbl`, `pblh`, o `bldepth`) es la "**B**oundary **L**ayer" or "**P**lanetary **B**oundary **L**ayer height". Esta es la parte más baja de la atmósfera cuyo comportamiento está marcado principalmente por el contacto con el terreno y su calentamiento (a terminar, más en [wikipedia](https://en.wikipedia.org/wiki/Planetary_boundary_layer)).

---

### Nubes y lluvia

El botón "Nubes y lluvia", justo sobre los mapas, superpone nubosidad y precipitación sobre el mapa que se esté mostrando.

La capa de nubosidad no es toda la nubosidad que pueda desarrollarse durante el día sino que se muestra sólo a partir de un cierto umbral. Lo he preparado para que la cubierta de nubes sea comparable a la de meteoblue.

<img class="post__img" id="clouds_doc" src="/assets/images/clouds.png"/>

Ahora la sección nubes bajas/medias/altas permite ver el porcentaje de cada tipo de nubes (pronto podremos superponer las 3 a la vez).

La lluvia que presentamos es la lluvia acumulada en la hora previa. Es decir, la lluvia presentada para un día a las 15:00 será la lluvia caída entre las 14:00 y las 15:00 de ese día. Este es el standard meteorológico para poder comparar la predicción con estaciones meteorológicas.

---

# Viento
## Superficie
Viento a 10m del suelo (el standard meteorológico), comparable a otros sistemas meteo y a estaciones.

## Promedio BL
Velocidad y dirección del viento promediada en altura. Es una media ponderada con la extensión de cada nivel.

## Techo BL
Velocidad y dirección del viento en el límite de la BL. Es importante notar que el límite de la BL no se corresponde a una altura fija sobre el nivel del mar para todo el dominio. Por ejemplo sobre las montañas suele ser más alto que sobre las llanuras.

---

# CAPE
El CAPE es la "energía potencial convectiva disponible" (**C**onvective **A**vailable **P**otential **E**nergy). Esta cantidad está relacionada con la posibilidad de que se formen tormentas. Un CAPE alto significa mayor posibilidad de tormetas. Es interesante combinar esta cantidad con el botón `cloud fraction`.
