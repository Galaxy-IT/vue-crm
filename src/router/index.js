import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'


Vue.use(VueRouter)

const routes = [
  {path:'/',
  name:'Home',
  meta:{layout:'main',auth:true},
  component:() => import('../views/Home.vue')
  
},
{
  path:'/login',
  name:'login',
  meta:{layout:'empty'},
  component:()=> import('../views/login.vue')
},
{
  path:'/register',
  name:'register',
  meta:{layout:'empty'},
  component:()=> import('../views/register.vue')
},
{
  path:'/categories',
  name:'categories',
  meta:{layout:'main',auth:true},
  component:()=> import('../views/categories.vue')
},
{
  path:'/detail-record',
  name:'detail-record',
  meta:{layout:'main',auth:true},
  component:()=> import('../views/detail-record.vue')
},
{
  path:'/history',
  name:'history',
  meta:{layout:'main',auth:true},
  component:()=> import('../views/history.vue')
},
{
  path:'/planning',
  name:'planning',
  meta:{layout:'main',auth:true},
  component:()=> import('../views/planning.vue')
},
{
  path:'/profile',
  name:'profile',
  meta:{layout:'main',auth:true},
  component:()=> import('../views/profile.vue')
},
{
  path:'/record',
  name:'record',
  meta:{layout:'main',auth:true},
  component:()=> import('../views/record.vue')
},
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
const currentUser = firebase.auth().currentUser
const requireAuth = to.matched.some(record =>record.meta.auth)
  if(requireAuth && !currentUser){
    next('/login?message=login')
  }else{
    next()
  }
})

export default router
