<style>
a {
    text-decoration: none;
}
</style>

<template>
  <v-app id="inspire">    
    <v-main>
      <v-container fluid>
        <!-- MENU DE NAVEGACION HAMBURGUESA -->
        <v-navigation-drawer v-if="estaLogueado" app v-model="abrirMenu" app class="d-flex d-sm-none">
          <v-list>
            <v-list-item v-for="(item, index) in menuItems" >
              <v-toolbar-items>
                <router-link :to="{ path : '/' + item.route, beforeEnter: (to, from, next) => { window.location.href = to.fullPath.substring(1); } }">
                  <v-btn text>
                    <v-icon>{{item.icon}}</v-icon>
                    {{item.title}}
                  </v-btn>
                </router-link>
              </v-toolbar-items>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <!-- FIN  MENU DE NAVEGACION HAMBURGUESA -->
        <v-app-bar app dark class="primary" >
          <v-app-bar-nav-icon @click.stop="abrirMenu = !abrirMenu" class="d-flex d-sm-none"></v-app-bar-nav-icon>
              <router-link to="/"><v-btn text>Encuentros</v-btn></router-link>
            <v-spacer></v-spacer>
            <v-toolbar-items  class="d-none d-sm-flex">
              <v-list-item v-if="estaLogueado"   v-for="(item, index) in menuItems" >
                  <router-link :to="{ path : '/' + item.route, beforeEnter: (to, from, next) => { window.location.href = to.fullPath.substring(1); } }">
                    <v-btn text @click="closeSession(item.title)" >
                      <v-icon>{{item.icon}}</v-icon>
                      <span class="d-none d-md-flex" >{{item.title}}</span>
                    </v-btn>
                  </router-link>
              </v-list-item>
            </v-toolbar-items>
        </v-app-bar>
        <router-view></router-view>
        </v-container>
    </v-main>  
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: 'App',
  data: () => ({
    abrirMenu: false,
    menuItems: [
      { route: 'encuentros',  icon: 'supervisor_account', title: 'Encuentros'},
      { route: 'crearEncuentro',  icon: 'room', title: 'Nuevo'},
      { route: '', icon: 'cancel', title: 'Sesion'},
    ],
    // estaLogueado: Boolean
    estaLogueado: true  //POR AHORA LO HACEMOS SIN LOGUIN

  }),
  mounted() {
    // localStorage.getItem('user') != null ? null : this.estaLogueado = false
    this.$root.$on('logueoCorrecto', text => this.estaLogueado = text) //text viene del componente Signin
  },
  methods: {
    closeSession(title) {
      if(title == 'Sesion') {
        // alert('Esta funcion está desactivada')
        localStorage.removeItem('user') 
        // this.estaLogueado = false
        this.$router.push('/signin')
      }
    }
  }
};
</script>
