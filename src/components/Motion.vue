<template>
	<transition v-if="showMotion" name="fade">
		<div class="container">
			<video ref="motion" autoplay width="250">
				<source :src="propsSource" type="video/mp4">
			</video>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'Motion',
	props: {
		etape: Object,
		timerPause: Boolean,
		showNextComposant: Boolean,
		src: {
			type: String,
			required: true
		}
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
				this.$emit('update:showNextComposant', true)
				this.$emit('update:timerPause', false)
				this.showMotion = false
			}
		}
	},
	computed: {
		propsSource () {
			return this.$props.src
		}
	}
}

</script>

<style lang="scss" scoped>
.container {
	position: absolute;
	left: 0;
	right: 0;
	width: 100vw;
	height: 100vh;
	cursor: default;
	display: flex;
	align-items: center;
	z-index: 1;
}
video {
	width: 100%;
	height: auto;
}
</style>
