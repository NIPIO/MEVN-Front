<template>
      <v-dialog v-model="show" justify="center">
        <v-form @submit.prevent="signUp">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat >
              <v-toolbar-title>Loguearse con Vuelidate</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <span>Source</span>
              </v-tooltip>
            </v-toolbar>
            <v-card-text>
                <v-text-field
                    v-model="name"
                    :error-messages="nameErrors"
                    label="Nombre"
                    required
                    @input="$v.name.$touch()"
                    @blur="$v.name.$touch()"
                    prepend-icon="mdi-mail"
                />
                <v-text-field
                    v-model="email"
                    :error-messages="emailErrors"
                    label="Email"
                    required
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                    prepend-icon="mdi-mail"
                />

                <v-text-field
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    :error-messages="passwordErrors"
                    label="Contraseña"
                    required
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                    prepend-icon="mdi-lock"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                />
                <v-text-field
                    v-model="confirmPassword"
                    :type="showPassword ? 'text' : 'password'"
                    :error-messages="confirmPasswordErrors"
                    label="Contraseña"
                    required
                    @input="$v.confirmPassword.$touch()"
                    @blur="$v.confirmPassword.$touch()"
                    prepend-icon="mdi-lock"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                />
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
                <v-btn type="submit" color="primary" :disabled="!formValid">
                  <v-progress-circular indeterminate color="white" v-if="loading"></v-progress-circular>
                  <span  v-if="!loading">Entrar</span>
                </v-btn>
            </v-card-actions>

          </v-card>
        </v-form>
      <div class="text-center ma-2">
        <v-snackbar v-model="snackbar" :color="colorSnack" timeout="2000" >{{ text }}
        </v-snackbar>
      </div>
      </v-dialog>
</template>

<script>
import * as firebase from 'firebase'
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength, email, sameAs } from "vuelidate/lib/validators";
import { mapMutations } from "vuex";
import axios from "axios";
import App from '../App'
import { API_URL } from '../rutaApi'

  export default {
      name: 'Singup',
      mixins: [validationMixin],
      validations: {
        //required, minLenght, y demás, son configuraciones de vue que se pueden ver dentro de  console.log(this.$v.name) objeto y se puede validar desde ahí. 
        name: { required, minLength: minLength(4), maxLength: maxLength(10) },
        email: { required, email },
        password: { required, minLength: minLength(6) },
        confirmPassword: { required, sameAsPassword: sameAs("password") }
      },
      props: {
        value: false
      },
      components: {
        App
      },
      data() {
        return {
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          status: null,
          showPassword: false,
          snackbar: false,
          loading:false,
          text: '',
          colorSnack: ''
        };
      },
      methods: {
        ...mapMutations(['saveUserLogged']),
        async signUp() {
          this.loading = true
          axios.get(API_URL + '/users/signUp', {params :  { 'name': this.name, 'email' : this.email , 'password' : this.password }} )
            .then(response=>{
              this.loading = false
              this.text = response.data.mensaje
              this.snackbar = true;
              this.colorSnack = response.data.color
              if (!response.data.existeUsuario) {
                this.saveUserLogged({'name': this.name, 'mail' : this.email, 'password': this.password}) 
                this.$router.push('/') 
                this.$root.$emit('logueoCorrecto', 'true'); //cambio variable del AppVue
              }
            })
        },
      },
      computed: {
        show: {
          get () {
            return this.value
          },
          set (value) {
             this.$emit('input', value)
          }
        },
        formValid() {
          return this.name !== '' && this.email !== '' &&  this.password !== '' &&  this.confirmPassword !== ''  && !this.$v.$anyError
        },
        nameErrors() {
          console.log(this.$v.name)
          const errors = [];
          if (!this.$v.name.$dirty) return errors; 
          !this.$v.name.minLength && errors.push("Nombre debe tener por lo menos 4 caracteres.");
          !this.$v.name.maxLength && errors.push("Nombre debe tener por lo menos 10 caracteres.");
          !this.$v.name.required && errors.push("Name es necesario.");
          return errors;
        },
        emailErrors() {
          const errors = [];
          if (!this.$v.email.$dirty) return errors; 
          !this.$v.email.email && errors.push("Email debe tener @");
          !this.$v.email.required && errors.push("Email es necesario.");
          return errors;
        }, 
        passwordErrors() {
          const errors = [];
          if (!this.$v.password.$dirty) return errors; 
          !this.$v.password.minLength && errors.push("Password debe tener por lo menos 6 caracteres");
          !this.$v.password.required && errors.push("Password es necesario.");
          return errors;
        },
        confirmPasswordErrors() {
          const errors = [];
          if (!this.$v.confirmPassword.$dirty) return errors; 
          !this.$v.confirmPassword.sameAsPassword && errors.push("ConfirmPassword debe ser igual a la Password");
          !this.$v.confirmPassword.required && errors.push("ConfirmPassword es necesario.");
          return errors;
        }, 
      },
  }
</script>