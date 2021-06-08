---
---

var folder_root = "{{site.data.runtime[0].plotsfolder}}";

var UTCshift = {{ 'now' | date: "%z" | divided_by: 100 }};
var year = {{ 'now' | date: "%Y" }};
var month = {{ 'now' | date: '%m' }};
var day = {{ 'now' | date: '%d' }};
var hour = {{site.data.runtime[0].start_hour}};
var domain = "{{site.data.runtime[0].start_domain}}";
var Sprop = "sfcwind";
var Vprop = "sfcwind";
var Zoom = "";
var current_sounding = "somosierra";

var title_prop = {
{% for prop in site.data.properties %}
"{{prop.prop}}": "{{prop.name}}",
{% endfor %}
};

// var path = folder_root+'/'+domain+'/'+year+'/'+month+'/'+day ;
// console.log(path);


//var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
// var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

var days = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
var months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
// var SCs = ['SC2', 'SC2+1', 'SC4+2', 'SC4+3']

console.log('AAAAAAAAAA');
update_plots();
console.log('aaaaaaaaaa');


// var today = new Date();
// var language = 'es';
// var UTCshift = today.getTimezoneOffset() / 60;
// var d = today.getDate();
// var dw = days[ today.getDay() ];
// var m = today.getMonth() + 1;
// var my = months[ today.getMonth() ];
// var y = today.getFullYear();
// //var folder = '/var/www/html/RASP/data/PLOTS';
// var folder = 'data/PLOTS';
// 
// /* Global variables */
// var sc = 'SC2';
// var domain = 'w2';
// var Oprop = null;
// var Sprop = 'sfcwind';
// var Vprop = 'sfcwind';
// var hour = 14;
// var Ndays = 4;
// var Nhours = 12;  // 13 for CES(summer);  12 for CET(winter)
// var hour0 = 8;
// var sounding = null;
// 
// /* State variables */
// var Opts_menu = false;
// var Opts_minx = 100;

//  // Useful aliases
//  var plot_title = document.getElementById("Title");
//  var TER_layer = document.getElementById('terrain_layer')
//  var GND_layer = document.getElementById('gnd_layer')
//  var CCA_layer = document.getElementById('ccaa_layer')
//  // var TMA_layer = document.getElementById('TMA_layer')
//  var RIV_layer = document.getElementById('rivers_layer')
//  var ROA_layer = document.getElementById('roads_layer')
//  var TAK_layer = document.getElementById('takeoffs_layer')
//  var NAM_layer = document.getElementById('names_layer')

//  // var MAN_layer = document.getElementById('manga_layer')
//  // data
//  var S_layer = document.getElementById('scalar_layer')
//  var V_layer = document.getElementById('vector_layer')
//  var C_layer = document.getElementById('clouds_layer')
//  var R_layer = document.getElementById('rain_layer')
//  var P_layer = document.getElementById('press_layer')
//  var CB_layer = document.getElementById('cbar_layer')
//  var CB_R_layer = document.getElementById('rain_cbar_layer')


//   // ----  Default values for initial load ----
//   update_plot_title(dw,d,Sprop,hour)
//   TER_layer.src = get_folder(folder,domain,sc)+'/terrain.png';
//   GND_layer.src = get_folder(folder,domain,sc)+'/terrain1.png';
//   CCA_layer.src = get_folder(folder,domain,sc)+'/ccaa.png';
//   // TMA_layer.src = get_folder(folder,domain,sc)+'/TMA.png';
//   RIV_layer.src = get_folder(folder,domain,sc)+'/rivers.png';
//   ROA_layer.src = get_folder(folder,domain,sc)+'/roads.png';
//   TAK_layer.src = get_folder(folder,domain,sc)+'/takeoffs.png';
//   NAM_layer.src = get_folder(folder,domain,sc)+'/names.png';
//   CIT_layer.src = get_folder(folder,domain,sc)+'/cities.png';
//   // MAN_layer.src = get_folder(folder,domain,sc)+'/manga.png';
//   // meteo
//   S_layer.src = get_filename(folder,domain,sc,hour,UTCshift,Sprop,false);
//   V_layer.src = get_filename(folder,domain,sc,hour,UTCshift,Vprop,true);
//   // special layers
//   C_layer.src  = get_filename(folder,domain,sc,hour,UTCshift,'blcloudpct',false);
//   R_layer.src  = get_filename(folder,domain,sc,hour,UTCshift,'rain1',false);
//   P_layer.src  = get_filename(folder,domain,sc,hour,UTCshift,'mslpress',false);
//   CB_layer.src = folder+'/'+Sprop+'.png';
//   CB_R_layer.src = folder+'/'+'rain1.png';
//   
//   document.getElementById("days").innerHTML = generate_days();
//   
//   document.getElementById("hours").innerHTML = generate_hours();
//   
//   function SetLanguage() {
//      var lang = getCookie('lang');
//      if (lang == null) {   // cookie doesn't exist
//         language = 'es';
//       }
//       else {               // cookie does exist
//          language = lang;
//       }
//       translate(language);
//   }
//   
//   function getCookie(name) {
//       var dc = document.cookie;
//       var prefix = name + "=";
//       var begin = dc.indexOf("; " + prefix);
//       if (begin == -1) {
//           begin = dc.indexOf(prefix);
//           if (begin != 0) return null;
//       }
//       else
//       {
//           begin += 2;
//           var end = document.cookie.indexOf(";", begin);
//           if (end == -1) {
//           end = dc.length;
//           }
//       }
//       // because unescape has been deprecated, replaced with decodeURI
//       //return unescape(dc.substring(begin + prefix.length, end));
//       return decodeURI(dc.substring(begin + prefix.length, end));
//   }
//   
//   var language = SetLanguage()
