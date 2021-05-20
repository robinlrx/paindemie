<template>
	<div class="choices">

		<Papi :showPapi.sync="showPapi" class="papi" v-bind:numChoice="numChoice"/>

		<img class="objet" :src="this.numChoice.objet" alt="">

		<button @mouseover="cloudLeft = true, choiceOne= true" @mouseleave="cloudLeft = false, choiceOne= false"></button>

		<button @mouseover="cloudRight = true, choiceTwo= true" @mouseleave="cloudRight = false, choiceTwo= false" v-on:click="$emit('onClick')"></button>

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
import Papi from '@/components/Papi.vue'

export default {
	components: {
		Papi
	},
	props: {
		numChoice: Object
	},
	data () {
		return {
			cloudLeft: false,
			cloudRight: false,
			choiceOne: false,
			choiceTwo: false,
			showPapi: true
		}
	},
	methods: {
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

	.choices {
		width: 100%;
		height: 100vh;
		display: flex;
		animation-duration: 3s;
		animation-name: blackSail;
		animation-fill-mode: forwards;

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
			top: 50%;
			left: 50%;
			z-index: 1;
			transform: translate(-50%, -50%);
			width: 100%;
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

	@keyframes blackSail {
		0% {
			background-color: rgba(0, 0, 0, 0);
		}

		100% {
			background-color: rgba(0, 0, 0, 0.6);
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
