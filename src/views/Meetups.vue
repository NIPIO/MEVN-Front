<template>
	<v-container>
		<div v-if="meetUps.length == 0" align="center">
		    <v-progress-circular :size="70" :width="7" color="primary" indeterminate ></v-progress-circular> <br>
		    <span>Cargando Encuentros</span>
		</div>
		<div v-if="meetUps.length > 0">
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
									<v-card class="d-flex" >
										<v-avatar class="ma-3" size="175" tile >
											<v-img :src="item.src"></v-img>
										</v-avatar>
										<div class="d-flex flex-no-wrap justify-space-between">
											<div>
												<v-card-title class="headline">{{item.localidad}} - {{item.provincia}} </v-card-title>
												<v-card-subtitle >{{item.date}} - {{item.time}}</v-card-subtitle>
												<v-card-subtitle >{{item.details}}</v-card-subtitle>
												<v-btn class="ma-2" tile outlined color="primary" @click="goToMeetup(item._id)">
											      <v-icon left>arrow_forward</v-icon> View Meetup
											    </v-btn>
											    <v-btn class="ma-2" tile outlined color="red" @click="openModal(item._id)">
											      <v-icon >delete</v-icon> Cancel
											    </v-btn>

											</div>
										</div>
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

export default {
    data() {
        return {
        	meetUps: [],
        	showModal: false,
        	itemMeet: ''
        }
    },
	mounted() {
	/*control de sesion*/ localStorage.getItem('user') != null ? null : this.$router.push('/signin')
		axios.get(API_URL + '/encuentros')
		.then(res =>this.meetUps = res.data)
	},
    methods: {
    	goToMeetup(idMeet) {
    		this.$router.push('/encuentro/' + idMeet)
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
