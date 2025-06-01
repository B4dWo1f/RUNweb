---
layout: posts
title: About
---
# Extremadamente experimental, no fiarse aún

No se aceptan reclamaciones en caso de pinchar

<!-- Responsive Menu -->
<div class="sidebar" id="sidebar">
  <ul>
    {% for station in site.data.stations %}
      <li><a href="#" onclick="selectStation('{{ station.file }}'); return false;">{{ station.name }}</a></li>
    {% endfor %}
  </ul>
</div>

<div class="dropdown" id="dropdown">
  <select id="station-select">
    <option value="">Select a station</option>
    {% for station in site.data.stations %}
      <option value="{{ station.file }}">{{ station.name }}</option>
    {% endfor %}
  </select>
</div>

<!-- Image -->
<img class="post__img" id="station-img" src="/assets/images/Spain6_1/stations/{{ site.data.stations[0].file | default: 'default_station.webp' }}" alt="Station image"/>

<!-- JS -->
<script src="/assets/js/stations.js"></script>
