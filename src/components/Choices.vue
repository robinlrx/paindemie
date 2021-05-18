<template>
	<div class="choices">
		<img class="objet" :class="{ activeOne: activeOne, activeTwo: activeTwo }" ref="objet" :src="this.numChoice.objet" alt="">

		<button @mouseover="activeOne = true" @mouseleave="activeOne = false">
			<transition name="fade">
			<img v-show="activeOne" src="assets/img/nuage_gauche.gif" alt="">
			</transition>
		</button>

		<button @mouseover="activeTwo = true" @mouseleave="activeTwo = false" v-on:click="$emit('onClick')">
			<transition name="fade">
			<img v-show="activeTwo" src="assets/img/nuage_droit.gif" alt="">
			</transition>
		</button>
	</div>
</template>

<script>
export default {
	props: {
		// etape: Object,
		numChoice: Object
	},
	data () {
		return {
			activeOne: false,
			activeTwo: false
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

		.objet {
			position: absolute;
			top: 50%;
			left: 50%;
			z-index: 2;
			transform: translate(-50%, -50%);
			width: 100%;
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

				&:focus {
					outline: none;
				}

				img {
					height: 100%;
					margin-left: 0%;
					cursor: pointer;
				}

				&:last-child {
					img {
						margin-left: -65%;
					}
				}
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

	.activeOne {
		transform: translate(-50%, -50%) rotate(-70deg) !important;
		transition: all 2s ease;
		animation-fill-mode: forwards;
	}

	.activeTwo {
		transform: translate(-50%, -50%) rotate(70deg) !important;
		transition: all 2s ease;
		animation-fill-mode: forwards;
	}

	.fade-enter-active, .fade-leave-active {
		transition: opacity 1.5s;
	}
	.fade-enter, .fade-leave-to {
		opacity: 0;
	}
</style>
