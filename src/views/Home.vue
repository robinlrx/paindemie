<template>
	<section class="home">
		<Loader v-show="show"/>

		<h1 ref="title">PA<span>[I]</span>NDEMIE</h1>
		<img src="../../public/assets/img/carton-home.png" ref="box" class="box" alt="">
		<div ref="objectsBox" class="objects-container">
			<img src="../../public/assets/img/pq-home.png" class="objects" alt="">
			<img src="../../public/assets/img/gel-home.png"  class="objects" alt="">
			<img src="../../public/assets/img/masque-home.png" class="objects" alt="">
		</div>
		<Button v-bind:link="'room'" v-bind:size=1 v-bind:type=1 class="button" ref="button">C'EST PARTI POUR LES EMMERDES</Button>

	</section>
</template>

<script>
import Loader from '@/components/Loader.vue'
import Button from '@/components/Button.vue'
import * as load from 'load-asset'
import { gsap, Power3, Bounce } from 'gsap'

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

			this.show = false
			this.mainTimeline(this.$refs.box, this.$refs.title, this.$refs.button.$el)
				.addLabel('DELAY')
				.add(this.objectsTimeline(this.$refs.objectsBox), 'DELAY+=1')
		},
		mainTimeline (box, title, button) {
			const boxTL = gsap.timeline()
			boxTL.add('START')
			boxTL.fromTo(box, { y: 400 }, { y: 0, duration: 2.5, delay: 1, ease: Bounce.easeOut }, 'START') // show box first
			boxTL.fromTo('.objects', { opacity: 0, y: 300 }, { opacity: 1, y: 0, duration: 1, stagger: { each: 0.4 } }, 'START+=2') // show objects
			boxTL.fromTo(title, { opacity: 0 }, { opacity: 1, duration: 1.5 }) // show title
			boxTL.fromTo(button, { opacity: 0 }, { opacity: 1, duration: 0.5 }) // show button
			return boxTL
		},
		objectsTimeline (objects) {
			const objectsTL = gsap.timeline({ repeat: -1, yoyo: true })
			objectsTL.to(objects, { y: 30, ease: Power3.easeInOut, duration: 1 })
			return objectsTL
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
	// background-image: url('../../public/assets/img/bg-home.png'), url('../../public/assets/img/fond-home.png');
	background-image: url('../../public/assets/img/fond-home.png');
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

	.box {
		position: absolute;
		width: 100%;
		height: 100vh;
	}
}
.objects-container {
	// border: solid red;
	position: absolute;
	width: 100%;
	height: 100vh;

	& img {
		position: absolute;
		// border: solid blue;
		right: 0;
		width: 100%;
		height: 100%;
	}
}
</style>
