<!-- main view that gathers the components useful to the project and the controls to update their states and data -->

<template>
	<div class="room">
		<Lottie  v-if="currentEtape !== 0" :key="currentEtape" />

		<Motion v-if="currentEtape !== 0" :src="videoSrc()" :etape="etapes[currentEtape]" :key="currentEtape" :timerPause.sync="timerPause" :showNextComposant.sync="showSecondMotion" @updateShowSecondMotion="updateShowSecondMotion"/> <!-- videoSrc() -->

		<transition name="fade">
			<Motion v-if="currentEtape === 0 || showSecondMotion" :src="etapes[currentEtape].motion" :etape="etapes[currentEtape]" :key="currentEtape" :timerPause.sync="timerPause" :showNextComposant.sync="showTuto" @endShowSecondMotion="endShowSecondMotion" />
		</transition>

		<transition name="fade">
			<div class="three-hundred-sixty" v-if="currentEtape === 0 && show360">
				<img src="assets/img/icons/360.gif" alt="">
			</div>
		</transition>

		<transition name="fade">
			<FirstTuto v-if="currentEtape == 0 && showTuto" :showTuto.sync="showTuto" :show360.sync="show360"  :timerPause.sync="timerPause"/>
		</transition>

		<transition name="fade">
			<!-- Key-changing to force re-renders of a component -->
			<Scene @buttonSend="getContentFromData" :etape="etapes[currentEtape]" @objectClicked="handleShowChoices" @onPenality="handlePenality" :key="currentEtape" :showOups.sync="showOups"/>
		</transition>

		<div class="life">
			<Jauge :score="score" @onPenality="handlePenality"/>
			<Timer :key="currentEtape" @onPenality="handlePenality" :timerPause.sync="timerPause" :showNewspaper="showNewspaper" />
		</div>

		<transition name="fade">
		<Choices v-if="showChoices" :numChoice="numChoice" :etape="etapes[currentEtape]" :currentEtape="currentEtape" @onClick="handleUpdateEtape" :timerPause.sync="timerPause" />
		</transition>

		<Oups :showOups.sync="showOups" :score="score" :etape="etapes[currentEtape]" :key="currentEtape" :timerPause.sync="timerPause" />
		<Newspaper v-if="showNewspaper" :myScore.sync="myScore" :numChoice="numChoice" :timerPause.sync="timerPause"/> <!--  v-if="showNewspaper" -->
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
			currentEtape: 0,
			score: 100,
			numButton: null,
			numChoice: null,
			showOups: false,
			showTuto: false,
			showSecondMotion: false,
			timerPause: false,
			btnName: null,
			myScore: null,
			showNewspaper: false,
			show360: false,
			publicPath: process.env.BASE_URL // to access to public folder
		}
	},
	methods: {
		soundPapi () {
			return `${this.publicPath}assets/audios/papi/papi-${this.currentEtape}.mp3`
		},
		endShowSecondMotion () {
			this.showSecondMotion = false

			if (this.currentEtape !== 0) {
				const audioPapi = new Audio(this.soundPapi())
				audioPapi.play()
			}
		},
		updateShowSecondMotion () {
			this.showSecondMotion = true
		},
		// call this method when you make a choice in choices
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

			this.myScore = JSON.parse(myScoreString) // JS object

			if (this.myScore === null) {
				this.myScore = []
			}
			this.myScore.push({ choice: myChoice, answer: data.answer })

			localStorage.setItem('myScore', JSON.stringify(this.myScore))

			if (this.currentEtape === 3) {
				if (this.myScore[0].choice === 1 && this.myScore[0].answer === 1 && this.myScore[3].choice === 1 && this.myScore[3].answer === 1) { // at the click on the choice 1 of the medoc if one clicked on the choice 1 of the beer
					console.log('medoc')
					this.numChoice.btn1.motionChoice = 'assets/videos/test.mp4'
					console.log(this.numChoice.btn1.motionChoice)
					this.score += 5
					console.log(this.score)
				} else if (this.myScore[1].choice === 1 && this.myScore[1].answer === 1 && this.myScore[3].choice === 2 && this.myScore[3].answer === 2) { // on clicking on choice 2 of the gel if choice 1 of the elbow was clicked
					console.log('gel')
					this.numChoice.btn2.motionChoice = 'assets/videos/choices/incoherences/choice-gel.mp4'
					this.score -= 5
					console.log(this.score)
				}
			}

			if (this.currentEtape === 4) {
				if (this.myScore[0].choice === 1 && this.myScore[0].answer === 2 && this.myScore[4].choice === 1 && this.myScore[4].answer === 2) { // on clicking on choice 2 of the piggy bank if you have clicked on choice 2 of the beer
					console.log('tirelire')
					this.numChoice.btn2.motionChoice = 'assets/videos/test.mp4'
					this.score -= 5
					console.log(this.score)
				}
			}

			if (this.currentEtape === 6) {
				if (this.myScore[5].choice === 1 && this.myScore[6].choice === 1 && this.myScore[6].answer === 2) { // at the click on the choice 2 of the door if you have clicked on the casserole
					console.log('tirelire')
					this.numChoice.btn2.motionChoice = 'assets/videos/choices/coherences/choice-porte.mp4'
					this.score += 5
					console.log(this.score)
				}
			}

			if (this.currentEtape === 7) {
				if (this.myScore[1].choice === 2 && this.myScore[7].choice === 1 && this.myScore[7].answer === 1) { // when clicking on choice 1 of the cotton swab if you clicked on the insect
					console.log('coton tige')
					this.numChoice.btn1.motionChoice = 'assets/videos/test.mp4'
					this.score += 5
					console.log(this.score)
				} else if ((this.myScore[5].choice === 1 || (this.myScore[6].choice === 1 && this.myScore[6].choice === 2)) && this.myScore[7].choice === 1 && this.myScore[7].answer === 2) { // at the click on the choice 2 of the cotton stem if one clicked on casserole or door choice 2
					console.log('cocotte ou porte : coton tige')
					this.numChoice.btn2.motionChoice = 'assets/videos/choices/incoherences/choice-cotontige.mp4'
					this.score -= 5
					console.log(this.score)
				}
			}

			console.log(this.myScore)

			if (this.currentEtape === 7) {
				this.showNewspaper = true
				this.score += 20
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
				console.log('No data found')
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

		const audioAmbiance = new Audio('assets/audios/ambiance-maison.mp3')
		audioAmbiance.play()
		audioAmbiance.loop = true
	},
	destroyed () {
		document.location.reload()
	},
	watch: {
		showTuto () {
			setTimeout(() => {
				this.show360 = false
			}, 2000)
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
	z-index: 2;
	display: flex;
	flex-direction: column-reverse;
	align-items: flex-end;
	justify-content: center;
	padding: 0px 60px 0px 40px;
}

.three-hundred-sixty {
	width: 100%;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.7);
	position: absolute;
	img {
		position: absolute;
		width: 400px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
}
</style>
