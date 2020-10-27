<template>
<div class="home">
	<v-container>
		<div v-if="provincias.length == 0" align="center"  style="margin-top:30vh">
		    <v-progress-circular :size="70" :width="7" color="primary" indeterminate ></v-progress-circular> <br>
		    <span>Cargando Provincias y Localidades</span>
		</div>
		<div v-if="provincias.length > 0">
			<v-row>
				<v-col xs12 sm6 offset-sm3 cols="12" align="center">
						<h4 class="primary--text">Organizar encuentro</h4>
				</v-col>
			</v-row>
			 <v-row>
				<v-col xs12>
					<!-- <v-form> -->
						<v-row>
							<v-col xs12 sm6 offset-sm3>
								<v-select :items="provincias" label="Provincia" v-model="provincia">
								</v-select>
							</v-col>
							<v-col xs12 sm6 offset-sm3  align="center">
		    					<v-progress-circular :width="3" color="primary" indeterminate  v-if="provincia.length > 0 && localidades.length == 0" ></v-progress-circular>
								<v-select :items="localidades" label="Localidad" v-model="localidad" v-if="provincia.length == 0 || localidades.length > 0"></v-select>
							</v-col>
						</v-row>
						<v-row>
							<v-col xs12 sm6 offset-sm3>
								<v-text-field v-model="details" name="details" :counter="5" label="Comentarios" required ></v-text-field>
							</v-col>
						</v-row>
						<v-row>
							<v-col xs12 sm6 offset-sm3 cols="12" align="center">
								<v-date-picker v-model="date" :min="today" :show-current="true"></v-date-picker>
							</v-col>
							<v-col xs12 sm6 offset-sm3 cols="12" align="center">
								<v-time-picker v-model="time"  :landscape="width>550"></v-time-picker>
							</v-col>
						</v-row>
						<v-row>
							<v-col xs12 sm6 offset-sm3  align="center" >
								<v-btn type="submit"  v-if="!creating" @click="createMeet()" :disabled="!formValid" color="primary"class="mr-4">Crear encuentro</v-btn>
								<v-btn v-else>Creando...</v-btn>
							</v-col>
						</v-row>
				    <!-- </v-form> -->
				</v-col>
			</v-row>
		</div>
	</v-container>
</div>
</template>

<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength, email, sameAs } from "vuelidate/lib/validators";
import moment from 'moment'
import { API_URL } from '../rutaApi'

export default {
	data() {
		return {
			provincia:'',
			localidad:'',
			details:'',
			imageURL:'',
			date:'',
			time:'',
			lat:'',
			lng:'',
			provincias: [],
			localidades: [],
			clima: {},
			today: '',
        	width:  window.innerWidth,
        	creating: false
		}
	},
	computed: {
		//obtengo las localidades de la api publica de acuerdo a la provincia elegida
		formValid() {
			return this.provincia !== '' && this.localidad !== '' && this.details !== '' && this.time !== '' &&  this.date !== ''
		}
	},
	watch: {
		provincia: {
			//api para obtener localidades de acuerdo a la pronvica
			handler(val){
				axios.get('https://ws.smn.gob.ar/map_items/weather')
				.then((response)=>{
					//filtro las localidades de la provincia elegida
					this.localidades = response.data.filter(task => task.province == val)
					//solo el campo nombre necesito
					this.localidades = this.localidades.map(a => a.name);
				})
				.catch((error) => {
					console.log(error)
				})
			},
		},
		localidad: {
			//api para obtener el clima de acerdo a la localidad
			handler(val){
				axios.get('https://ws.smn.gob.ar/map_items/weather')
				.then((response)=>{
					//filtro las localidades de la provincia elegida
					let climaAPI = response.data.filter(task => task.name == val)
					this.clima =  {
						'humedad' : climaAPI[0].weather.humidity,
						'temperatura' : climaAPI[0].weather.tempDesc,
						'descripcion' : climaAPI[0].weather.description,
						'vientoVel' : climaAPI[0].weather.wind_speed,
						'vientoDir' : climaAPI[0].weather.wing_deg,
					}
					this.lat = climaAPI[0].lat 
					this.lng = climaAPI[0].lon 
					console.log(climaAPI[0])
				})
				.catch((error) => {
					console.log(error)
				})
			},
		}
	},
	mounted() {
	// /*control de sesion*/ localStorage.getItem('user') != null ? null : this.$router.push('/signin') 
			//obtengo las provincias de la api publica
			axios.get('https://ws.smn.gob.ar/map_items/weather')
			.then((response)=>{
				let prov = response.data.map(a => a.province);
				//elimino las repetidas
				this.provincias = prov.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
			})
			.catch((error) => {
				console.log(error)
			})

			this.today =  moment().format('YYYY-MM-DD')	
	},
	methods: {
		createMeet() {
			if (this.formValid) {
				this.creating = true
				const meetUp =  {
					date : moment(this.date).format('DD/MM/YYYY'),
					time : this.time,
					details : this.details,
					localidad : this.localidad,
					provincia : this.provincia,
					src : '',
					clima : this.clima,
					lat : this.lat,
					lng : this.lng,
					isLoaded : false
				}
				//set it store.js
				this.createMeetupInAPI(meetUp)
			}
		},
		createMeetupInAPI (meetUp) {
			 axios.post(API_URL + '/encuentros', meetUp)
			.then((data)=>{
				this.creating = false
				this.$router.push('/')
			})
			.catch((error) => {
				this.creating = false
				console.log(error)
			})

	    },
	}
}
</script>
