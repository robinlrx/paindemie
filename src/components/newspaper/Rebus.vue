<template>
	<section class="rebus-container">
		<transition name="fade">
			<SecondPageTuto v-if="counter === 0 && showSecondTutoNewspaper" :showSecondTutoNewspaper.sync="showSecondTutoNewspaper" :timerPause.sync="timerPause" />
		</transition>
		<div class="small-cloud-container">
			<div class="rebus-txt">
				<p><span>{{ rebusData[dataId].text.span1 }}</span>-<span>{{ rebusData[dataId].text.span2 }}</span><template v-if="rebusValue != 'quarantaine'">-</template><span v-if="rebusValue != 'quarantaine'">{{ rebusData[dataId].text.span3 }}</span> ?</p>
				<img :src="`${this.publicPath}${this.rebusData[dataId].rebus}`" alt="">
			</div>
		</div>
		<div class="big-cloud-container">
			<transition name="fade">
				<h3 v-if="showError">Justifie-toi correctement fréro !</h3>
			</transition>
		</div>
		<textarea placeholder=". . ." />
		<Button @click.native="checkRebus()" :size=3 :type=1 class="button" ref="button" :link="''">C'EST GOOD</Button>
	</section>
</template>

<script>
import Button from '@/components/ui/AppButton.vue'
import SecondPageTuto from '@/components/newspaper/SecondPageTuto.vue'
import router from '../../router/index'
import { gsap, Power3 } from 'gsap'
export default {
	name: 'Rebus',
	data () {
		return {
			textarea: document.getElementsByTagName('textarea'),
			publicPath: process.env.BASE_URL, // to access to public folder
			dataId: 1,
			showSecondTutoNewspaper: false,
			showError: false,
			counter: this.$props.buttonCounter,
			rebusData: [
				{
					text: {
						span1: 'quar',
						span2: 'antaine'
					},
					rebus: 'assets/img/rebus/rebus1.png'
				},
				{
					text: {
						span1: 'pé',
						span2: 'nu',
						span3: 'rie'
					},
					rebus: 'assets/img/rebus/rebus2.png'
				},
				{
					text: {
						span1: 'a',
						span2: 'tte',
						span3: 'station'
					},
					rebus: 'assets/img/rebus/rebus3.png'
				}
			]
		}
	},
	props: {
		showRebus: Boolean,
		rebusValue: String,
		buttonCounter: Number,
		timerPause: Boolean
	},
	components: {
		Button,
		SecondPageTuto
	},
	methods: {
		handleShowError () {
			this.textarea[0].style.color = '#FF4465'
			this.showError = true
			setTimeout(() => {
				this.textarea[0].style.color = '#27123C'
				this.showError = false
			}, 2500)
		},
		checkRebus () {
			if (this.dataId === 0) {
				if (this.textarea[0].value.toLowerCase().includes('car' && 'antenne')) {
					this.textarea[0].style.color = 'rgb(42, 104, 100)'
					setTimeout(() => {
						this.check()
					}, 1000)
				} else {
					this.handleShowError()
				}
			} else if (this.dataId === 1) {
				if (this.textarea[0].value.toLowerCase().includes('pet' && 'nu' && 'riz')) {
					this.textarea[0].style.color = 'rgb(42, 104, 100)'
					setTimeout(() => {
						this.check()
					}, 1000)
				} else {
					this.handleShowError()
				}
			} else if (this.dataId === 2) {
				if (this.textarea[0].value.toLowerCase().includes('a' && 'thé' && 'station')) {
					this.textarea[0].style.color = 'rgb(42, 104, 100)'
					setTimeout(() => {
						this.check()
					}, 1000)
				} else {
					this.handleShowError()
				}
			}
		},
		check () {
			this.counter += 1
			this.$emit('update:buttonCounter', this.counter)

			if (this.counter === 3) {
				router.push('win')
			}
			this.reverseApparition()
			setTimeout(() => {
				this.$emit('update:showRebus', false)
			}, 3000)
		},
		apparition () {
			const cloudTL = gsap.timeline({ defaults: { duration: 1, ease: Power3.easeInOut } })
			cloudTL.fromTo('.small-cloud-container', { scaleY: 0.5, scaleX: 0.8, opacity: 0 }, { scaleY: 1, scaleX: 1, opacity: 1 })
			cloudTL.addLabel('SYNC')
			cloudTL.fromTo('.big-cloud-container', { scaleY: 0.5, scaleX: 0.8, opacity: 0 }, { scaleY: 1, scaleX: 1, opacity: 1 }, 'SYNC')
			cloudTL.fromTo(this.textarea, { scaleY: 0.5, scaleX: 0.8, opacity: 0 }, { scaleY: 1, scaleX: 1, opacity: 1 }, 'SYNC')
			cloudTL.to(this.$refs.button.$el, { opacity: 1 })
		},
		reverseApparition () {
			const cloudReverseTL = gsap.timeline({ defaults: { duration: 1, ease: Power3.easeInOut } })
			cloudReverseTL.to(this.$refs.button.$el, { opacity: 0 })
			cloudReverseTL.addLabel('SYNC')
			cloudReverseTL.to('.big-cloud-container', { scaleY: 0.0, scaleX: 0.0, opacity: 0 }, 'SYNC')
			cloudReverseTL.to(this.textarea, { scaleY: 0.0, scaleX: 0.0, opacity: 0 }, 'SYNC')
			cloudReverseTL.to('.small-cloud-container', { scaleY: 0, scaleX: 0, opacity: 0 })
		},
		soundQuestionLeo () {
			return `${this.publicPath}assets/audios/leo-rebus/rebus-question-leo-${this.dataId + 1}.mp3`
		}
	},
	mounted () {
		setTimeout(() => {
			this.showSecondTutoNewspaper = true
		}, 3000)

		switch (this.rebusValue) {
		case 'quarantaine':
			this.dataId = 0
			break

		case 'pénurie':
			this.dataId = 1
			break

		case 'attestation':
			this.dataId = 2
			break
		}

		const questionLeo = new Audio(this.soundQuestionLeo())
		questionLeo.play()

		this.apparition()
	},
	watch: {
		timerPause (newValue) {
			this.$emit('update:timerPause', newValue)
		}
	}

}
</script>

