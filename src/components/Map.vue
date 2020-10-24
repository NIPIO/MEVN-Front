<template>
	<div >
		<GmapMap
		  :center="{lat: parsedobj.lat, lng: parsedobj.lng}"
		  :zoom="11"
		  map-type-id="terrain"
		  style="width: 85vw; height: 300px"
		>
		</GmapMap>
	</div>
</template>
<script>
	export default {
  		data: () => ({
  			parsedobj : {}
		}),
		props: ['meetDetail'],
		mounted() {
			this.parsedobj = JSON.parse(JSON.stringify(this.meetDetail))
			this.parsedobj = {
				lat: parseFloat(this.parsedobj.lat),
				lng: parseFloat(this.parsedobj.lng)
			}
		}
	}
</script>