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


<h2>Dominio</h2>
<div class='domain selector' align="center">
{% for dom in site.data.domains %}
<button type="button"
        class="button domain {% if dom.code == 'd02'%} active {% else %} inactive {% endif %}"
        id="button_domain_{{ dom.code }}"
        onclick="Run.changeDomain('{{ dom.code }}');">
{{ dom.name }}
</button>
{% endfor %}
</div>


<h2>Subdominio</h2>
<div class='domain selector' align="center">
{% for dom in site.data.zooms %}
<button type="button"
        class="button domain {% if dom.code == 'd02'%} active {% else %} inactive {% endif %}"
        id="button_domain_{{dom.parent}}_{{ dom.code }}"
        onclick="Run.changeSubdomain('{{ dom.code }}','{{ dom.parent }}');">
{{ dom.name }}
</button>
{% endfor %}
</div>


<h2>Scalar Properties</h2>
<div class='Sprop selector'>
{% for prop in site.data.properties %}
{% if prop.isexperimental != true %}
<button type="button"
        class="button prop {% if prop.prop == 'sfcwind' %} active {% else %} inactive {% endif %}"
        id="button_Sprop_{{ prop.prop }}"
        onclick="Run.changeSprop('{{ prop.prop }}');">
{{ prop.name }}
</button>
{% endif %}
{% endfor %}
</div>


<div id='plot_title' class="plot_title" align="center">
<h1>dummy</h1>
</div>


<div>
{% for prop in site.data.properties %}
{% if prop.isexperimental %}
<label>
  <input class='clouds_button' type="checkbox"
         onChange='Run.toggleSpecialVisibility( {{ prop.id | jsonify}}, {{ prop.prop | jsonify}} )'
         autocomplete="off" name="foo">
  <span>{{ prop.name }}</span>
</label>
{% endif %}
{% endfor %}
</div>

<div class="layer-toggles">
{% for layer in site.data.layers %}
<label>
  <input type="checkbox"
         onChange='Run.toggleVisibility( {{ layer.ids | jsonify}} )'
         autocomplete="off" name="foo"
         {% if forloop.first %}checked{% endif %} >
  <span>{{ layer.label }}</span>
</label>
{% endfor %}
<!-- <br> -->
<!-- <label> -->
<!-- <input type="checkbox"  onChange="javascript:toggleVisibility(['manga_layer'])" autocomplete="off" name='foo'> -->
<!-- <span>Manga</span> -->
<!-- </label> -->
</div>

<input id="SliderOpacity" class="slider_opacity" type="range" min="0" max="100" value="50" oninput="Run.setOpacity(this.value,['Sprop_layer','lowcloud_layer', 'midcloud_layer', 'highcloud_layer']);">

<!--
<p id="cloudParagraph" style="display: none;">
Asegúrate de poner la opacidad al 100% para visualizar correctamente las nubes
<span>&#8593;</span>
</p>
-->

<div class='map_container'>
   <img class="base_map" id="terrain_layer"/>
   <img class="over"    id="rivers_layer"/>
   <img class="over start_hidden"    id="roads_layer"/>
   <img class="over"    id="ccaa_layer"/>
   <img class="over"    id="takeoffs_layer"/>
   <img class="over start_hidden"    id="peaks_layer"/>
   <img class="over start_hidden"    id="peaks_names_layer"/>
   <img class="over"    id="cities_layer"/>
   <img class="over start_hidden"    id="takeoffs_names_layer"/>
   <img class="over start_hidden"    id="city_names_layer"/>
   <img class="over start_hidden"    id="manga_layer"/>
   <!-- Scalar -->
   <img class="Sprop_map"  id="Sprop_layer"/>
   <!-- Vector -->
   <img class="Vprop_map"  id="Vprop_layer"/>
   <img class="VBprop_map" id="VBprop_layer"/>
   <!-- Overlay -->
   <img class="Oover start_hidden" id="lowcloud_layer"/>
   <img class="Oover start_hidden" id="midcloud_layer"/>
   <img class="Oover start_hidden" id="highcloud_layer"/>
   <img class="Oover" id="clouds_layer" style="visibility:visible;"/>
   <img class="Oover" id="rain_layer"   style="visibility:visible;"/>
   <!-- <img class="Oover start_hidden" id="slp_layer"/> -->
</div>
<!-- Color bar -->
<div class='map_container'>
   <img class="base_map" id="cbar_layer"/>
</div>


<!-- <h2>Time</h2> -->
<div class='hours selector'>
{% comment %}
Hours are build on local timezone, but everything (classes, javascript)
use UTCtime
{% endcomment %}
{% assign start_hour = site.data.runtime[0].start_hour %}
{% for h in (site.data.runtime[0].hourstart..site.data.runtime[0].hourend) %}
   <button type="button"
           class="button hour {% if h == start_hour %} active {% else %} inactive {% endif %}"
           id="button_hour_{{h | minus: UTCshift}}" onclick="Run.changeHour({{h | minus: UTCshift}});">
   {{h}}:00
   </button>
{% endfor %}
</div>


<!-- <h2>Day</h2> -->
<div class='days selector' align="center">
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
        onclick="Run.changeDay({{ day | date: '%d,%m,%Y' }});">
{{day| date: "%a %d"}}
</button>
{% endfor %}
</div>

<!-- Meteograms -->
<h2>Meteograms and sounding</h2>
<div class='places selector' align="center">
{% assign num_places = site.data.meteograms.size | minus: 1 %}
{% for place in site.data.meteograms limit:num_places %}
<button type="button"
        class="button place {% if place.code == site.data.soundings[0].code %} active {% else %} inactive {% endif %}"
        id="button_place_{{ place.code }}"
        onclick="Run.changeSounding('{{ place.code }}');Run.changeMeteogram('{{ place.code }}');">
{{ place.name | capitalize }}
</button>
{% endfor %}
{% assign narnia = site.data.meteograms | last %}
<button type="button"
        id="button_place_{{ narnia.code }}"
        class="secret"
        onclick="Run.changeSounding('{{ narnia.code }}');Run.changeMeteogram('{{ narnia.code }}');">
.
</button>

<p>
{% raw %}
*(6km)
{% endraw %}
</p>

</div>


<div class='sounding container'>
   <img id="sounding_img">
</div>
<div class='meteogram container'>
   <img id="meteogram_img">
</div>
