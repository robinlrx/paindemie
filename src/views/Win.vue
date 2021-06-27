<template>
	<transition name="fade">
		<div class="win">
				<video ref="win" autoplay width="250">
					<source src="assets/videos/test.mp4" type="video/mp4">
				</video>
			</div>
	</transition>
</template>

<script>
import router from '../router/index'

export default {
	name: 'Win',
	methods: {
		closeVideoWin () {
			const win = this.$refs.win
			win.onended = () => {
				router.push('home')
			}
		}
	},
	mounted () {
		this.closeVideoWin()
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.win {
	position: relative;
	width: 100vw;
	height: 100vh;
	z-index: 0;
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
	z-index: 0;
}

</style>
