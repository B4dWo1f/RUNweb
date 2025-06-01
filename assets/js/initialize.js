---
---

class RunPlots {
   constructor(config) {
      this.title_prop = config.title_prop || {};
      this.sounding_domains = config.sounding_domains || {};
      this.meteogram_domains = config.meteogram_domains || {};
      this.folder_root = config.folder_root;
      this.UTCshift = config.UTCshift;
      this.domain = config.domain;
      this.Sprop = config.Sprop || "sfcwind";
      this.Vprop = config.Vprop || "sfcwind";
      this.Zoom = config.Zoom || "";
      this.current_sounding = config.current_sounding || null;
      this.current_meteogram = config.current_meteogram || null;

      // Current date
      this.year = config.year;
      this.month = config.month;
      this.day = config.day;
      this.hour = config.hour;
      // Clouds layers
      this.experimentalMap = {
         low_clouds: "lowcloud_layer",
         mid_clouds: "midcloud_layer",
         high_clouds: "highcloud_layer"
      };

   }

   getPathBase(domainOverride = "") {
      const domain = domainOverride || this.domain;
      return `${this.folder_root}/${domain}`;
   }

   getPathDaily(domainOverride = "") {
      const domain = domainOverride || this.domain;
      const year = this.year.toString().padStart(4, "0");
      const month = this.month.toString().padStart(2, "0");
      const day = this.day.toString().padStart(2, "0");
      return `${this.folder_root}/${domain}/${year}/${month}/${day}`;
      // return `${this.getPathBase()}/${this.year}/${String(this.month).padStart(2, '0')}/${String(this.day).padStart(2, '0')}`;
   }

   generateFilename(h, prop, isvec, extra = "", skipzoom=false) {
      const hourStr = h.toString().padStart(2, '0');
      const fname = isvec
         ? `${hourStr}00_${prop}${extra}`
         : `${hourStr}00_${prop}`;
      const suffix = skipzoom ? "" : this.Zoom;
      return `${fname}${suffix}.webp`;
   }
 
   updatePlots() {
      const path_base  = this.getPathBase();
      const path_daily = this.getPathDaily();
      // const hourUTC      = Number(this.hour);
      // const hourLocal    = hourUTC + this.UTCshift;


      // Update title
      document.getElementById('plot_title').innerHTML = this.generateTitle();

      // Helper for image src update
      const set = (id, path, file) => {
         const el = document.getElementById(id);
         if (el) el.src = path + '/' + file;
      };

      // Common layers
      for (const base of ['rivers','roads','ccaa','takeoffs','takeoffs_names','cities','city_names','peaks','peaks_names','terrain']) {
         set(`${base}_layer`, path_base, base+this.Zoom+'.webp');
      }

      // Scalar
      set('Sprop_layer', path_daily, this.generateFilename(this.hour, this.Sprop, false));

      // Vector
      set('Vprop_layer', path_daily, this.generateFilename(this.hour, this.Vprop, true, '_vec'));

      // Vector barbs (only if zoomed)
      if (this.Zoom !== '') {
         set('VBprop_layer', path_daily, this.generateFilename(this.hour, this.Vprop, true, `_barb`));
      } else {
         const vb = document.getElementById('VBprop_layer');
         if (vb) vb.src = '';
      }

      // Other diagnostics
      set('clouds_layer', path_daily, this.generateFilename(this.hour, 'blcloudpct', false));
      set('rain_layer', path_daily, this.generateFilename(this.hour, 'rain', false));
      set('cbar_layer', path_base, `${this.Sprop}.webp`);

      // Testing
      set('lowcloud_layer', path_daily, this.generateFilename(this.hour, 'lowfrac', false));
      set('midcloud_layer', path_daily, this.generateFilename(this.hour, 'midfrac', false));
      set('highcloud_layer', path_daily, this.generateFilename(this.hour, 'highfrac', false));

      // Sounding & meteogram
      // if (this.current_meteogram) this.changeMeteogram(this.current_meteogram);
      // if (this.current_sounding) this.changeSounding(this.current_sounding);
      this.changeSounding(this.current_sounding);
      this.changeMeteogram(this.current_meteogram);

   }

