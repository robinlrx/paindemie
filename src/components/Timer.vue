<template>
    <div class="timer">
        <button @click="start">Start</button>
    <button @click="reset">Reset</button>
        <p>{{formatTime}}</p>
  </div>
</template>

<script>
export default {
	name: 'App',
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
			}, 1000)
		},

		reset () {
			this.elapsedTime = 0
		}
	},
	created: function () {
		this.start()
	}
}
</script>

<style lang="scss" scoped>

.timer {
	position: absolute;
	right: 10px;
	top: 10px;
	display: flex;
	flex-direction: column;
}

</style>
