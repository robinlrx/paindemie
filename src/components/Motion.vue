<template>
	<transition v-if="showMotion" name="fade">
		<video autoplay controls preload="auto" ref="motion">
			<source :src="this.etape.motion.url" type="video/mp4">
		</video>
	</transition>
</template>

<script>
export default {
	props: {
		etape: Object
		// showMotion: {
		// type: Boolean,
		// default: true
		// }
	},
	data () {
		return {
			showMotion: true
		}
	},
	mounted () {
		const m = this.$refs.motion
		m.requestFullscreen()
		this.closeMotion()
	},
	methods: {
		closeMotion () {
			setTimeout(
				() => {
					this.showMotion = false
				}, this.etape.motion.time + 1000
			)
		}
	}
}

</script>

<style lang="scss" scoped>
	video {
		width: 100%;
	}
	.fade-enter-active, .fade-leave-active {
	transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
	}
</style>
