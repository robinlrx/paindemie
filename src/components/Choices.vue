<template>
	<div class="choices">
		<img class="objet" :class="{ activeOne: activeOne, activeTwo: activeTwo }" ref="objet" :src="this.etape.videoChoiceUn" alt="">
		<button @mouseover="activeOne = true" @mouseleave="activeOne = false">
			<transition name="fade">
			<img v-show="activeOne" src="assets/img/left-b.png" alt="">
			</transition>
		</button>

		<button @mouseover="activeTwo = true" @mouseleave="activeTwo = false" v-on:click="$emit('onClick')">
			<transition name="fade">
			<img v-show="activeTwo" src="assets/img/right-b.png" alt="">
			</transition>
		</button>
	</div>
</template>

<script>
export default {
	props: {
		etape: Object
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
			transform: translate(-50%, -50%);
			animation-duration: 3s;
			animation-name: zoom;
			animation-fill-mode: forwards;
		}

		button {
				position: relative;
				margin: auto;
				width: 50%;
				height: 100%;
				padding: 0;
				border: none;
				z-index: 1;
				background: transparent;

				&:focus {
					outline: none;
				}

				img {
					height: 100%;
					margin-left: -10%;
					cursor: pointer;
				}

				&:last-child {
					img {
						margin-left: -20%;
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
		transform: translate(-50%, -50%) rotate(-45deg) !important;
		transition: all 2s ease;
		animation-fill-mode: forwards;
	}

	.activeTwo {
		transform: translate(-50%, -50%) rotate(45deg) !important;
		transition: all 2s ease;
		animation-fill-mode: forwards;
	}

	.fade-enter-active, .fade-leave-active {
		transition: opacity 1.5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}
</style>
