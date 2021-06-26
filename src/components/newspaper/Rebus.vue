<template>
	<section class="rebus-container">
		<div class="small-cloud-container">
			<div class="rebus-txt">
				<p><span>{{ rebusData[dataId].text.span1 }}</span>-<span>{{ rebusData[dataId].text.span2 }}</span><template v-if="rebusValue != 'quarantaine'">-</template><span v-if="rebusValue != 'quarantaine'">{{ rebusData[dataId].text.span3 }}</span> ?</p>
				<img :src="`${this.publicPath}${this.rebusData[dataId].rebus}`" alt="">
			</div>
		</div>
		<div class="big-cloud-container"></div>
		<textarea placeholder=". . ." />
		<Button @click.native="checkRebus()" :size=3 :type=1 class="button" ref="button" :link="''">C'EST GOOD</Button>
	</section>
</template>

<script>
// import AppInput from '@/components/ui/AppInput.vue'
import Button from '@/components/ui/AppButton.vue'
import { gsap, Power3 } from 'gsap'
export default {
	name: 'Rebus',
	data () {
		return {
			textarea: document.getElementsByTagName('textarea'),
			publicPath: process.env.BASE_URL, // to access to public folder
			dataId: 1,
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
		rebusValue: String
	},
	components: {
		Button
		// AppInput
	},
	methods: {
		checkRebus () {
			if (this.dataId === 0) {
				console.log(this.textarea)
				if (this.textarea[0].value.toLowerCase().includes('car' && 'antenne')) {
					this.textarea[0].style.color = 'rgb(42, 104, 100)'
					setTimeout(() => {
						this.$emit('update:showRebus', false)
					}, 1500)
				}
			} else if (this.dataId === 1) {
				console.log(this.textarea)
				if (this.textarea[0].value.toLowerCase().includes('pet' && 'nue' && 'riz')) {
					this.textarea[0].style.color = 'rgb(42, 104, 100)'
					setTimeout(() => {
						this.$emit('update:showRebus', false)
					}, 1500)
				}
			} else if (this.dataId === 2) {
				console.log(this.textarea)
				if (this.textarea[0].value.toLowerCase().includes('a' && 'thé' && 'station')) {
					this.textarea[0].style.color = 'rgb(42, 104, 100)'
					setTimeout(() => {
						this.$emit('update:showRebus', false)
					}, 1500)
				}
			}
		},
		check () {
			this.$emit('update:showRebus', false)
		},
		appatition () {
			const cloudTL = gsap.timeline({ defaults: { duration: 1, ease: Power3.easeInOut } })
			cloudTL.fromTo('.small-cloud-container', { scaleY: 0.5, scaleX: 0.8, opacity: 0 }, { scaleY: 1, scaleX: 1, opacity: 1 })
			cloudTL.addLabel('SYNC')
			cloudTL.fromTo('.big-cloud-container', { scaleY: 0.5, scaleX: 0.8, opacity: 0 }, { scaleY: 1, scaleX: 1, opacity: 1 }, 'SYNC')
			cloudTL.fromTo(this.textarea, { scaleY: 0.5, scaleX: 0.8, opacity: 0 }, { scaleY: 1, scaleX: 1, opacity: 1 }, 'SYNC')
			cloudTL.to(this.$refs.button.$el, { opacity: 1 })
		}
	},
	mounted () {
		console.log(this.rebusValue)
		console.log(this.rebusData)
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
		this.appatition()
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
