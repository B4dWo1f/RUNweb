/* Global variables */
// var folder_root = '/assets/images/Spain6_1';
// var domain = 'd02';
// var Oprop = null;
// var Sprop = 'sfcwind';
// var Vprop = 'sfcwind';
// var year = "2021";
// var month = "06";
// var day = "08";
// ;
// var UTCshift = 2
// var hour = 12;
// var Numberhour = Number(hour);
// var hourUTC = Numberhour + UTCshift;
// var sounding = null;
// var path = folder_root+'/'+domain+'/'+year+'/'+month+'/'+day ;



function generate_path(folder_root, domain, year, month, day) {
   return folder_root+'/'+domain+'/'+year+'/'+month.toString().padStart(2, '0')+'/'+day.toString().padStart(2, '0');
}

function generate_filename(h,prop,isvec,extra) {
   hour = h.toString().padStart(2, '0');
   if (isvec===true){
      // Vprop = p
      var fname = hour+'00_'+prop+extra;
   }
   else {
      // Sprop = p
      var fname = hour+'00_'+prop;
   }
   return fname + Zoom + '.png';
}

function generate_title() {
   return '<h1>'+title_prop[Sprop] +'<br>'+ day+'/'+ months[Number(month)-1] +' '+hourUTC+':00'+'</h1>';
}

function update_plots(){
   // Order is chosen for speed
   path = generate_path(folder_root, domain, year, month, day);
   console.log('update_plots-----------');
   console.log(path+' '+Sprop+' '+Vprop);
   console.log(month);
   console.log(months[Number(month)]);
   console.log(Zoom);
   // Title
   hourN = Number(hour);
   hourUTC = hourN + UTCshift;
   document.getElementById('plot_title').innerHTML = generate_title();
   // Rivers
   document.getElementById('rivers_layer').src = path+'/rivers'+Zoom+'.png';
   // Roads
   document.getElementById('road_layer').src = path+'/roads'+Zoom+'.png';
   // CCAA
   document.getElementById('ccaa_layer').src = path+'/ccaa'+Zoom+'.png';
   // Takeoffs
   document.getElementById('takeoffs_layer').src = path+'/takeoffs'+Zoom+'.png';
   document.getElementById('takeoffs_names_layer').src = path+'/takeoffs_names'+Zoom+'.png';
   // Takeoffs
   document.getElementById('cities_layer').src = path+'/cities'+Zoom+'.png';
   document.getElementById('cities_names_layer').src = path+'/cities_names'+Zoom+'.png';
   // Scalar
   var fname = generate_filename(hour,Sprop, false, '');
   document.getElementById('Sprop_layer').src = path+'/'+fname;
   // Vector
   var fname = generate_filename(hour,Vprop, true, '_vec');
   document.getElementById('Vprop_layer').src = path+'/'+fname;
   // Barbs
   if ( Zoom != '' ){
      var fname = generate_filename(hour,Vprop, true, '_barb');
      document.getElementById('VBprop_layer').src = path+'/'+fname;
   }
   else{
      document.getElementById('VBprop_layer').src = '';
   }
   // Clouds
   var fname = generate_filename(hour,'blcloudpct', false, '');
   console.log(path+'/'+fname);
   document.getElementById('clouds_layer').src = path+'/'+fname;
   // Rain
   var fname = generate_filename(hour,'rain', false, '');
   console.log(path+'/'+fname);
   document.getElementById('rain_layer').src = path+'/'+fname;
   // Color Bar
   document.getElementById('cbar_layer').src = path+'/'+Sprop+'.png';
   console.log(Sprop+' '+Vprop);
   // Sounding
   if ( current_sounding != null ){
      document.getElementById('sounding_img').src = path+'/'+hour+'00_sounding_'+current_sounding+'.png';
   }
   // Terrain
   document.getElementById('terrain_layer').src = path+'/terrain'+Zoom+'.png';
   console.log('--update_plots');
}

function change_domain(x) {
   domain = x;
   Zoom = '';
   update_plots();
   var all_domain_buttons = document.getElementsByClassName("button domain");
   console.log(all_domain_buttons);
   var N = all_domain_buttons.length;
   for (var i = 0; i < N; i++) {
      all_domain_buttons[i].className = 'button domain inactive';
      console.log(all_domain_buttons[i]);
   }
   console.log('-->'+'button_domain_'+x);
   document.getElementById('button_domain_'+x).className = 'button domain active';
   console.log('Domain changed');
}

