<template>
	<div class="room">
		<!-- <Tutorial /> -->
		<transition name="fade">
			<!-- Key-changing to force re-renders of a component -->
			<Scene @buttonSend="getContentFromData" v-bind:etape="etapes[currentEtape]" v-on:objectClicked="handleShowChoices" :key="currentEtape" />
		</transition>
		<!-- <Objet v-bind:etape="etapes[currentEtape]" :key="currentEtape"/> -->
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
// import Objet from '@/components/Objet.vue'
import Choices from '@/components/Choices.vue'
import Jauge from '@/components/Jauge.vue'
import Timer from '@/components/Timer.vue'
// import Tutorial from '@/components/Tutorial.vue'

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
			// console.log('testpenality', this.score, penality)

			if (this.score <= 0) {
				router.push('loose')
			}
		},
		getContentFromData (btnName) {
			// Recuperer le contenu de data.json
			// correspondant au nom du btn cliqué
			// MDN doc: Array.map, Array.filter, Object.keys(), Object.values()
			// data.content === this.etapes === [{}, {}, {}]

			const content = this.etapes.filter(el => {
				// el === {id: 0, imageScene: "sdsdf", }
				return el.id === this.currentEtape
			})[0] // {id: 0, imageScene: "sdfdsf", ..., choice1: {...}, choice2: {...}}

			if (!content) {
				console.log('Pas trouvé de data correspondante')
				return
			}

			this.numChoice = content[btnName]
			console.log(this.numChoice)

			// ------------------------------------

			/*
			this.numButton = btnName
			// console.log(btnName)

			for (const item in this.etapes[this.currentEtape]) {
				console.log(item) // id, imageScreen, objet1, objet2, choice1

				if (item === btnName) {
					this.numChoice = item
					console.log(this.numChoice)
				}
			}
			*/
		}
	},
	components: {
		Scene,
		Choices,
		// Objet,
		Jauge,
		Timer
		// Tutorial
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
	right: 100px;
	top: 20px;
	height: 100px;
	background-image: url('/assets/img/fond-jauge.png');
	background-repeat: no-repeat;
	background-size: cover;
	z-index: 5;
	display: flex;
	flex-direction: column-reverse;
	align-items: flex-end;
	padding: 0px 60px 0px 40px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
