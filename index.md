---
layout: default
title: Rasp by Uri and Noel
---
{% assign UTCshift = 'now' | date: "%z" | divided_by: 100 %}
{% assign Iyear = 'now' | date: "%Y" %}
{% assign Imonth = 'now' | date: "%m" %}
{% assign Iday = 'now' | date: "%d" %}
{% assign Ihour = 14 %}
{% assign ISprop = 'SFCwind' %}

## NOTA
Tras un grave error mío debería estar todo arreglado. Los datos que faltan se irán calculando en las próximas horas siguiendo el horario descrito <a href='/about.html'>aquí</a>



<h2>Dominio</h2>
<div class='domain_selector' align="center">
{% for dom in site.data.domains %}
<button type="button"
        class="button domain {% if dom.code == 'd02'%} active {% else %} inactive {% endif %}"
        id="button_domain_{{ dom.code }}"
        onclick="javascript:change_domain('{{ dom.code }}');">
{{ dom.name }}
</button>
{% endfor %}
</div>


<h2>Subdominio</h2>
<div class='domain_selector' align="center">
{% for dom in site.data.zooms %}
<button type="button"
        class="button domain {% if dom.code == 'd02'%} active {% else %} inactive {% endif %}"
        id="button_domain_{{ dom.code }}"
        onclick="javascript:change_subdomain('{{ dom.code }}');">
{{ dom.name }}
</button>
{% endfor %}
</div>


<h2>Scalar Properties</h2>
<div class='Sprop_selector'>
{% for prop in site.data.properties %}
{% if prop.isexperimental != true %}
<button type="button"
        class="button prop {% if prop.prop == 'sfcwind' %} active {% else %} inactive {% endif %}"
        id="button_Sprop_{{ prop.prop }}"
        onclick="javascript:change_Sprop('{{ prop.prop }}');">
{{ prop.name }}
</button>
{% endif %}
{% endfor %}
</div>

<h2>Experimental</h2>
<div class='Sprop_selector'>
{% for prop in site.data.properties %}
{% if prop.isexperimental == true %}
<button type="button"
        class="button prop {% if prop.prop == 'sfcwind' %} active {% else %} inactive {% endif %}"
        id="button_Sprop_{{ prop.prop }}"
        onclick="javascript:change_Sprop('{{ prop.prop }}');">
{{ prop.name }}
</button>
{% endif %}
{% endfor %}
</div>

<h2>Vector Properties</h2>
<div class='Vprop_selector'>
{% for prop in site.data.properties %}
{% if prop.isvector == true %}
<button type="button"
        class="button vprop {% if prop.prop  == 'sfcwind' %} active {% else %} inactive {% endif %}"
        id="button_Vprop_{{ prop.prop }}"
        onclick="javascript:change_Vprop('{{ prop.prop }}');">
{{ prop.name }}
</button>
{% endif %}
{% endfor %}
</div>




<div id='plot_title' class="plot_title" align="center">
<h1>dummy</h1>
</div>

<label>
<input type="checkbox"  onChange="javascript:toggleVisibility(['clouds_layer','rain_layer'])" autocomplete="off" name='foo'>
<span>Nubes y lluvia(1h)</span>
</label>
<label>
<input type="checkbox"  onChange="javascript:toggleVisibility(['takeoffs_names_layer'])" autocomplete="off" name='foo'>
<span>Despegues</span>
</label>
<label>
<input type="checkbox"  onChange="javascript:toggleVisibility(['cities_names_layer'])" autocomplete="off" name='foo'>
<span>Ciudades</span>
</label>

<div class='map_container'>
   <img class="base_map" id="terrain_layer"/>
   <img class="over"    id="rivers_layer"/>
   <img class="over"    id="ccaa_layer"/>
   <img class="over"    id="takeoffs_layer"/>
   <img class="over"    id="cities_layer"/>
   <img class="over start_hidden"    id="takeoffs_names_layer"/>
   <img class="over start_hidden"    id="cities_names_layer"/>
   <!-- Scalar -->
   <img class="Sprop_map"  id="Sprop_layer"/>
   <!-- Vector -->
   <img class="Vprop_map"  id="Vprop_layer"/>
   <img class="VBprop_map" id="VBprop_layer"/>
   <!-- Overlay -->
   <img class="Oover start_hidden" id="clouds_layer"/>
   <img class="Oover start_hidden" id="rain_layer"/>
</div>
<!-- Color bar -->
<div class='map_container'>
   <img class="base_map" id="cbar_layer"/>
</div>


<!-- <h2>Time</h2> -->
<div class='hours_selector'>
{% comment %}
Hours are build on local timezone, but everything (classes, javascript)
use UTCtime
{% endcomment %}
{% for h in (site.data.runtime[0].hourstart..site.data.runtime[0].hourend) %}
   <button type="button"
           class="button hour {% if h == 14 %} active {% else %} inactive {% endif %}"
           id="button_hour_{{h | minus: UTCshift}}" onclick="javascript:change_hour({{h | minus: UTCshift}});">
   {{h}}:00
   </button>
{% endfor %}
</div>


<!-- <h2>Day</h2> -->
<div class='days_selector' align="center">
<!-- {% capture date0 %} {{'today' | date: "%Y/%m/%d" | jsonify }} {% endcapture %}
<p>{{date0}}</p>
-->
{% assign Ndays = site.data.runtime[0].Ndays | minus: 1 %}
{% for nday in (0..Ndays) %}
{% assign days = nday | times: 24 | times: 60 | times: 60 %}
{% assign day = 'now' | date: "%s" | plus: days | date: "%Y-%m-%d" %}
{% assign d = day | date: '%d' %}
{% assign m = day | date: '%m' %}
<button type="button"
        class="button day {% if nday == 0 %} active {% else %} inactive {% endif %}"
        id="button_day_{{day | date: '%d'}}"
        onclick="javascript:change_day({{ day | date: '%d,%m' }});">
{{day| date: "%d %b"}}
</button>
{% endfor %}
</div>


<!-- Soundings -->
<table class='table_sounding'>
<tr>
   <th colspan="2">Curvas de estado <span style='font-size:0.5em;font-weight: normal;'><a id="sounding_link" href='/curva_estado.html'>(info)</a></span></th>
</tr>
{% for place in site.data.soundings %}
<tr>
   <td>
   <label>
   <input type="radio" onChange="javascript:change_sounding('{{place.name}}')" name='foo'>
   <span>{{ place.name | capitalize }}</span>
   </label>
   </td>
   {% if place.name == site.data.soundings[0].name %}
   <td rowspan="{{site.data.soundings | size}}">
   <img id="sounding_img">
   </td>  <!-- Sounding -->
   {% endif %}
</tr>
{% endfor %}
</table>