   generateTitle() {
      // Add whatever logic you had before
      const title = this.title_prop?.[this.Sprop] || this.Sprop;
      const monthName = getMonthName(this.month);
      const dayStr = String(this.day).padStart(2, '0');
      const hourLocal = Number(this.hour) + Number(this.UTCshift);
      return `<h1>${title}<br>${dayStr}/${monthName} ${hourLocal}:00</h1>`;
   }

   // Change hour
   changeHour(newHour) {
      this.hour = newHour;

      this.updatePlots();
      this.setActiveButton("button hour", "button_hour_", this.hour);
   }

   changeDay(day, month, year) {
      this.day = day.toString().padStart(2, '0');
      this.month = month.toString().padStart(2, '0');
      this.year = year.toString().padStart(4, '0');

      this.updatePlots();
      this.setActiveButton("button day", "button_day_", this.day);
   }

   changeDomain(domainCode) {
      this.domain = domainCode;
      this.Zoom = "";  // Reset zoom on domain change

      this.updatePlots();

      // Deactivate all domain and subdomain buttons
      const allButtons = document.getElementsByClassName("button domain");
      for (let btn of allButtons) {
         btn.className = "button domain inactive";
      }

      // Activate selected domain button
      const domainBtn = document.getElementById(`button_domain_${domainCode}`);
      if (domainBtn) {
         domainBtn.className = "button domain active";
      } else {
         console.warn(`Domain button not found: button_domain_${domainCode}`);
      }
   }

   changeSubdomain(subdomainCode, parentDomain) {
      this.domain = parentDomain;
      this.Zoom = `_${subdomainCode}`;

      this.updatePlots();

      // Deactivate all domain/subdomain buttons
      const allButtons = document.getElementsByClassName("button domain");
      for (let btn of allButtons) {
         btn.className = "button domain inactive";
      }

      const btnId = `button_domain_${parentDomain}_${subdomainCode}`;
      const subdomainBtn = document.getElementById(btnId);
      if (subdomainBtn) {
         subdomainBtn.className = "button domain active";
      } else {
         console.warn(`Subdomain button not found: ${btnId}`);
      }
   }

   changeSprop(prop) {
      // Disable Clouds layer
      const buttons = document.getElementById('mybutton');
      const checkboxes = document.querySelectorAll(".clouds_button");
      checkboxes.forEach(cb => cb.checked = false);
      for (const [key, lid] of Object.entries(this.experimentalMap)) {
         const layer = document.getElementById(lid);
         if (layer) {
            layer.style.visibility = "hidden";
         }
         // const btn = document.getElementById(`button_exp_${key}`);
         // if (btn) {
         //    btn.className = "button prop inactive";
         // }
      }
      // remove Sprop layer
      const slayer = document.getElementById('Sprop_layer');
      slayer.style.visibility = "visible";

      this.Sprop = prop;

      // If scalar is a wind variable, update Vprop to match
      const windProps = ["sfcwind", "blwind", "bltopwind", "wind1500", "wind2000", "wind2500", "wind3000"];
      if (windProps.includes(this.Sprop)) {
         this.Vprop = prop;
      }

      // // Show/hide cloud warning
      // const cloudWarning = document.getElementById("cloudParagraph");
      // if (cloudWarning) {
      //    cloudWarning.style.display = this.Sprop.includes("frac") ? "block" : "none";
      // }

      // Update plots
      this.updatePlots();
      // Update button states
      this.setActiveButton("button prop", `button_Sprop_`, this.Sprop);
   }

//   changeVprop(prop) {
//      this.Vprop = prop;
//      this.updatePlots();
//   }
//
//   changeZoom(z) {
//      this.Zoom = z;
//      this.updatePlots();
//   }

