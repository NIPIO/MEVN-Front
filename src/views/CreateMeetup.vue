<template>
<div class="home">
	<v-container>
		<v-row>
			<v-col xs12 sm6 offset-sm3>
				<h4 class="primary--text">Organizar encuentro</h4>
			</v-col>
		</v-row>
		 <v-row>
			<v-col xs12>
				<!-- <v-form> -->
					<v-row>
						<v-col xs12 sm6 offset-sm3>
							<v-select :items="provincias" label="Provincia" v-model="provincia"></v-select>
						</v-col>
						<v-col xs12 sm6 offset-sm3>
							<v-select :items="localidades" label="Localidad" v-model="localidad"></v-select>
						</v-col>
					</v-row>
					<v-row>
						<v-col xs12 sm6 offset-sm3>
							<v-text-field v-model="details" name="details" :counter="5" label="Details" required ></v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col xs12 sm6 offset-sm3>
							<v-text-field v-model="imageURL" name="image" :counter="5" label="Image URL" required ></v-text-field>
							<img :src="imageURL" alt="" height="250" class="ms-auto">
						</v-col>
					</v-row>
					<v-row>
						<v-col xs12 sm6 offset-sm3>
							<v-date-picker v-model="date" :show-current="true"></v-date-picker>
						</v-col>
						<v-col xs12 sm6 offset-sm3>
							<v-time-picker v-model="time"></v-time-picker>
						</v-col>
					</v-row>
					<v-row>
						<v-col xs12 sm6 offset-sm3>
							<v-btn type="submit"  @click="createMeet()" :disabled="!formValid" color="primary" class="mr-4">Crear encuentro</v-btn>
						</v-col>
					</v-row>
			    <!-- </v-form> -->
			</v-col>
		</v-row>
	</v-container>
</div>
</template>

<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength, email, sameAs } from "vuelidate/lib/validators";
import moment from 'moment'

export default {
	data() {
		return {
			provincia:'',
			localidad:'',
			details:'',
			imageURL:'',
			date:'',
			time:'',
			provincias: [],
			localidades: [],
			clima: {},
		}
	},
	computed: {
		//obtengo las localidades de la api publica de acuerdo a la provincia elegida
		formValid() {
			return this.provincia !== '' && this.localidad !== '' && this.details !== '' &&  this.imageURL !== '' && this.time !== '' &&  this.date !== ''
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
				})
				.catch((error) => {
					console.log(error)
				})
			},
		}
	},
	mounted() {
	/*control de sesion*/ localStorage.getItem('user') != null ? null : this.$router.push('/signin') 

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
	
	},
	methods: {
		createMeet() {
			if (this.formValid) {
				const meetUp =  {
					date : moment(this.date).format('DD/MM/YYYY'),
					time : this.time,
					details : this.details,
					localidad : this.localidad,
					provincia : this.provincia,
					src : this.imageURL,
					clima : this.clima
				}
				//set it store.js
				this.createMeetupInAPI(meetUp)
				this.$router.push('/')
			}
		},
		createMeetupInAPI (meetUp) {
			axios.post('http://localhost:3000/encuentros', meetUp)
			.then((data)=>{
				console.log(data)
			})
			.catch((error) => {
				console.log(error)
			})
	    }
	}
}
</script>
