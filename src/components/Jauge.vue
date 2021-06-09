<template>
	<div>
		<div class="counter">
			<svg
			:style="{width: this.heightJauge + '%', 'background-color': this.jaugeColor}"
			ref="jauge"
			class="jauge"
			:class="setColor"
			viewBox="0 0 100 100"
			>
			<g class="base-timer__circle">
				<rect
				x="0"
				y="0"
				width="100"
				height="20"
				rx="50"
				ry="50"
				/>
			</g>
			</svg>

		</div>
		<img :src="`${this.publicPath}${this.perso}`" alt="" class="perso">
		<button @click="$emit('onPenality', -5)">-5</button>
		<button @click="$emit('onPenality', -10)">-10</button>
		<button @click="$emit('onPenality', 5)">+5</button>
	</div>
</template>

<script>
export default {
	name: 'Jauge',
	props: {
		score: Number
	},
	data () {
		return {
			heightJauge: this.score,
			jaugeColor: '#ACDEA4',
			publicPath: process.env.BASE_URL, // pour accédder au dossier public
			perso: 'assets/img/perso_content.png'
		}
	},
	watch: {
		score: function (value) {
			this.heightJauge = value
		}
	},
	methods: {
		setHeight (penality) {
			this.heightJauge = this.heightJauge + penality

			if (this.heightJauge >= 100) {
				this.heightJauge = 100
			} else if (this.heightJauge <= 0) {
				this.heightJauge = 0
			}
		},
		setColor () {
			if (this.heightJauge <= 30) {
				this.jaugeColor = '#e74c3c'
				this.perso = 'assets/img/perso_venere.png'
			} else if (this.heightJauge <= 70) {
				this.jaugeColor = '#FFCD1D'
				this.perso = 'assets/img/perso_reflechit.png'
			} else {
				this.jaugeColor = '#ACDEA4'
				this.perso = 'assets/img/perso_content.png'
			}
		}
	},
	created: function () {
		setInterval(() => {
			this.setColor()
		}, 1000)
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.counter {
	height: 15px;
	width: 190px;
	display: flex;
	flex-direction: column;
	border-radius: 20px;
	background-color: $red;
	border: solid 4px $red;

	.jauge {
		margin: auto;
		margin-right: 0px;
		height: 100%;
		max-height: 100%;
		max-width: 100%;
		border-radius: 20px;
		transition: ease 1s;

		rect {
		fill: none;
		stroke: none;
		}
	}
}

.perso {
	position: absolute;
	top: -5px;
	right: -80px;
	width: 130px;
}
</style>
