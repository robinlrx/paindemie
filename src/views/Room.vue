<template>
	<div class="room">
		<Lottie  v-if="currentEtape !== 0" :key="currentEtape" />
		<Motion :etape="etapes[currentEtape]" :key="currentEtape" :timerPause.sync="timerPause" />

		<FirstTuto :showTuto.sync="showTuto" :timerPause.sync="timerPause"/>

		<transition name="fade">
			<!-- Key-changing to force re-renders of a component -->
			<Scene @buttonSend="getContentFromData" :etape="etapes[currentEtape]" @objectClicked="handleShowChoices" @onPenality="handlePenality" :key="currentEtape" :showOups.sync="showOups"/>
		</transition>

		<div class="life">
			<Jauge :score="score" @onPenality="handlePenality"/>
			<Timer :key="currentEtape" @onPenality="handlePenality" :timerPause.sync="timerPause"/>
		</div>

		<transition name="fade">
		<Choices v-if="showChoices" :numChoice="numChoice" :etape="etapes[currentEtape]" :currentEtape="currentEtape" @onClick="handleUpdateEtape" :timerPause.sync="timerPause" />
		</transition>

		<Oups :showOups.sync="showOups" :score="score" :etape="etapes[currentEtape]" :key="currentEtape" :timerPause.sync="timerPause"/>

		<Newspaper :showNewspaper.sync="showNewspaper"/>
	</div>
</template>

<script>
import data from '../assets/data/data.json'
import router from '../router/index'

import Motion from '@/components/Motion.vue'
import Scene from '@/components/Scene.vue'
import Choices from '@/components/Choices.vue'
import Jauge from '@/components/Jauge.vue'
import Timer from '@/components/Timer.vue'
import Oups from '@/components/Oups.vue'
import FirstTuto from '@/components/FirstTuto.vue'
import Lottie from '@/components/Lottie.vue'
import Newspaper from '@/components/newspaper/Newspaper.vue'

export default {
	name: 'Room',
	components: {
		Scene,
		Choices,
		Jauge,
		Timer,
		Oups,
		Motion,
		FirstTuto,
		Lottie,
		Newspaper
	},
	data () {
		return {
			showChoices: false,
			etapes: data.content,
			currentEtape: 8,
			score: 100,
			numButton: null,
			numChoice: null,
			showOups: false,
			showTuto: true,
			timerPause: false,
			showNewspaper: false
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
				this.showNewspaper = true
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
	},
	watch: {
		timerPause (newValue) {
			console.log(newValue)
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
	background-image: url('/assets/img/backgrounds/background-jauge.png');
	background-repeat: no-repeat;
	background-size: cover;
	z-index: 5;
	display: flex;
	flex-direction: column-reverse;
	align-items: flex-end;
	padding: 0px 60px 0px 40px;
}
</style>
