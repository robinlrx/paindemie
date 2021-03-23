<template>
	<!-- <div class="counter">
		<div ref="jauge" class="jauge">

		</div>

	</div> -->

	<div class="counter">
    <svg ref="jauge" class="jauge"
      viewBox="0 0 100 100">
      <g class="base-timer__circle">
        <rect x="0" y="0" width="20" height="100" rx="50" ry="50" />
      </g>
    </svg>
    <span class="base-timer__label">
     {{ formattedTimeLeft }}
    </span>
  </div>
</template>

<script>
export default {
	data () {
		return {
			timeTotal: this.time + this.timePassed,
			time: 0,
      		timePassed: 0
		}
	},
	methods: {
		startTimer () {
			this.timeTotal = setInterval(() => (this.timePassed += 1), 1000)
		}

	},
	 computed: {
	// 	 timeLeft() {
		//   return this.time + this.timePassed
		// },
		formattedTimeLeft () {
			const newTime = this.timeTotal
			const minutes = Math.floor(newTime / 60)
			let seconds = newTime % 60
			if (seconds < 10) {
				seconds = `0${seconds}`
			}
	  console.log(this.timeTotal)
			return `${minutes}:${seconds}`
		}
	},
	mounted () {
    	this.startTimer()
	}
}
</script>

<style lang="scss" scoped>

.counter {
	position: absolute;
	right: 0;
	top: 50px;
	height: 300px;
	width: 20px;
	display: flex;
	border-radius: 20px;
	background-color: white;
	box-shadow: 7px 10px 45px 4px rgba(0,0,0,0.35);

	.jauge {
		margin: auto;
		margin-bottom: 0px;
		width: 100%;
		height: 100%;
		background-color: green;
		border-radius: 20px;

		rect {
			fill: none;
    		stroke: none;
		}

	}
}

</style>
