import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import utils from './utils/utils'

// this part resolve an issue where the markers would not appear
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

Vue.prototype.$http = axios;
Vue.prototype.$utils = utils;
Vue.prototype.$leaflet = L;

new Vue({
  render: h => h(App),
}).$mount('#app')
