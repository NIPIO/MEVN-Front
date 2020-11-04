<template>
	<div class="about">
		<v-container>
		    <v-row  wrap class=" text-center">
		    	<v-col xs12 sm6 class="text-sm-right">
		    		<v-btn large :disabled="meetUps.length==0" class="primary" router to="/encuentros">Ver encuentros</v-btn>
		    	</v-col>
		    	<v-col xs12 sm6 class=" text-sm-left">
		    		<v-btn large class="primary" router to="/crearEncuentro">Nuevo encuentro</v-btn>
		    	</v-col> 
		    </v-row>
		    <v-row v-if="meetUps.length>0">
		    	<v-col xs12>
					<v-carousel style="cursor:pointer">
						<v-carousel-item v-for="(item,i) in meetUps" :key="item.id" :src="item.src" reverse-transition="fade-transition" @click="goToMeetup(item._id)" transition="fade-transition">
							<div class="title">
								<h3>Encuentro en {{item.localidad}}</h3>
							</div>
						</v-carousel-item>
					</v-carousel>
		    	</v-col>
		    </v-row>
		</v-container>
	</div>
</template>
<style>
	.title {
		position:  absolute;
		width: 100%;
		bottom:  50px;
		color:  white;
		font-size:  2em;
		text-align: center
	}
	.title h3 {
		padding: 20px;
		background-color: rgba(0,0,0,0.5);
	}
</style>
<script>
import axios from "axios";
import { API_URL } from '../rutaApi'

export default {

	data: () => ({
		logueado: Boolean,
		meetUps:[]
	}),
	methods: {
		goToMeetup(idMeet) {
			this.$router.push('/encuentro/' + idMeet)
		},
	},
	mounted() {
	// /*control de sesion*/ 
		localStorage.getItem('user') != null ? null : this.$router.push('/signin')
		axios.get(API_URL + '/encuentros')
		.then(res =>this.meetUps = res.data)
	}
}
</script>
