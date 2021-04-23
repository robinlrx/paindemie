<template>
	<section class="home">
		<Loader v-show="show"/>

		<h1>PA<span>[I]</span>NDEMIE</h1>
		<img src="../../public/assets/img/objets-home.png" alt="">
		<Button v-bind:link="'room'" v-bind:size=1 v-bind:type=1 class="button">C'EST PARTIE POUR LES EMMERDES</Button>

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
				'assets/img/gel.png',
				'assets/img/papi.png',
				'assets/img/bg-home.png',
				'assets/img/fond-home.png',
				'assets/img/objets-home.png',
				'assets/img/room/room360.jpg',
				'assets/img/room/room0.jpg',
				'assets/img/room/room1.jpg',
				'assets/img/room/room2.jpg',
				'assets/img/room/room3.jpg',
				'assets/img/room/room4.jpg',
				'assets/img/room/room7.jpg',
				'assets/img/room/room8.jpg',
				'assets/img/objets/biere.png',
				'assets/img/objets/brosse-a-dents.png',
				'assets/img/objets/cafard.png',
				'assets/img/objets/carton.png',
				'assets/img/objets/cocotte.png',
				'assets/img/objets/cocotte-vitre.png',
				'assets/img/objets/coton-tige.png',
				'assets/img/objets/coude.png',
				'assets/img/objets/fleurs.png',
				'assets/img/objets/gel-dop.png',
				'assets/img/objets/guitare.png',
				'assets/img/objets/hamac.png',
				'assets/img/objets/hamac-vitre.png',
				'assets/img/objets/info.png',
				'assets/img/objets/loupe.png',
				'assets/img/objets/masque-avion.png',
				'assets/img/objets/medicaments.png',
				'assets/img/objets/miel.png',
				'assets/img/objets/miel-vitre.png',
				'assets/img/objets/porte.png',
				'assets/img/objets/superman.png',
				'assets/img/objets/thermometre.png',
				'assets/img/objets/tirelire.png'
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
		position: relative;
		z-index: 2;
		span {
			color: $yellow;
		}
	}

	.button {
		position: absolute;
		right: 0;
		bottom: 5vh;
		right: 3vw;
	}

	img {
		position: absolute;
		width: 100%;
		height: 100vh;
		animation: fly 2s ease-in-out infinite;
	}
}

@keyframes fly { 0% {
	top: 30px;
}
50% {
	top: 0;
}
100% {
	top: 30px;
}
}
</style>
