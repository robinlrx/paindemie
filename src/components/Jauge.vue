<template>
  <div>
    <div class="counter">
      <svg
        v-bind:style="{height: this.heightJauge + '%'}"
        ref="jauge"
        class="jauge"
        viewBox="0 0 100 100"
      >
        <g class="base-timer__circle">
          <rect
            x="0"
            y="0"
            width="20"
            height="100"
            rx="50"
            ry="50"
          />
        </g>
      </svg>

    </div>
    <button v-on:click="counter = -5; setHeight()">-5</button>
    <button v-on:click="counter = -10; setHeight()">-10</button>
    <button v-on:click="counter = 5; setHeight()">+5</button>
  </div>
</template>

<script>
export default {
	data () {
		return {
			counter: 0,
			heightJauge: 100
		}
	},
	methods: {
		setHeight () {
			if (this.heightJauge >= 100) {
				this.heightJauge = 100
			} else if (this.heightJauge <= 0) {
				this.heightJauge = 0
			}

			this.heightJauge = this.heightJauge + this.counter
			console.log(this.heightJauge)
		},
		penality () {
			setInterval(() => {
				this.heightJauge -= 2
			}, 10000)
		}
	},
	created: function () {
		this.penality()
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.counter {
  position: absolute;
  right: 10px;
  top: 100px;
  height: 300px;
  width: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background-color: white;
  box-shadow: 7px 10px 45px 4px rgba(0, 0, 0, 0.35);

  .jauge {
    margin: auto;
    margin-bottom: 0px;
    width: 100%;
    max-height: 100%;
    background-color: $light-green;
    border-radius: 20px;

    rect {
      fill: none;
      stroke: none;
    }
  }
}

button {
  position: relative;
  z-index: 9999999999999;
}
</style>
