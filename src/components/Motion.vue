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
	props: {
		etape: Object
	},
	data () {
		return {
			showMotion: true
		}
	},
	mounted () {
		this.closeMotion()
	},
	methods: {
		closeMotion () {
			const motion = this.$refs.motion
			motion.onended = () => {
				this.showMotion = false
			}
		}
	}
}

</script>

<style lang="scss" scoped>
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
.fade-enter, .fade-leave-to {
	opacity: 0;
}
</style>
