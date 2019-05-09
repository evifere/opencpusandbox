import Vue from 'vue'
import VueRouter from 'vue-router'
import '../theme/index.css'
import '../theme/display.css'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/fr'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Highcharts from 'highcharts'
import highchartsMore from 'highcharts/highcharts-more'

highchartsMore(Highcharts)
import stockInit from 'highcharts/modules/stock'

stockInit(Highcharts)

import HighchartsVue from 'highcharts-vue'
import App from './App.vue'

import Dashboard from './components/Dashboard.vue'
import Login from './components/Login.vue'
import Todo from './components/Todo.vue'
import Simplepie from './components/Simplepie.vue'
import Simplehistogram from './components/Simplehisto.vue'
import Linechart from './components/Linechart.vue'
import Combochart from './components/Combochart.vue'
import DuallineColumn from './components/DuallineColumn.vue'


Vue.use(VueRouter)


const routes = [
  { path: '/', component: Dashboard },
  { path: '/dashboard', component: Dashboard },
  { path: '/login', component: Login },
  { path: '/todo', component: Todo },
  { path:'/pie-chart',component: Simplepie},
  { path:'/line-graphic',component: Simplehistogram},
  { path:'/line-chart',component: Linechart},
  { path:'/combo-chart',component: Combochart},
  { path:'/histogram',component: DuallineColumn},

  { path: '*', redirect: '/todo' }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for `routes: routes`
})


router.beforeEach((to, from, next) => {

  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('isConnected');

  if (authRequired && !loggedIn) {
    return next({ 
      path: '/login', 
      query: { returnUrl: to.path } 
    });
  }


next();
})

Vue.config.productionTip = false

Vue.use(Element,{locale});

Vue.prototype.$http = axios
Vue.use(VueAxios, axios)
Vue.use(HighchartsVue)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
