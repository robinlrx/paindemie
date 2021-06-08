<template>
	<transition name="fade">
		<section class="intro">
			<Loader v-show="showLoader"/>

			<div class="container">
				<video ref="intro" width="250">
					<source src="assets/videos/motion.mp4" type="video/mp4">
				</video>
				<div class="play-container" ref="playContainer">
					<div class="content">
						<Button :link="''" :size=4 :type=1 class="button" ref="button" @click.native="playVid()">▶</Button>
						<h2>LANCE LA VIDEO !</h2>
						<p>(C'est un ordre !)</p>
					</div>
				</div>
			</div>
		</section>
	</transition>
</template>

<script>
import Loader from '@/components/Loader.vue'
import Button from '@/components/Button.vue'
import * as load from 'load-asset'
import router from '../router/index'

export default {
	name: 'Intro',
	data () {
		return {
			showLoader: true
		}
	},
	components: {
		Loader,
		Button
	},
	mounted () {
		this.render()
	},
	methods: {
		async render () {
		// Load a list of named assets in parallel
			const assetsImages = [
				// img global
				'assets/img/carton-home.png',
				'assets/img/fond-home.png',
				'assets/img/objets-home.png',
				'assets/img/pq-home.png',
				'assets/img/masque-home.png',
				'assets/img/gel-home.png',
				'assets/img/perso_content.png',
				'assets/img/perso_reflechit.png',
				'assets/img/perso_venere.png',
				'assets/img/oups-point.png',
				'assets/img/fond-jauge.png',
				'assets/img/fond-title.png',
				// room
				'assets/img/room/room360.jpg',
				'assets/img/room/room0.jpg',
				'assets/img/room/room1.jpg',
				'assets/img/room/room2.jpg',
				'assets/img/room/room3.jpg',
				'assets/img/room/room4.jpg',
				'assets/img/room/room7.jpg',
				'assets/img/room/room8.jpg',
				// objets
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
				'assets/img/objets/tele.png',
				'assets/img/objets/thermometre.png',
				'assets/img/objets/tirelire.png'
			]

			const assetsVideos = ['assets/videos/motion.mp4']

			const itemsImages = await load.all(assetsImages)
			console.log(itemsImages)
			const itemsVideos = await load.all(assetsVideos)
			console.log(itemsVideos)

			this.showLoader = false
		},
		playVid () {
			const intro = this.$refs.intro
			const playContainer = this.$refs.playContainer
			intro.play()
			playContainer.style.display = 'none'
			intro.onended = () => {
				router.push('home')
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.intro {
	width: 100vw;
	height: 100vh;
	background: transparent;
}

.container {
	position: relative;
	width: 100vw;
	height: 100vh;
}
video {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	margin: auto;
	width: 100%;
	height: auto;
}

.play-container {
	width: 350px;
	height: 300px;
	background-color: #FBF3E8;
	position: absolute;
	bottom: -105px;
	left: -10px;
	transform: rotate(-30deg);

	&::before {
		content: "";
		position: absolute;
		width: 100%;
		height: 100%;
		top: 26px;
		left: 15px;
		right: 0;
		bottom: 0;
		background: transparent;
		box-shadow: 10px 10px 0px $red;
		transform: rotate(-90deg);
	}

	.content {
		position: absolute;
		bottom: 100px;
		left: 60px;
		transform: rotate(30deg);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-family: $chantal-font;
		color: $red;

		.button {
			position: relative;
			left: 30%;
		}

		h2 {
			margin-bottom: 0;
			margin-top: 5px;
		}

		p{
			margin-top: 0;
		}
	}
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
