function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function updateImage(stationId) {
  const img = document.getElementById('station-img');
  img.src = `/assets/images/Spain6_1/stations/${stationId}`;
  history.replaceState(null, '', `?station=${stationId}`);
}

function selectStation(stationId) {
  updateImage(stationId);
  const select = document.getElementById('station-select');
  if (select) {
    select.value = stationId;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Load station from query param if present
  const station = getQueryParam('station');
  if (station) {
    updateImage(station);
    const select = document.getElementById('station-select');
    if (select) {
      select.value = station;
    }
  }

  // Dropdown selection event
  const select = document.getElementById('station-select');
  if (select) {
    select.addEventListener('change', function () {
      const selected = this.value;
      if (selected) {
        updateImage(selected);
      }
    });
  }
});
