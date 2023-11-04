---
layout: posts
title: F.A.Q.
---

## Los mapas son muy feos
Técnicamente esto no es una pregunta… pero vale…
Efectivamente el proyecto es tan grande y quedan tantas cosas por hacer que de momento estamos más centrados en mejorar las predicciones que en hacer dibujos más bonitos.

En el largo plazo tenemos la idea de montar un GIS, pero las soluciones fáciles (servicios on-line), no permiten mantener todo el control que queremos sobre los datos.
Si alguien quiere contribuir estaremos muy agradecidos, por mi parte sólo tengo tres requisitos para pasar a un GIS propiamente dicho
- Eficiente (La salida del WRF pesa unos 200MB por hora de pronóstico, hay que poder mover los datos lo suficientemente rápido)
- Control de los mapas de colores y las escalas. Nada de límites automáticos, ni de transiciones suaves de colores, por muy bonitos que sean los mapas. Queremos ser capaces de transmitir información cuantitativa en la imagen.
- Líneas de flujo (en contraste a windbarbs). Al menos a ciertas escalas las líneas de flujo transmiten mejor la situación del viento y en particular hace las convergencias mucho más visibles.


## ¿Cómo de fiables son vuestras predicciones?
El modelo tiene poco tiempo así que aún estoy trabajando en rastrear estaciones fiables para poder hacer una comparación cuantitativa en distintas zonas.  
Por ahora los únicos datos con los que podemos comparar son con pilotos del club y observadores sobre el terreno.  
Por ahora hemos enconttrado que captura muy bien la velocidad del viento en capas bajas. También reproduce la base de la nube o el techo del día, si no hay nubes. A este respecto, algún día hemos encontrado predicciones de techos altísimos a últimas horas del día con térmicas débiles. Aunque en la zona vimos que las nubes estaban donde predecía el modelo, ninguno de los pilotos de la zona fuimos capaces de subir tan arriba. Esto puede ser un fallo en lo que llamamos "térmica aprovechable"… o una mala interpretación de los datos.
No obstante, en las horas normales de vuelo ha clavado las altitudes del techo todas las veces que lo hemos podido comprobar.

<img class='post__img' src='/assets/images/manga.jpeg'/>

En particular durante la [Liga Nacional del Yelmo de 2021](http://www.parapentectnp.com/competiciones/detalle/240/liga-nacional-yelmo) pudimos comprobar en directo la altura del techo en distintas partes de la manga así como la formación de calles de nubes debidas a convergencias organizadas en el llano y la entrada de viento del este por la tarde.

Tendremos ocasión de poner a prueba el modelo en la próxima [Pre PWC en Piedrahita](http://www.parapentectnp.com/competiciones/detalle/240/liga-nacional-yelmo).
