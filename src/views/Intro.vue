<template>
    <transition name="fade">
        <section class="intro">
            <Loader v-show="showLoader"/>

            <div class="container">
                <video ref="intro" autoplay width="250">
                    <source src="assets/videos/motion.mp4" type="video/mp4">
                </video>
            </div>
        </section>
    </transition>
</template>

<script>
import Loader from '@/components/Loader.vue'
import * as load from 'load-asset'
import router from '../router/index'

export default {
	name: 'Home',
	data () {
		return {
			showLoader: true
		}
	},
	components: {
		Loader
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
		closeIntro () {
			const intro = this.$refs.intro
			intro.onended = () => {
				router.push('home')
			}
		}
	},
	mounted () {
		this.render()
		this.closeIntro()
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
