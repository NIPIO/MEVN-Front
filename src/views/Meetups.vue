<template>
	<v-container>
		<div v-if="eventosCargando" align="center" style="margin-top:30vh">
		    <v-progress-circular :size="70" :width="7" color="primary" indeterminate ></v-progress-circular> <br>
		    <span>Cargando Encuentros</span>
		<!--     <vue-content-loading :width="300" :height="100">
				<rect x="5" y="10" rx="4" ry="4" width="55" height="55" />
				<rect x="75" y="13" rx="4" ry="4" width="100" height="12" />
				<rect x="75" y="27" rx="4" ry="4" width="50" height="7" />
				<rect x="75" y="47" rx="4" ry="4" width="50" height="7" />
			</vue-content-loading> -->
		</div>
		<div v-else>
			<v-row wrap>
				<v-dialog v-model="showModal" persistent max-width="290" >
					<v-card>
						<v-card-title class="headline">
						Querés borrar este encuentro?
						</v-card-title>
						
						<v-card-text>Le vamos a avisar a la persona que la cita se canceló.</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="green darken-1" text @click="showModal = false">Mm, mejor no.</v-btn>
							<v-btn color="green darken-1" text @click="deleteMeetUp()">Dale</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
				<v-col xs12>
					<v-card class="primary">
						<v-container fluid>					
							<v-row v-for="(item,i) in meetUps" :key="item._id" :src="item.src">
								<v-col xs5>
									<v-card >
										<v-row class="d-flex" >
											<div class="col-sm-4" style="margin:-10px">
												<v-col align="center">
													<div v-show="!item.isLoaded">Buscando imagen...</div>
													<v-avatar class="ma-1" size="200" tile v-show="item.isLoaded">
														<img :src="item.src" @load="onImgLoad(item)"></v-img>
													</v-avatar>
												</v-col>
											</div>
											<div class="col-sm-8" >
												<div class="d-flex flex-no-wrap justify-space-between">
													<div>
														<v-card-title class="headline">{{item.localidad}} - {{item.provincia}} </v-card-title>
														<v-card-subtitle >{{item.date}} - {{item.time}}</v-card-subtitle>
														<v-card-subtitle >{{item.details}}</v-card-subtitle>
														<v-btn class="ma-2 " tile outlined color="primary" @click="goToMeetup(item._id)">
													      <v-icon left>arrow_forward</v-icon> Ver encuentro
													    </v-btn>
													    <v-btn class="ma-2" tile outlined color="red" @click="openModal(item._id)">
													      <v-icon >cancel</v-icon> Cancelar
													    </v-btn>
													</div>
												</div>
											</div>
										</v-row>
									</v-card>		
								</v-col>
							</v-row>
						</v-container>
					</v-card>
				</v-col>
			</v-row>
		</div>

	</v-container>
</template>

<script>
import axios from "axios";
import { API_URL } from '../rutaApi'
// import { VueContentLoading } from 'vue-content-loading';

export default {
    data() {
        return {
        	meetUps: [],
        	showModal: false,
        	itemMeet: '',
        	eventosCargando: true
        }
    },
	mounted() {
	// /*control de sesion*/ localStorage.getItem('user') != null ? null : this.$router.push('/signin')
		axios.get(API_URL + '/encuentros')
		.then(res =>{
			this.eventosCargando = false
			this.meetUps = res.data
		})
	},
	components: {
        // VueContentLoading,
    },
    methods: {
    	goToMeetup(idMeet) {
    		this.$router.push('/encuentro/' + idMeet)
    	},
		onImgLoad (item) {
			item.isLoaded = true
		},
    	deleteMeetUp() {
			axios.delete(API_URL + '/encuentros/' +  this.itemMeet)
			.then((data)=>{
				this.meetUps.splice(this.meetUps.findIndex(e => e.place ===  this.itemMeet),1);
			})
			.catch((error) => {
				console.log(error)
			})
	    	this.showModal = false
	    },
	    openModal(idMeet) {
	    	this.itemMeet = idMeet
	    	this.showModal = true
	    }
    },

 }
</script>


