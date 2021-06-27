<template>
	<div class="timer">
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
			timer: undefined,
			publicPath: process.env.BASE_URL, // to access to public folder
			number: 1
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
					const audio = new Audio(this.randomSound())
					audio.play()
					this.$emit('onPenality', -5)
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
		},
		randomSound () {
			return `${this.publicPath}assets/audios/leo-10/leo_${Math.floor(Math.random() * (13 - 1 + 1)) + 1}.mp3`
		}
	},
	created: function () {
		this.start()
	},
	watch: {
		timerPause (newValue) {
			newValue ? this.pause() : this.restart()
		}
	},
	destroyed () {
		clearInterval(this.timer)
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
