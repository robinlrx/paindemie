<template>
	<div class="timer">
		<!-- <button @click="restart">Restart</button>
		<button @click="pause">Pause</button>
		<button @click="reset">Reset</button> -->
		<p>{{formatTime}}</p>
  </div>
</template>

<script>
export default {
	name: 'Timer',
	props: {
		timerPause: Boolean
	},
	data () {
		return {
			elapsedTime: 0,
			timer: undefined
		}
	},
	computed: {
		formatTime () {
			const date = new Date(null)
			date.setSeconds(this.elapsedTime / 1000)
			const utc = date.toUTCString()
			return utc.substr(utc.indexOf(':') - 2, 8).slice(3)
		}
	},
	methods: {
		start () {
			this.timer = setInterval(() => {
				this.elapsedTime += 1000
				if (this.elapsedTime % 10000 === 0) {
					this.$emit('onPenality', -2)
				}
			}, 1000)
		},
		pause () {
			clearInterval(this.timer)
		},
		restart () {
			this.start()
		},
		reset () {
			this.elapsedTime = 0
		}
	},
	created: function () {
		this.start()
	},
	watch: {
		timerPause (newValue) {
			newValue ? this.pause() : this.restart()
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.timer {
	display: flex;
	flex-direction: column;

	p {
		font-family: $chelsea-font;
		font-size: 1.8rem;
		color: $red;
		margin: 0
	}
}
</style>
