<template>
	<div class="room">
		<Lottie  v-if="currentEtape !== 0" :key="currentEtape" />

		<Motion v-if="currentEtape !== 0" :src="videoSrc()" :etape="etapes[currentEtape]" :key="currentEtape" :timerPause.sync="timerPause" :showNextComposant.sync="showSecondMotion"/>

		<Motion v-if="currentEtape === 0 || showSecondMotion" :src="etapes[currentEtape].motion" :etape="etapes[currentEtape]" :key="currentEtape" :timerPause.sync="timerPause" :showNextComposant.sync="showTuto" />

		<FirstTuto v-if="currentEtape == 0 && showTuto" :showTuto.sync="showTuto" :timerPause.sync="timerPause"/>

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

		<Oups :showOups.sync="showOups" :score="score" :etape="etapes[currentEtape]" :key="currentEtape" :timerPause.sync="timerPause" />
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
		Lottie
	},
	data () {
		return {
			showChoices: false,
			etapes: data.content,
			currentEtape: 0,
			score: 100,
			numButton: null,
			numChoice: null,
			showOups: false,
			showTuto: false,
			showSecondMotion: false,
			timerPause: false,
			btnName: null,
			myScore: null
		}
	},
	methods: {
		// Appel cette méthode quand tu fais un choix dans choices
		handleShowChoices () {
			this.showChoices = !this.showChoices
		},
		handleUpdateEtape (data) {
			this.handleShowChoices() // unShow choices

			// SCORE
			const myScoreString = localStorage.getItem('myScore') // JSON string

			const selectedChoice = this.btnName
			let myChoice = selectedChoice.match(/\d/g)
			myChoice = Number(myChoice.join(''))

			this.myScore = JSON.parse(myScoreString) // objet JS

			if (this.myScore === null) {
				this.myScore = []
			}
			this.myScore.push({ choice: myChoice, answer: data.answer })

			localStorage.setItem('myScore', JSON.stringify(this.myScore))

			// laisser curentEtape à 3 pour avoir la bonne video au début de l'étape 4

			if (this.currentEtape === 3) {
				console.log('S`active à CURRENT ETAPE 4')
				if (this.myScore[0].choice === 1 && this.myScore[0].answer === 1 && this.myScore[3].choice === 1 && this.myScore[3].answer === 1) { // au clic sur le choix 1 du médoc si on a cliqué sur le choix 1 de la bière
					console.log('medoc')
					this.numChoice.btn1.motionChoice = 'assets/videos/test.mp4'
					console.log(this.numChoice.btn1.motionChoice)
					this.score += 5
					console.log(this.score)
				} else if (this.myScore[1].choice === 1 && this.myScore[1].answer === 1 && this.myScore[3].choice === 2 && this.myScore[3].answer === 2) { // au clic sur le choix 2 du gel si on a cliqué sur le choix 1 du coude
					console.log('gel')
					this.numChoice.btn2.motionChoice = 'assets/videos/test.mp4'
					this.score -= 5
					console.log(this.score)
				}
			}

			if (this.currentEtape === 4) {
				console.log('S`active à CURRENT ETAPE 5')
				if (this.myScore[0].choice === 1 && this.myScore[0].answer === 2 && this.myScore[4].choice === 1 && this.myScore[4].answer === 2) { // au clic sur le choix 2 de la tirelire si on a cliqué sur le choix 2 de la bière
					console.log('tirelire')
					this.numChoice.btn2.motionChoice = 'assets/videos/test.mp4'
					this.score -= 5
					console.log(this.score)
				}
			}

			if (this.currentEtape === 6) {
				console.log('S`active à CURRENT ETAPE 7')
				if (this.myScore[5].choice === 1 && this.myScore[6].choice === 1 && this.myScore[6].answer === 2) { // au clic sur le choix 2 de la porte si on a cliqué sur la cocotte
					console.log('tirelire')
					this.numChoice.btn2.motionChoice = 'assets/videos/test.mp4'
					this.score += 5
					console.log(this.score)
				}
			}

			if (this.currentEtape === 7) {
				console.log('S`active avant le journal ?')
				if (this.myScore[1].choice === 2 && this.myScore[7].choice === 1 && this.myScore[7].answer === 1) { // au clic sur le choix 1 du coton tige si on a cliqué sur le cafard
					console.log('coton tige')
					this.numChoice.btn1.motionChoice = 'assets/videos/test.mp4'
					this.score += 5
					console.log(this.score)
				} else if ((this.myScore[5].choice === 1 || (this.myScore[6].choice === 1 && this.myScore[6].choice === 2)) && this.myScore[7].choice === 1 && this.myScore[7].answer === 2) { // au clic sur le choix 2 du coton tige si on a cliqué sur cocotte ou porte choix 2
					console.log('cocotte ou porte : coton tige')
					this.numChoice.btn2.motionChoice = 'assets/videos/test.mp4'
					this.score -= 5
					console.log(this.score)
				}
			}

			console.log(this.myScore)

			if (this.currentEtape === 7) {
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
			this.btnName = btnName
			this.numChoice = content[btnName]
			console.log(content)
		},
		videoSrc () {
			if (this.myScore[this.currentEtape - 1].answer === 1) {
				return this.numChoice.btn1.motionChoice
			} else {
				return this.numChoice.btn2.motionChoice
			}
		}
	},
	mounted () {
		localStorage.removeItem('myScore')
	},
	destroyed () {
		document.location.reload()
		console.log('destroyed')
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
