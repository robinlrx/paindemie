<template>
	<section class="home">
		<div class="lottie-block" ref="lottieBlock"></div>
		<img src="../../public/assets/img/carton-home.png" ref="box" class="box" alt="">
		<div ref="objectsBox" class="objects-container">
			<img src="../../public/assets/img/pq-home.png" class="objects" alt="">
			<img src="../../public/assets/img/gel-home.png"  class="objects" alt="">
			<img src="../../public/assets/img/masque-home.png" class="objects" alt="">
		</div>
		<Button :link="'room'" :size=1 :type=1 class="button" ref="button">C'EST PARTI POUR LES EMMERDES</Button>

	</section>
</template>

<script>
import Button from '@/components/Button.vue'
import { gsap, Power3, Bounce } from 'gsap'
import lottie from 'lottie-web'
import animLogo from '../assets/data/anim-logo.json'

export default {
	name: 'Home',
	components: {
		Button
	},
	methods: {
		render () {
			this.mainTimeline(this.$refs.box, this.$refs.title, this.$refs.button.$el)
				.addLabel('DELAY')
				.add(this.objectsTimeline(this.$refs.objectsBox), 'DELAY+=1')
		},
		mainTimeline (box, title, button) {
			const boxTL = gsap.timeline()
			boxTL.add('START')
			boxTL.fromTo(box, { y: 400 }, { y: 0, duration: 2.5, delay: 1, ease: Bounce.easeOut }, 'START') // show box first
			boxTL.fromTo('.objects', { opacity: 0, y: 300 }, { opacity: 1, y: 0, duration: 1, stagger: { each: 0.4 } }, 'START+=2') // show objects
			// boxTL.fromTo(title, { opacity: 0 }, { opacity: 1, duration: 1.5 }) // show title
			boxTL.fromTo(button, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 'START+=4.5') // show button
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
		lottie.loadAnimation({
			container: this.$refs.lottieBlock, // the dom element
			renderer: 'svg',
			loop: false,
			autoplay: true,
			animationData: animLogo,
			rendererSettings: {
				preserveAspectRatio: 'xMinYMin slice',
				clearCanvas: false,
				progressiveLoad: false,
				hideOnTransparent: true,
				className: 'some-css-class-name',
				id: 'some-id'
			}
		})
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.home {
	width: 100%;
	height: 100vh;
	background-image: url('../../public/assets/img/backgrounds/background-home.jpg');
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	display: flex;
	flex-direction: column;

	.lottie-block {
		width: 100%;
		height: 100vh;
		// border: solid red;
		margin: auto;
		position: relative;
		top: -50px;
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
	position: absolute;
	width: 100%;
	height: 100vh;

	& img {
		position: absolute;
		right: 0;
		width: 100%;
		height: 100%;
	}
}
</style>
