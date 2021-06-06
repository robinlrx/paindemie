<template>
	<div class="container">
		<div class="lottie-block" ref="lottieBlock"></div>
		<div class="lottie-temp-background" ref="lottieTempBackground"></div>
	</div>
</template>

<script>
import lottie from 'lottie-web'
import anim from '../assets/data/anim.json'

export default {
	mounted () {
		// show temp background ("overlay") while anim not loaded
		// const lottieTempBackground = document.getElementById('lottie-temp-background')

		// setup lottie anim in reverse
		// const lottieBlock = document.getElementById('lottie-block')
		const lottieAnim = lottie.loadAnimation({
			container: this.$refs.lottieBlock, // the dom element
			renderer: 'svg',
			loop: true,
			autoplay: true,
			animationData: anim,
			rendererSettings: {
				// context: canvasContext, // the canvas context, only support "2d" context
				preserveAspectRatio: 'xMinYMin slice', // Supports the same options as the svg element's preserveAspectRatio property
				clearCanvas: false,
				progressiveLoad: false, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
				hideOnTransparent: true, // Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
				className: 'some-css-class-name',
				id: 'some-id'
			}
		})
		lottieAnim.addEventListener('DOMLoaded', () => {
			console.log('anim loaded')
			//   lottieAnim.play();
			//   // go to end (29 frames)
			//   lottieAnim.goToAndStop(29, true);
			//   // set direction in revevrse
			// lottieAnim.setDirection(-1)
			lottieAnim.setSpeed(0.8)
			// hide temp background ("overlay") when anim loaded
			this.$refs.lottieTempBackground.style.display = 'none'
		})
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.container {
	background-color: #ff6b01;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100vw;
	height: 100vh;
	position: relative;
}

.lottie-block {
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 2;
	transform: rotate(-180deg);
	/* transition: transform 1s; */

	& > svg rect {
		fill: #5000ff !important;
	}
}

.lottie-temp-background {
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 3;
	background-color: #5000ff;
}
</style>
