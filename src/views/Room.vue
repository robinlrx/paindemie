<template>
	<div class="room">
		<!-- <Motion v-bind:etape="etapes[currentEtape]" :key="currentEtape" /> -->
		<!-- <Tutorial /> -->

		<transition name="fade">
			<!-- Key-changing to force re-renders of a component -->
			<Scene @buttonSend="getContentFromData" v-bind:etape="etapes[currentEtape]" @objectClicked="handleShowChoices" @onPenality="handlePenality" :key="currentEtape" :showOups.sync="showOups"/>
		</transition>

		<div class="life">
			<Jauge v-bind:score="score" v-on:onPenality="handlePenality"/>
			<Timer :key="currentEtape" v-on:onPenality="handlePenality"/>
		</div>

		<transition name="fade">
		<Choices v-show="showChoices" v-bind:numChoice="numChoice" v-bind:etape="etapes[currentEtape]" v-on:onClick="handleUpdateEtape" />
		</transition>

		<Oups :showOups.sync="showOups" v-bind:score="score" v-bind:etape="etapes[currentEtape]" :key="currentEtape"/>
	</div>
</template>

<script>
import data from '../assets/data/data.json'
import router from '../router/index'

// import Motion from '@/components/Motion.vue'
import Scene from '@/components/Scene.vue'
import Choices from '@/components/Choices.vue'
import Jauge from '@/components/Jauge.vue'
import Timer from '@/components/Timer.vue'
import Oups from '@/components/Oups.vue'

export default {
	components: {
		Scene,
		Choices,
		Jauge,
		Timer,
		Oups
		// Motion
	},
	data () {
		return {
			showChoices: false,
			showPapi: false,
			etapes: data.content,
			currentEtape: 0,
			score: 100,
			numButton: null,
			numChoice: null,
			showOups: false
		}
	},
	methods: {
		// Appel cette méthode quand tu fais un choix dans choices
		handleShowChoices () {
			this.showChoices = !this.showChoices
		},
		handleShowPapi () {
			this.showPapi = !this.showPapi
		},
		handleUpdateEtape () {
			this.handleShowChoices() // unShow choices
			this.handleShowPapi() // unShow Papi
			console.log('papi')
			console.log(this.showPapi)

			if (this.currentEtape === 8) {
				alert('fin')
			} else {
				this.currentEtape += 1
				console.log('currentEtape:', this.currentEtape)
			}
		},
		handlePenality (penality) {
			this.score += penality

			if (this.score <= 0) {
				router.push('loose')
			}
		},
		getContentFromData (btnName) {
			const content = this.etapes.filter(el => {
				return el.id === this.currentEtape
			})[0]

			if (!content) {
				console.log('Pas trouvé de data correspondante')
				return
			}

			this.numChoice = content[btnName]
			console.log(this.numChoice)
		}
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
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
