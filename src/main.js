import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from './filters/dateFilter'
import messagePlugin from './utils/message.plugin'

import loader from './components/app/loader'

import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/database';

import 'materialize-css/dist/js/materialize.min'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.filter('date',dateFilter)

Vue.component('loader',loader)


firebase.initializeApp({
  apiKey: "AIzaSyB176KIkvC4Hy-BAk_TwkeeU0MFDFUtaOo",
  authDomain: "vue-crm-61599.firebaseapp.com",
  projectId: "vue-crm-61599",
  storageBucket: "vue-crm-61599.appspot.com",
  messagingSenderId: "811514849117",
  appId: "1:811514849117:web:388eba60de207c2b746ab4",
  measurementId: "G-52MBMRE86D",
  databaseURL:'https://vue-crm-61599-default-rtdb.europe-west1.firebasedatabase.app'
})
let app;

firebase.auth().onAuthStateChanged(()=>{
  if(!app){
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
  
})


