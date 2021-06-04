<template>
	<div class="choices">

		<SecondTuto v-if="currentEtape == 0" :showSecondTuto.sync="showSecondTuto"/>

		<Papi :showPapi.sync="showPapi" class="papi" v-bind:numChoice="numChoice"/>

		<!-- image principale -->
		<img class="objet" ref="object" :src="this.numChoice.objet.url" alt="" :style="{width : `${this.numChoice.objet.width}%`, zIndex: this.numChoice.objet.zIndex}">
		<!-- image secondaire -->
		<img v-if="this.numChoice.objet.url2" class="objet" ref="object2" :src="this.numChoice.objet.url2" alt="" :style="{width : `${this.numChoice.objet.width}%`, zIndex: this.numChoice.objet.zIndex}">

		<button @mouseenter="objectAnimationLeft" @mouseout="objectAnimationReverse" @mouseover="cloudLeft = true, choiceOne= true" @mouseleave="cloudLeft = false, choiceOne= false"></button>

		<button @mouseenter="objectAnimationRight" @mouseout="objectAnimationReverse" @mouseover="cloudRight = true, choiceTwo= true" @mouseleave="cloudRight = false, choiceTwo= false" v-on:click="$emit('onClick')"></button>

		<img class="cloud" :class="{ cloudLeft: cloudLeft, cloudRight: cloudRight }" src="assets/img/nuage.gif" alt="">

		<transition name="fade">
		<img class="choixUn" v-if="choiceOne" :src="this.numChoice.btnUn.url" alt="">
		</transition>

		<transition name="fade">
		<img class="choixDeux" v-if="choiceTwo"  :src="this.numChoice.btnDeux.url" alt="">
		</transition>
	</div>
</template>

<script>
import SecondTuto from '@/components/SecondTuto.vue'
import Papi from '@/components/Papi.vue'
import { gsap, Power3 } from 'gsap'

export default {
	components: {
		Papi,
		SecondTuto
	},
	props: {
		numChoice: Object,
		currentEtape: Number
	},
	data () {
		return {
			cloudLeft: false,
			cloudRight: false,
			choiceOne: false,
			choiceTwo: false,
			showPapi: true,
			showSecondTuto: true
		}
	},
	mounted () {
		this.$emit('update:showPapi', true)
		// center elements whith gsap to avoid conflicts with tranfrom translate css
		gsap.set('.objet', { xPercent: -50, left: '50%', yPercent: -50, top: '50%', x: 0, y: 0 })
	},
	methods: {
		objectAnimationLeft () {
			const objectTL = gsap.timeline({ defaults: { duration: 1, ease: Power3.easeInOut } })
			objectTL.add('START')

			// image 1
			objectTL.to(this.$refs.object, {
				rotation: this.numChoice.objet.rotationLeft ? this.numChoice.objet.rotationLeft : null,
				x: this.numChoice.objet.xLeft ? this.numChoice.objet.xLeft : null,
				y: this.numChoice.objet.yLeft ? this.numChoice.objet.yLeft : null
			}, 'START')

			// image 2
			if (this.numChoice.objet.url2) {
				objectTL.to(this.$refs.object2, {
					rotation: this.numChoice.objet.rotationLeft2 ? this.numChoice.objet.rotationLeft2 : null,
					x: this.numChoice.objet.xLeft2 ? this.numChoice.objet.xLeft2 : null,
					y: this.numChoice.objet.yLeft2 ? this.numChoice.objet.yLeft2 : null
				}, 'START')
			}
		},
		objectAnimationRight () {
			const objectTL = gsap.timeline({ defaults: { duration: 1, ease: Power3.easeInOut } })
			objectTL.add('START')

			// image 1
			objectTL.to(this.$refs.object, {
				rotation: this.numChoice.objet.rotationRight ? this.numChoice.objet.rotationRight : null,
				x: this.numChoice.objet.xRight ? this.numChoice.objet.xRight : null,
				y: this.numChoice.objet.yRight ? this.numChoice.objet.yRight : null
			}, 'START')

			// image 2
			if (this.numChoice.objet.url2) {
				objectTL.to(this.$refs.object2, {
					rotation: this.numChoice.objet.rotationRight2 ? this.numChoice.objet.rotationRight2 : null,
					x: this.numChoice.objet.xRight2 ? this.numChoice.objet.xRight2 : null,
					y: this.numChoice.objet.yRight2 ? this.numChoice.objet.yRight2 : null
				}, 'START')
			}
		},
		objectAnimationReverse () {
			const objectTlReverse = gsap.timeline({ defaults: { duration: 1, ease: Power3.easeInOut } })
			objectTlReverse.add('START')
			// image 1
			objectTlReverse.to(this.$refs.object, { rotation: 0 }, 'START')
			if (this.numChoice.objet.yRight || this.numChoice.objet.yLeft) objectTlReverse.to(this.$refs.object, { y: 0 }, 'START')
			if (this.numChoice.objet.xRight || this.numChoice.objet.xLeft) objectTlReverse.to(this.$refs.object, { x: 0 }, 'START')

			// image 2
			if (this.numChoice.objet.url2) objectTlReverse.to(this.$refs.object2, { rotation: 0, x: 0, y: 0 }, 'START')
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

	.choices {
		width: 100%;
		height: 100vh;
		display: flex;
		background-color: rgba(0, 0, 0, 0.6);

		.papi {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100vh;
			z-index: 3;
			cursor: default;
		}

		.objet {
			position: absolute;
			// top: 50%;
			// left: 50%;
			// animation-duration: 3s;
			// animation-name: zoom;
			// animation-fill-mode: forwards;
		}

		button {
			position: relative;
			margin: auto;
			width: 50%;
			height: 100%;
			padding: 0;
			border: none;
			background: transparent;
			z-index: 2;
			cursor: pointer;

			&:focus {
				outline: none;
			}
		}

			.choixUn, .choixDeux {
				position: absolute;
				height: 100vh;
				width: 100%;
				top:0;
				left: 0;
				z-index: 1;
			}

			.cloud {
				position: absolute;
				width: 100%;
				height: 100vh;
				top:0;
				left: 0;
				z-index: 0;
				opacity: 0;
				transition: all 1s ease;
			}
	}

	@keyframes zoom {
		0% {
			width: 0;
		}

		80% {
			width: 200px;
		}
		100% {
			width: 150px;
		}
	}

	.active {
		display: flex !important;
	}

	.cloudLeft {
		transform: translate(-45%, 0%) !important;
		opacity: 1 !important;
		transition: all 1.5s ease !important;;
		animation-fill-mode: forwards;
	}

	.cloudRight {
		transform: translate(45%, 0%) !important;
		opacity: 1 !important;
		transition: all 1.5s ease !important;;
		animation-fill-mode: forwards;
	}

	.fade-enter-active, .fade-leave-active {
		transition: opacity 1.5s;
	}
	.fade-enter, .fade-leave-to {
		opacity: 0;
	}
</style>
