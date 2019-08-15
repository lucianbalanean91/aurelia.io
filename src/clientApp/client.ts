import {inject} from "aurelia-dependency-injection";
import {ValidationController, ValidationRules, ValidationControllerFactory} from "aurelia-validation";
import * as L from 'leaflet';
import * as $ from 'jquery';

const markerIcon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  // specify the path here
  iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png"
});

@inject(ValidationControllerFactory)
export class Client {
  controller = null;
  name: string;
  lastName: string;
  Email: string;
  Street: string;
  phoneNumber: number;
  NrStreet: string;
  Block: string;
  Scale: string;



  constructor(controllerFactory) {
    this.controller = controllerFactory.createForCurrentScope();


    ValidationRules
      .ensure('name').required()
      .minLength(3)
      .withMessage('Name must at least be 3 chars long.')
      .ensure('lastName').required()
      .minLength(3)
      .withMessage('LastName must at least be 3 chars long.')
      .ensure('Email').required()
      .email()
      .withMessage('Email must contain @ , .')
      .ensure('phoneNumber').required()
      .minLength(10)
      .matches(new RegExp(/[0-9]/))
      .withMessage('The phone number can only contain digits')
      .ensure('Street').required()
      .ensure('NrStreet').required()
      .on(this);

  }

  submit() {
    var form = {
      name: this.name,
      lastName: this.lastName,
      Email: this.Email,
      Street: this.Street,
      phoneNumber: this.phoneNumber,
      NrStreet: this.NrStreet,
      Block: this.Block,
      Scale: this.Scale,
    };
    console.log(form);
  }


  attached() {
    var map;
    var location;
    var oras;
    $(document).ready(function () {
      initmap();
      // var e = $.ajax({
      //   url: "ex_calls/poststreetsautocomplete",
      //   type: "POST"
      // }).done(function (e) {
      //   $('input[name="txtStrada"]').autocomplete({source: e})
      // });
      // $("#txtStrada").change(function () {
      //   setMarker()
      // });
      // $("#txtNr").change(function () {
      //   setMarker()
      // });

    });

    function initmap() {
      map = new L.Map('map_id');
      let markers = new L.LayerGroup().addTo(map);
      map.scrollWheelZoom.disable();

      // create the tile layer with correct attribution
      var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
      var osm = new L.TileLayer(osmUrl, {minZoom: 12, maxZoom: 19, attribution: osmAttrib});

      let view = map.setView(new L.LatLng(47.182293, 23.053808), 15);
      console.log(view);
      map.addLayer(osm);


      var locationLayer = new L.LayerGroup().addTo(map);
      location = new L.marker([0, 0], {icon: markerIcon}).addTo(locationLayer);


      map.on('click', function (e) {
        reverseGeo(e.latlng.lat, e.latlng.lng, map);
      });

      if ($('input[id="lat"]').val() != 0) {
        reverseGeo($('input[id="lat"]').val(), $('input[id="lng"]').val(), map);
      } else if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (location) {
          reverseGeo(location.coords.latitude, location.coords.longitude, map);
        });
      }
    }

    function reverseGeo(lat, lng, map) {
      var newLatLng = new L.LatLng(lat, lng);
      location.setLatLng(newLatLng);

      document.getElementById('lat');
      document.getElementById('lng');
      // $('input[id="lat"]').val(lat);
      // $('input[id="lng"]').val(lng);

      map.setView(newLatLng, 15);

      $.get('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + lat + '&lon=' + lng, function (data) {
        //console.log(data)
        if (data.address.town)
          oras = data.address.town;
        if (data.address.village)
          oras = data.address.village;
        if (data.address.city)
          oras = data.address.city;
        if (data.address.residential)
          oras = data.address.residential;

         console.log('oras' + oras);


        if (data.address.road)
          $('input[name="txtStrada"]').val(data.address.road);
        if (data.address.house_number)
          $('input[name="txtNr"]').val(data.address.house_number);

      });
    }

    function setMarker() {
      console.log('setmarker');
      var strada = this.form.Street;
      var nr = this.form.NrStreet;
      $.get('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + strada + '&lon=' + nr, function (data) {
        // console.log('raspuns='+JSON.stringify(data));
        var newLatLng = new L.LatLng(data[0].lat, data[0].lon);
        location.setLatLng(newLatLng);
        $('input[id="lat"]').val(data[0].lat);
        $('input[id="lng"]').val(data[0].lon);
        map.setView(newLatLng, 15);
      });
    }

  }


}

//   attached() {
//     const map = L.map('mapid').setView([47.182293, 23.053808], 14);
//     let urlTemplate = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
//     map.addLayer(L.tileLayer(urlTemplate, {minZoom: 4}));
//
//
//     let theMarker = {};
//     let geocoding = {};
//     map.on('click', function (e) {
//       let lat = e.latlng.lat;
//       let lon = e.latlng.lng;
//       console.log("You clicked the map at LAT: " + lat + " and LONG: " + lon);
//       geocoding = $.get('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + lat + '&lon=' + lon, function (data) {
//         console.log(data.address.road);
//       });
//       //Clear existing marker,
//       if (theMarker != undefined) {
//         map.removeLayer(theMarker);
//       }
//       //Add a marker to show where you clicked.
//       theMarker = L.marker([lat, lon],
//         {
//           title: "Hover Text", // Add a title
//           icon: markerIcon
//         } // Adjust the opacity
//       )
//         .addTo(map);
//     });
//
//
//   }
//
// }
