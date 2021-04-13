<template>
	<div class="room">
		<transition name="fade">
			<!-- Key-changing to force re-renders of a component -->
			<Scene v-bind:etape="etapes[currentEtape]" v-on:objectClicked="handleShowChoices" :key="currentEtape" />
		</transition>
		<Objet v-bind:etape="etapes[currentEtape]" :key="currentEtape"/>
		<div class="life">
			<Jauge/>
			<Timer :key="currentEtape"/>
		</div>
		<Choices v-show="showChoices" v-bind:etape="etapes[currentEtape]" v-on:onClick="handleUpdateEtape"  />
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
			showChoices: false,
			etapes: data.content,
			currentEtape: 4
		}
	},
	methods: {
		// Appel cette méthode quand tu fais un choix dans choices
		handleShowChoices () {
			this.showChoices = !this.showChoices
		},
		handleUpdateEtape () {
			console.log('slt')
			this.handleShowChoices() // unShow choices

			if (this.currentEtape === 8) {
				alert('fin')
			} else {
				this.currentEtape += 1
				console.log('currentEtape:', this.currentEtape)
			}
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

.life {
	position: absolute;
	right: 10px;
	top: 20px;
	z-index: 2;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
