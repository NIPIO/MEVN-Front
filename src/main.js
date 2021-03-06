import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VueGeoLocation from 'vue-browser-geolocation'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false
Vue.use(VueGeoLocation)
Vue.use(VueGoogleMaps, {
  load: {
	    key: 'AIzaSyCCGge0AcnsCP2THzX3LI7FIVHObEqYpAo',
	    libraries: 'places',
	},
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
  }

}).$mount('#app')
