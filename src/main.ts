import {Aurelia} from 'aurelia-framework'
import environment from './environment';
import {PLATFORM} from 'aurelia-pal';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import 'leaflet/dist/leaflet.js';
import 'leaflet/dist/leaflet.css';


export function configure(aurelia: Aurelia) {

  // aurelia.use
  //   .plugin(PLATFORM.moduleName('aurelia-google-maps'), config => {
  //     config.options({
  //       apiKey: 'myapiKey', // use `false` to disable the key
  //       apiLibraries: 'drawing,geometry', //get optional libraries like drawing, geometry, ... - comma seperated list
  //       options: { panControl: true, panControlOptions: { position: 9 } }, //add google.maps.MapOptions on construct (https://developers.google.com/maps/documentation/javascript/3.exp/reference#MapOptions)
  //       // language:'' | 'en', // default: uses browser configuration (recommended). Set this parameter to set another language (https://developers.google.com/maps/documentation/javascript/localization)
  //       // region: '' | 'US' ,// default: it applies a default bias for application behavior towards the United States. (https://developers.google.com/maps/documentation/javascript/localization)
  //       markerCluster: {
  //         enable: false,
  //         src: 'https://cdn.rawgit.com/googlemaps/v3-utility-library/99a385c1/markerclusterer/src/markerclusterer.js', // self-hosting this file is highly recommended. (https://developers.google.com/maps/documentation/javascript/marker-clustering)
  //         imagePath: 'https://cdn.rawgit.com/googlemaps/v3-utility-library/tree/master/markerclusterer/images/m', // the base URL where the images representing the clusters will be found. The full URL will be: `{imagePath}{[1-5]}`.`{imageExtension}` e.g. `foo/1.png`. Self-hosting these images is highly recommended. (https://developers.google.com/maps/documentation/javascript/marker-clustering)
  //         imageExtension: 'png',
  //       }
  //     });
  //   })



  aurelia.use
    .plugin(PLATFORM.moduleName('aurelia-google-maps'), config => {
      config.options({
        apiKey: 'myapiKey',
        apiLibraries: 'drawing,geometry', //get optional libraries like drawing, geometry, ... - comma seperated list
        options: { panControl: true, panControlOptions: { position: 9 } } //add google.maps.MapOptions on construct (https://developers.google.com/maps/documentation/javascript/3.exp/reference#MapOptions)
      });
    });

  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName('aurelia-validation'))
    .developmentLogging();



  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'));

  aurelia.use
    .plugin(PLATFORM.moduleName('aurelia-plugins-dropdown'));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
