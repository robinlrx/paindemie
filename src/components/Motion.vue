<template>
	<transition v-if="showMotion" name="fade">
		<div class="container">
			<video ref="motion" autoplay width="250">
				<source :src="this.etape.motion" type="video/mp4">
			</video>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'Motion',
	props: {
		etape: Object,
		timerPause: Boolean
	},
	data () {
		return {
			showMotion: true
		}
	},
	mounted () {
		this.$emit('update:timerPause', true)
		this.closeMotion()
	},
	methods: {
		closeMotion () {
			const motion = this.$refs.motion
			motion.onended = () => {
				this.showMotion = false
			}
		}
	},
	watch: {
		showMotion (newValue) {
			this.$emit('update:timerPause', newValue)
		}
	}
}

</script>

<style lang="scss" scoped>
.container {
	position: relative;
	width: 100vw;
	height: 100vh;
	cursor: default;
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
</style>
