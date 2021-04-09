<template>
	<div class="choices">
		<img :src="this.etape.videoChoiceUn" alt="">
		<div v-bind:class="{ active: isActive }">
			<button>{{this.etape.btnChoiceUn}}</button>
			<button v-on:click="$emit('onClick')">{{this.etape.btnChoiceDeux}}</button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		etape: Object
	},
	data () {
		return {
			isActive: false
		}
	},
	mounted () {
		this.showButtons()
	},
	methods: {
		showButtons () {
			setTimeout(() => {
				this.isActive = true
				// console.log('is active')
			}, 3000)
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

	.choices {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100vh;
		display: flex;
		animation-duration: 3s;
		animation-name: blackSail;
		animation-fill-mode: forwards;

		img {
			margin: auto;
			animation-duration: 3s;
			animation-name: zoom;
			animation-fill-mode: forwards;
		}

		div {
			position: absolute;
			width: 30%;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			display: none;

			button {
				margin: auto;
				cursor: pointer;
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
			transform: scale(0);
		}

		80% {
			transform: scale(2);
		}

		100% {
			transform: scale(1.7);
		}
	}

	.active {
		display: flex !important;
	}
</style>