function change_subdomain(x) {
   //XXX
   domain = 'd02';
   Zoom = '_'+x;
   console.log(Zoom);
   update_plots();
   var all_domain_buttons = document.getElementsByClassName("button domain");
   console.log(all_domain_buttons);
   var N = all_domain_buttons.length;
   for (var i = 0; i < N; i++) {
      all_domain_buttons[i].className = 'button domain inactive';
      console.log(all_domain_buttons[i]);
   }
   console.log('-->'+'button_domain_'+x);
   document.getElementById('button_domain_'+x).className = 'button domain active';
   console.log('Domain changed');
}

function change_day(x,y) {
   day = x.toString().padStart(2, '0');
   month = y.toString().padStart(2, '0');
   update_plots();
   console.log('button_day_'+x+','+y);
   var all_day_buttons =  document.getElementsByClassName("button day");
   var N = all_day_buttons.length;
   for (var i = 0; i < N; i++) {
      all_day_buttons[i].className = 'button day inactive';
   }
      console.log('button_day_'+day);
   document.getElementById('button_day_'+day).className = 'button day active';
}

function change_hour(x) {
   console.log('Changing hour');
   hour = x.toString().padStart(2, '0');
   update_plots();
   var all_hour_buttons =  document.getElementsByClassName("button hour");
   var N = all_hour_buttons.length;
   for (var i = 0; i < N; i++) {
      all_hour_buttons[i].className = 'button hour inactive';
   }
   document.getElementById('button_hour_'+x).className = 'button hour active';
   console.log('Hour changed');
}

function change_Sprop(x) {
   Sprop = x;
   if ( ["sfcwind", "blwind", "bltopwind"].includes(Sprop) ){
      Vprop = x;
      var all_prop_buttons =  document.getElementsByClassName("button vprop");
      var N = all_prop_buttons.length;
      for (var i = 0; i < N; i++) {
         all_prop_buttons[i].className = 'button vprop inactive';
      }
      document.getElementById('button_Vprop_'+x).className = 'button vprop active';
   }
   update_plots();
   var all_prop_buttons =  document.getElementsByClassName("button prop");
   var N = all_prop_buttons.length;
   for (var i = 0; i < N; i++) {
      all_prop_buttons[i].className = 'button prop inactive';
   }
   document.getElementById('button_Sprop_'+x).className = 'button prop active';
}

function change_Vprop(x) {
   console.log('change_Vprop--');
   Vprop = x;
   console.log('Sprop:'+Sprop);
   console.log('Vprop:'+Vprop);
   update_plots();
   var all_vprop_buttons =  document.getElementsByClassName("button vprop");
   console.log(all_vprop_buttons);
   var N = all_vprop_buttons.length;
   for (var i = 0; i < N; i++) {
      all_vprop_buttons[i].className = 'button vprop inactive';
   }
   document.getElementById('button_Vprop_'+x).className = 'button vprop active';

   console.log('--change_Vprop');
}


function zoom(x) {
   Zoom = x;
   console.log(x);
   update_plots()
}

function change_sounding(x) {
   current_sounding = x;
   console.log(path+'/'+hour+'00_sounding_'+current_sounding+'.png');
   document.getElementById('sounding_img').src = path+'/'+hour+'00_sounding_'+current_sounding+'.png';
}


function toggleVisibility(ids) {
   var ids_length = ids.length;
   for (var i = 0; i < ids_length; i++) {
      var id = ids[i];
      console.log(id);
      var element = document.getElementById(id);
      console.log('Chaning visibility of: '+id);
      if (element.style.visibility=="visible") {
         console.log(element.style.visibility);
         element.style.visibility="hidden";
      }
      else {
         console.log(element.style.visibility);
         element.style.visibility="visible";
      }
   }
}


// ------------ Slider ------------
function set_opacity(x,layers) {
   var layersLength = layers.length;
   for (var i = 0; i < layersLength; i++) {
      document.getElementById(layers[i]).style.opacity = x/100;
   }
   // replot_scalar(Sprop);
}
