<template>
	<div class="container" v-if="showLottie">
		<div class="lottie-block" ref="lottieBlock"></div>
		<div class="lottie-temp-background" ref="lottieTempBackground"></div>
	</div>
</template>

<script>
import lottie from 'lottie-web'
import anim from '../assets/data/anim.json'

export default {
	name: 'Lottie',
	data () {
		return {
			showLottie: true
		}
	},
	mounted () {
		// setup lottie anim
		const lottieAnim = lottie.loadAnimation({
			container: this.$refs.lottieBlock, // the dom element
			renderer: 'svg',
			loop: false,
			autoplay: false,
			animationData: anim,
			rendererSettings: {
				preserveAspectRatio: 'xMinYMin slice',
				clearCanvas: false,
				progressiveLoad: false,
				hideOnTransparent: true,
				className: 'some-css-class-name',
				id: 'some-id'
			}
		})
		lottieAnim.addEventListener('DOMLoaded', () => {
			console.log('anim loaded')
			lottieAnim.play()
			lottieAnim.setSpeed(0.8)
			// hide temp background ("overlay") when anim loaded
			this.$refs.lottieTempBackground.style.display = 'none'
		})

		lottieAnim.addEventListener('complete', () => {
			lottieAnim.play()
			lottieAnim.setDirection(-1)
			setTimeout(() => {
				this.showLottie = false
			}, 2000)
		})
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.container {
	background-color: transparent;
	width: 100vw;
	height: 100vh;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 3;
	cursor: default;
}

.lottie-block {
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 2;
	transform: rotate(-180deg);
}

.lottie-temp-background {
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 3;
	background-color: #27123C;
}
</style>
