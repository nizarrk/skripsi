// Import Vue
import Vue from 'vue';

// Import F7
import Framework7 from 'framework7/framework7.esm.bundle.js';

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import F7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import IconsStyles from './css/icons.css';
import AppStyles from './css/app.css';

// Import App Component
import App from './app.vue';

// Import Leaflet
import { Icon }  from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Import vue-jwt
import VueJWT from 'vuejs-jwt'
const options = {
  keyName: 'token' 
};
Vue.use(VueJWT, options);

// Axios Config
// import axios from 'axios';
// Vue.prototype.axios = axios;
// axios.defaults.baseURL = 'http://192.168.1.12:3000';
// axios.defaults.headers.common['authorization'] = localStorage.getItem('token');


// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});



// Init F7 Vue Plugin
Framework7.use(Framework7Vue)

// Init App
new Vue({
  el: '#app',
  template: '<app/>',

  // Register App Component
  components: {
    app: App
  }
});
