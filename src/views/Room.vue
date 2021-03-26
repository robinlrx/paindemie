<template>
	<div class="room">
		<div v-for="etape in etapes" v-bind:key="etape.id">
			<transition name="fade">
			<Scene :etape="etape" />
			</transition>
			<Objet />
			<div>
			<Jauge/>
			<Timer/>
			</div>
			<Choices/>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import data from '../assets/data/data.json'

import Scene from '@/components/Scene.vue'
import Objet from '@/components/Objet.vue'
import Choices from '@/components/Choices.vue'
import Jauge from '@/components/Jauge.vue'
import Timer from '@/components/Timer.vue'

export default {
	data () {
		return {
			etapes: data
		}
	},
	components: {
		Scene,
		Choices,
		Objet,
		Jauge,
		Timer
	}
	// methods: {
	// console () {
	// console.log(this.etapes)
	// }
	// },
	// mounted () {
	// this.console()
	// }
}

</script>
<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

body{
	overflow-x: hidden;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
