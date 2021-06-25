<template>
	<transition name="fade">
		<section class="intro">
			<Loader v-show="showLoader"/>

			<div class="container">
				<video ref="intro" width="250">
					<source src="assets/videos/motion.mp4" type="video/mp4">
				</video>
				<transition name="fade">
					<div class="play-container" ref="playContainer" v-if="showPlay">
						<div class="content">
							<div class="icons">
								<img src="assets/img/icons/son.png" alt="">
								<img src="assets/img/icons/casque.png" alt="">
							</div>
							<h2>Hop hop hop, pas si vite !</h2>
							<p>si tu veux kiffer le jeu, mets des écouteurs<br/>et active le son fréro !</p>
							<Button :link="''" :size=2 :type=1 class="button" ref="button" @click.native="playVid()">J'ai capté</Button>
						</div>
					</div>
				</transition>
			</div>
		</section>
	</transition>
</template>

<script>
import Loader from '@/components/Loader.vue'
import Button from '@/components/ui/AppButton.vue'
import * as load from 'load-asset'
import router from '../router/index'

export default {
	name: 'Intro',
	data () {
		return {
			showLoader: true,
			showPlay: true
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
				'assets/img/icons/son.png',
				'assets/img/icons/casque.png',
				'assets/img/carton-home.png',
				'assets/img/objets-home.png',
				'assets/img/pq-home.png',
				'assets/img/masque-home.png',
				'assets/img/gel-home.png',
				'assets/img/icons/perso_content.png',
				'assets/img/icons/perso_reflechit.png',
				'assets/img/icons/perso_venere.png',
				'assets/img/icons/oups-point.png',
				// backgrounds
				'assets/img/backgrounds/background-jauge.png',
				'assets/img/backgrounds/background-title.png',
				'assets/img/backgrounds/background-home.jpg',
				'assets/img/backgrounds/background-container-loose.png',
				'assets/img/backgrounds/background-loose.jpg',
				'assets/img/backgrounds/background-oups.png',
				// room
				'assets/img/room/room0.jpg',
				'assets/img/room/room1.jpg',
				'assets/img/room/room2.jpg',
				'assets/img/room/room3.jpg',
				'assets/img/room/room4.jpg',
				'assets/img/room/room5.jpg',
				'assets/img/room/room6.jpg',
				'assets/img/room/room7.jpg',
				// objets
				'assets/img/objets/biere.png',
				'assets/img/objets/brosse-a-dents.png',
				'assets/img/objets/cafard.png',
				'assets/img/objets/carton.png',
				'assets/img/objets/cocotte-vitre.png',
				'assets/img/objets/coton-tige.png',
				'assets/img/objets/coude.png',
				'assets/img/objets/fleurs.png',
				'assets/img/objets/gel-dop.png',
				'assets/img/objets/guitare.png',
				'assets/img/objets/hamac-vitre.png',
				'assets/img/objets/loupe.png',
				'assets/img/objets/masque-avion.png',
				'assets/img/objets/medicaments.png',
				'assets/img/objets/miel-vitre.png',
				'assets/img/objets/porte.png',
				'assets/img/objets/superman.png',
				'assets/img/objets/tirelire.png',
				// objets choix
				'assets/img/objets-choix/choix-biere.png',
				'assets/img/objets-choix/choix-brosse-a-dents.png',
				'assets/img/objets-choix/choix-cafard.png',
				'assets/img/objets-choix/choix-carton.png',
				'assets/img/objets-choix/choix-cocotte_bas.png',
				'assets/img/objets-choix/choix-cocotte_couvercle.png',
				'assets/img/objets-choix/choix-coton-tige.png',
				'assets/img/objets-choix/choix-coude.png',
				'assets/img/objets-choix/choix-gel_couvercle.png',
				'assets/img/objets-choix/choix-gel_pot.png',
				'assets/img/objets-choix/choix-hamac.png',
				'assets/img/objets-choix/choix-loupe.png',
				'assets/img/objets-choix/choix-medicament.png',
				'assets/img/objets-choix/choix-medicament-boite.png',
				'assets/img/objets-choix/choix-porte.png',
				'assets/img/objets-choix/choix-tirelire.png'
			]

			const assetsVideos = [
				'assets/videos/motion.mp4',
				'assets/videos/test.mp4',
				// oups
				// choices
				'assets/videos/choices/choice-cafard1.mp4',
				'assets/videos/choices/choice-coude2.mp4',
				'assets/videos/choices/choice-hamac1.mp4',
				'assets/videos/choices/choice-cocotte2.mp4',
				'assets/videos/choices/choice-porte2.mp4',
				'assets/videos/choices/choice-biere2.mp4',
				'assets/videos/choices/choice-biere1.mp4',
				'assets/videos/choices/choice-gel1.mp4',
				'assets/videos/choices/choice-coton2.mp4',
				'assets/videos/choices/choice-tirelire1.mp4'
			]

			const itemsImages = await load.all(assetsImages)
			console.log(itemsImages)
			const itemsVideos = await load.all(assetsVideos)
			console.log(itemsVideos)

			this.showLoader = false
		},
		playVid () {
			const intro = this.$refs.intro
			intro.play()
			this.showPlay = false
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
	width: 100%;
	height: 100vh;
	background-color: rgba(251, 243, 232, 0.7);
	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.content {
		font-family: $chantal-font;
		color: $red;

		h2, p {
			font-size: 1.5rem;
			letter-spacing: 5px;
		}

		p{
			margin-bottom: 80px;
		}
	}

	.icons img {
		width: 80px;
		margin: 10px;
	}
}

.slide-fade-enter-active {
	transition: all .3s ease;
}
.slide-fade-leave-active {
	transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to{
	transform: translateY(10px);
	opacity: 0;
}
</style>
