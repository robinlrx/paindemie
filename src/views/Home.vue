<template>
	<section class="home">
		<Loader v-show="show"/>

		<div class="papi">
			<img src="assets/img/papi.png" alt="">
		</div>
		<div class="txt-container">
			<div class="txt">
				<h1>PA<span>[I]</span>NDEMIE</h1>
				<h2>Eh papi c'est quoi une pandémie !?</h2>
				<Button v-bind:link="'room'" v-bind:size=1 v-bind:type=1>Lancer le jeu</Button>
			</div>
		</div>

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
			const assetsImages = ['assets/img/bg-choix.jpg',
				'assets/img/fleurs.png',
				'assets/img/gel-dop.png',
				'assets/img/gel.png',
				'assets/img/info.png',
				'assets/img/papi.png',
				'assets/img/room.jpg']

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
	background-color: $dark-green;
	display: flex;
	// justify-content: center;
	// align-items: center;
	// border: solid yellow;

	.papi {
		width: 50%;
		// border: solid red;
		align-self: flex-end;

		img {
			width: 70%;
		}
	}

	.txt-container {
		width: 50%;
		// border: solid blue;
		margin: auto;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}

.txt {
	text-align: right;
	// border: solid yellow;
	width: max-content;

	h1 {
		font-family: $chelsea-font;
		font-size: 6rem;
		margin: 0;
		color: $white;
		span {
			color: $yellow;
		}
	}

	h2 {
		font-family: $chantal-font;
		font-weight: 300;
		font-style: normal;
		color: white;
		font-size: 1.6rem;
		margin-top: 0;
		margin-bottom: 50px;
	}
}
</style>
