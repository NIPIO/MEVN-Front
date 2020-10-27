<template>
	<v-container>
		<v-row wrap v-if="!loading" align="center">
			<v-col xs12>
			 <v-card class="mx-auto">
			    <v-img class="white--text align-end" height="200px" :src="meetDetail.src" >
			      <v-card-title>{{meetDetail.localidad}}</v-card-title>
			    </v-img>
			    <v-card-subtitle class="pb-0" >{{meetDetail.provincia}} </v-card-subtitle>
			    <v-card-subtitle class="pb-0" >{{meetDetail.date}} {{meetDetail.time}}</v-card-subtitle>
			    <v-card-text class="text--primary">
			      <div>{{meetDetail.details}}</div>
			    </v-card-text>
			    <v-divider class="mx-4"></v-divider>
				<v-row class="d-flex  justify-space-between" wrap>
					<v-col md="6" xs="12">
					    <v-card-title>Horario de encuentro ({{meetDetail.date}})</v-card-title>
					    <v-card-text> 
					    	<v-col align="center" cols="12">
					    	<v-time-picker v-model="meetDetail.time" :landscape="width>550" readonly ></v-time-picker>
					    </v-col>
				    	</v-card-text>
					</v-col>
			    	<v-col md="6" xs="12">
						<v-list-item two-line>
							<v-list-item-content>
								<v-list-item-title class="headline"></v-list-item-title>
							</v-list-item-content>
							</v-list-item>
							<v-card-text>
								<v-row>
									<v-col align="center" cols="12">
										<span>Cielo: {{meetDetail.clima.descripcion}}.<br> Humedad: {{meetDetail.clima.humedad}}%. Viento: {{meetDetail.clima.vientoVel}}km/h {{meetDetail.clima.vientoDir}}</span>
									</v-col>
								</v-row>
								<v-row>
									<v-col align="center" class="display-3" cols="12">{{meetDetail.clima.temperatura}}
									</v-col>
								</v-row>
							</v-card-text>
						</v-list-item>
					</v-col>
				</v-row>
				<v-row>
					<v-col align="center" class="display-3" cols="12">
						<Map :meetDetail="meetDetail"/>
					</v-col>
				</v-row>
			  </v-card>
			</v-col>
		</v-row>
	</v-container>
</template>		

<script>
import axios from "axios";
import Map from "../components/Map";
import { API_URL } from '../rutaApi'

export default {
    data() {
        return {
        	meetDetail: [],
        	meetPromise: null,
        	loading: true,
        	width:  window.innerWidth
        }
    },
    components: {
    	Map
    },
    watch: {
		meetDetail: {
			handler(val){
				this.loading = false
			}
		}
	},
	created() {
		this.meetPromise = axios.get(API_URL + '/encuentros/' +  this.$route.params.id)
	    	.then(res => {
				this.meetDetail = res.data
	    	})
	},
	async mounted() {
		/*control de sesion*/ localStorage.getItem('user') != null ? null : this.$router.push('/signin') 
		await this.meetPromise
  	},
}
</script>
