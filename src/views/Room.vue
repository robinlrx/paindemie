<template>
	<div class="room">
		<transition name="fade">
			<!-- Key-changing to force re-renders of a component -->
			<Scene @buttonSend="buttonName" v-bind:etape="etapes[currentEtape]" v-on:objectClicked="handleShowChoices" :key="currentEtape" />
		</transition>
		<Objet v-bind:etape="etapes[currentEtape]" :key="currentEtape"/>
		<div class="life">
			<Jauge v-bind:score="score" v-on:onPenality="handlePenality"/>
			<Timer :key="currentEtape" v-on:onPenality="handlePenality"/>
		</div>
		<transition name="fade">
		<Choices v-show="showChoices"  v-bind:numChoice="numChoice" v-bind:etape="etapes[currentEtape]" v-on:onClick="handleUpdateEtape"  />
		</transition>
	</div>
</template>

<script>
// @ is an alias to /src
import data from '../assets/data/data.json'
import router from '../router/index'

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
			currentEtape: 0,
			score: 100,
			numButton: null,
			numChoice: null
		}
	},
	methods: {
		// Appel cette méthode quand tu fais un choix dans choices
		handleShowChoices () {
			this.showChoices = !this.showChoices
		},
		handleUpdateEtape () {
			this.handleShowChoices() // unShow choices

			if (this.currentEtape === 8) {
				alert('fin')
			} else {
				this.currentEtape += 1
				console.log('currentEtape:', this.currentEtape)
			}
		},
		handlePenality (penality) {
			this.score += penality
			console.log('testpenality', this.score, penality)

			if (this.score <= 0) {
				router.push('loose')
			}
		},
		buttonName (val) {
			this.numButton = val
			// console.log(val)

			for (const item in this.etapes[this.currentEtape]) {
				console.log(item)
       			if (item === this.numButton) {
           			this.numChoice = item
					console.log(this.numChoice)
				}
    		}
		}
	},
	components: {
		Scene,
		Choices,
		Objet,
		Jauge,
		Timer
	},
	mounted () {

	}
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
