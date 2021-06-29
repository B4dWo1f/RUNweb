---
layout: posts
title: About
---
# About us

Buenas! Somos Oriol y Noel, dos pilotos de la zona centro, del club [Denubeanube](http://www.denubeanube.com/).  
Este sitio es heredero directo de la instalación del RASP by [DrJack](http://drjack.info) que hizo Oriol... pero de ese sistema sólo queda ya el conocimiento que obtuvimos.

He hecho una instalación desde cero y re-implemententado (y expandido) los cálculos de propiedades del DrJack, así como desarrollado esta web (que irá mejorando con el tiempo).  

La experiencia previa con el modelo y el conocimiento meteo de Oriol han sido claves para evitar (y resolver) muchos muchos quebraderos de cabeza, y ya se está metiendo en el post-procesado. Esperamos poder exprimir aún más el modelo extrayendo información útil para el vuelo libre.

Esperamos que el modelo funcione bien y nos permita disfrutar de muchos días de grandes vuelos.  
¡Nos vemos en el aire!

# El sistema
Los datos que ofrecemos son calculados mediante el modelo [WRF](https://www2.mmm.ucar.edu/wrf/users/), hemos intentado ir documentando (casi) todos los pasos de la instalación que se puede consultar [aquí](https://github.com/B4dWo1f/RUN/wiki).

El WRF es un [modelo númerico](https://meteoglosario.aemet.es/es/termino/171_modelo-numerico) que permite calcular propiedades atmosféricas con una gran resolución espacial ¡perfecto para el vuelo libre!
El WRF es un modelo (muy) complejo y aún estamos lejos de entender todos los cálculos que realiza, pero mi intención es ir documentando todo lo que aprendamos.

Aunque esta nueva instalación sólo lleva activa un par de meses, los días que hemos podido comparar las predicciones con condiciones de vuelo han dado unos resultados espectaculares. ¡¡Parece que **está funcionando muy bien**!!  
Durante la liga nacional del Yelmo acertamos la situación de la convergencia que permitió hacer la manga de 200km, así como la formación de calles de nubes a lo largo del camino, y pudimos comprobar en directo la altura del techo a lo largo del recorrido.  
Donde tenemos ojos (Sierra Norte, valle dl Lozoya...) hemos comprobado en varias ocasiones la formación de las convergencias ¡e incluso de sobre-desarrollos y lluvia que otros modelos no captaron!  
(en la larga lista de tareas pendientes tengo la comparación de nuestra predicción con estaciones meteo y con los vuelos que suba la gente para que no dependa de que creáis nuestro testimonio).

En un futuro cercano porbaremos otros dominios, añadiremos funcionalidades... ¡muchos planes!
Dicho esto... Por ahora es sistema es bastante estable, pero estamos intentando afinalo para poder incluir un dominio en Pirineos manteniendo los últimos datos disponibles en todo momento, si hacemos pruebas lo haremos intentando no interrumpir el servicio en momentos interesantes para el vuelo.

## Horarios
El `GFS` (fuente y base de nuestros cálculos) sirve los datos cada 6 horas, aunque sólo están disponibles unas 3 horas y media después. 
Esto sucede a las siguientes horas (`z` = UTC):
- `0:00z`, con los datos disponibles a las `5:35` (horario verano de España peninsular)
- `6:00z`, datos a las `11:35`
- `12:00z`, datos a las `17:35`
- `18:00z`, datos a las `23:35`  

Hemos conseguido optimizar el sistema para que nos quepan 4 días completos (posiblimente nos quepa un quinto) en cada remesa de datos del GFS.  

<!--
Por tanto nosotros actualizamos los pronósticos a esas horas. Nombraremos los días respecto al día actual, de forma que hoy es el día 0, mañana es el día 1, pasado el 2, etc.

<table class="schedule_runs">
<tr>
   <th>GFS batch</th><th>Hora UTC</th><th>Día pronóstico</th>
</tr>
<tr>
   <td>00</td><td>3:40</td><td>0, 1</td>
</tr>
<tr>
   <td>06</td><td>9:40</td><td>0, 2</td>
</tr>
<tr>
   <td>12</td><td>15:40</td><td>1, 3</td>
</tr>
<tr>
   <td>18</td><td>21:40</td><td>4, 1</td>
</tr>
</table>

Con los parámetros actuales cada cálculo de un día completo (13 horas, de `8:00` a `20:00`) tarda unas dos horas y poco, puedes ver la actividad del ordenador [aquí](/system.html). Este tiempo puede cambiar cuando vayamos tocando los distintos parámetros disponibles, así que los horarios también cambiarán...
Os mantendremos informados ;)
-->

## Consejos y sutilezas

### Nubes y precipitación

El botón "`Nubes y lluvia(1h)`", justo bajo el título, superpone nubosidad y precipitación sobre el mapa que se esté mostrando. Esta capa de nubosidad no es toda la nubosidad que pueda desarrollarse durante el día sino que se muestra sólo a partir de un cierto umbral. Lo he preparado para que la cubierta de nubes sea comparable a la de meteoblue.

<img class="post__img" id="clouds_doc" src="/assets/images/clouds.png"/>

Para entender mejor la nubosidad hay que prstar atención a "Base cubierta/cumulos", y los porcentajes de nubosidad baja, media y alta.


### Suavizado primeras horas.

Las primeras horas del cálculo a penas modifican los datos del GFS. Recomiendan descartar las primeras 1-3 horas de cálculo. He programado todo de tal forma que los datos se vayan pintando según se calculan en lugar de esperar a que todo el periodo esté calculado, esto tiene el inconveniente de que meter excepciones a mano es tedioso, por lo que he optado por hacer lo siguiente.
Todos los días calculamos de `8:00` a `20:00` y mostramos los datos sólo de `9:00` a `20:00`. De forma que descartamos la primera hora. Es **importante** tener en cuenta que el cálculo de las `9:00` aún **puede estar un poco suavizado**.  
**AVISO**. Para el día actual, a las `11:40` actualizamos los datos, pintando de `11:00` a `20:00`, por tanto si miramos el pronósico a las `12:00` veremos que los datos de las `11:00` están suavizados.

Esto no es ideal, pero es una solución de compromiso que no me requiere hacer cambios profundos o farragosos y no corremos el peligro de ver suavizados artificiales en pronósticos de futuro (pero sí pasados). Cuando le busque una solución más elegante os avisaré.

Aquí un ejemplo de este efecto:

<img class="post__img" id="suavizado_doc" src="/assets/images/suavizado.png"/>