   changeMeteogram(code) {
      this.current_meteogram = code;
      const domain = this.meteogram_domains?.[code] || this.domain;
      const path_daily = this.getPathDaily(domain);
      // const path_daily = this.getPathDaily();
      if (!code) return;
      const fname = `meteogram_${code}.webp`;
      const img = document.getElementById("meteogram_img");
      if (img) img.src = `${path_daily}/${fname}`;
      this.setActiveButton("button place", "button_place_", this.current_meteogram);
   }

   changeSounding(code) {
      this.current_sounding = code;
      const domain = this.sounding_domains?.[code] || this.domain;
      const path_daily = this.getPathDaily(domain);
      // const path_daily = this.getPathDaily();
      if (!code) return;
      const fname = this.generateFilename(this.hour, `sounding_${code}`, false, "", true);
      const img = document.getElementById("sounding_img");
      if (img) img.src = `${path_daily}/${fname}`;
      this.setActiveButton("button place", "button_place_", this.current_sounding);
   }

   setActiveButton(className, idPrefix, value) {
      const buttons = document.getElementsByClassName(className);
      for (let btn of buttons) {
         btn.className = className + " inactive";
      }
      const activeId = `${idPrefix}${value}`;
      const activeBtn = document.getElementById(activeId);
      if (activeBtn) {
         activeBtn.className = className + " active";
      } else {
         console.warn(`Button not found: ${activeId}`);
      }
   }

   toggleSpecialVisibility(id, prop) {
      // remove Sprop layer
      const slayer = document.getElementById('Sprop_layer');
      slayer.style.visibility = "hidden";
      
      const el = document.getElementById(id);
      const path_daily = this.getPathDaily();
      const fname = this.generateFilename(this.hour, prop, false);
      el.src = path_daily + '/' + fname;
      const isVisible = getComputedStyle(el).visibility === "visible";
      el.style.visibility = isVisible ? "hidden" : "visible";
      if (el) el.style.opacity = 1;
      //    if (!el) {
      //       console.warn(`Element not found: ${id}`);
      //       return;
      //    }
   }

   toggleVisibility(ids) {
      ids.forEach(id => {
         const el = document.getElementById(id);
         if (!el) {
            console.warn(`Element not found: ${id}`);
            return;
         }
         const isVisible = getComputedStyle(el).visibility === "visible";
         el.style.visibility = isVisible ? "hidden" : "visible";
      });
   }

   setOpacity(value, layers) {
      const opacity = value / 100;
      for (const id of layers) {
         const el = document.getElementById(id);
         if (el) el.style.opacity = opacity;
         else console.warn(`Layer not found: ${id}`);
      }
   }

}

function getMonthName(monthNumber) {
   // monthNumber is 1-based (1 = January)
   const date = new Date(2000, monthNumber - 1);  // Any year is fine
   return date.toLocaleString('es-ES', { month: 'long' });
}


window.Run = new RunPlots({
   title_prop: {
      {% for prop in site.data.properties %}
      "{{ prop.prop }}": "{{ prop.name }}",
      {% endfor %}
   },
   sounding_domains: {
      {% for sound in site.data.soundings %}
      '{{sound.code}}':'{{sound.parent}}',
      {% endfor %}
   },
   meteogram_domains: {
      {% for meteog in site.data.meteograms %}
      '{{meteog.code}}':'{{meteog.parent}}',
      {% endfor %}
   },
   folder_root : "{{ site.data.runtime[0].plotsfolder }}",
   UTCshift    : {{ 'now' | date: '%z' | divided_by: 100 }},
   year        : {{ 'now' | date: '%Y' }},
   month       : {{ 'now' | date: '%m' }},
   day         : {{ 'now' | date: '%d' }},
   {% assign UTCshift = 'now' | date: "%z" | divided_by: 100 %}
   {% assign start_hour_utc = site.data.runtime[0].start_hour | minus: UTCshift %}
   hour: {{ start_hour_utc }},
   domain: "{{ site.data.runtime[0].start_domain }}",
   Sprop: "sfcwind",
   Vprop: "sfcwind",
   Zoom: "",
   current_meteogram: "somosierra",
   current_sounding: "somosierra"
});


Run.updatePlots();

