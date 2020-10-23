import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Meetups from '../views/Meetups.vue'
import CreateMeetup from '../views/CreateMeetup.vue'
import MeetUpDetail from '../views/MeetUpDetail.vue'
import Signin from '../views/Signin.vue'
import Signup from '../views/Signup.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/encuentros',
    name: 'Meetups',
    component: Meetups
  },
  {
    path: '/encuentro/:id',
    name: 'MeetUpDetail',
    component: MeetUpDetail
  },
  {
    path: '/crearEncuentro',
    name: 'CreateMeetup',
    component: CreateMeetup
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
