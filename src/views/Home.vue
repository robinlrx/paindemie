<template>
	<section class="home">
		<Loader v-show="show"/>

		<h1>PA<span>[I]</span>NDEMIE</h1>
		<img src="../../public/assets/img/objets-home.png" alt="">
		<Button v-bind:link="'room'" v-bind:size=1 v-bind:type=1 class="button">[<span>C'EST PARTIE POUR LES EMMERDES</span>]</Button>

		<!-- <div class="txt-container">
			<div class="txt">
				<h1>PA<span>[I]</span>NDEMIE</h1>
				<Button v-bind:link="'room'" v-bind:size=1 v-bind:type=1>Lancer le jeu</Button>
			</div>
		</div> -->

	</section>
</template>

<script>
import Loader from '@/components/Loader.vue'
import Button from '@/components/Button.vue'
import * as load from 'load-asset'

export default {
	name: 'Home',
	data () {
		return {
			show: true
		}
	},
	components: {
		Loader,
		Button
	},
	methods: {
		async render () {
		// Load a list of named assets in parallel
			const assetsImages = [
				'assets/img/bg-choix.jpg',
				'assets/img/fleurs.png',
				'assets/img/gel-dop.png',
				'assets/img/gel.png',
				'assets/img/info.png',
				'assets/img/papi.png',
				'assets/img/room.jpg',
				'assets/img/bg-home.png',
				'assets/img/fond-home.png'
			]

			const itemsImages = await load.all(assetsImages)
			console.log(itemsImages)

			this.show = false
		}
	},
	mounted () {
		this.render()
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.home {
	width: 100%;
	height: 100vh;
	background-image: url('../../public/assets/img/bg-home.png'), url('../../public/assets/img/fond-home.png');
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	display: flex;
	flex-direction: column;
	// border: solid yellow;

	h1 {
		font-family: $chelsea-font;
		font-size: 6.5rem;
		margin: auto;
		color: $red;
		letter-spacing: 5px;
		span {
			color: $yellow;
		}
	}

	.button {
		position: absolute;
		right: 0;
		bottom: 5vh;
		right: 10vw;

		& span {
			color: $red;
		}
	}

	img {
		position: absolute;
		animation: fly 2s ease-in-out infinite;
	}
}

@keyframes fly { 0% {
	top: 50px;
}
50% {
	top: 0;
}
100% {
	top: 50px;
}
}
</style>