<style lang='scss' scoped>
@import '@/assets/scss/_variables.scss';

.rebus-container {
	width: 100%;
	height: 100vh;
	background-image: none;
	position: absolute;
}

.big-cloud-container, .small-cloud-container {
	width: 100%;
	height: 100vh;
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
}

.small-cloud-container {
	background-image: url('../../../public/assets/img/rebus/rebus-smallcloud.png');
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	z-index: 2;
	justify-content: flex-start;
	align-items: center;

	.rebus-txt {
		margin-left: 18%;

		img {
			width: 200px;
		}

		p {
			font-family: $chantal-font;
			color: $violet;
			font-size: 2rem;

			span {
				text-decoration: underline;
			}
		}
	}
}

.big-cloud-container {
	background-image: url('../../../public/assets/img/rebus/rebus-bigcloud.png');
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	justify-content: center;
	align-items: center;

	h3 {
		font-family: $chantal-font;
		color: red;
		font-size: 1rem;
		letter-spacing: 2px;
		margin-left: 40%;
		margin-top: 30%;
	}
}

textarea {
	font-family: $chelsea-font;
	font-size: 1.5rem;
	letter-spacing: 2px;
	position: absolute;
	left: 45%;
	top: 30%;
	z-index: 2;
	border: none;
	background-color: transparent;
	width: 50%;
	height: 40%;
	resize: none;

	&:focus {
		outline: none;
	}
}

.button {
	position: absolute;
	z-index: 2;
	right: 20px;
	bottom: 10px;
	opacity: 0;
}

@media (min-width: 1600px) {

	.small-cloud-container {
		.rebus-txt {
			img {
				width: 300px;
			}
		}
	}
}

</style>
