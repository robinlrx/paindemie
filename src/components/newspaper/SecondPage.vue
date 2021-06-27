<template>
	<transition name="fade">
		<section>
			<div class="first-container">
					<p>La <span @click="checkWord('quarantaine')">quarantaine</span><br />à causé beaucoup de solitude, il y a une <span @click="checkWord('pénurie')">pénurie</span> dans tous les supermarchés... </p>
			</div>
			<div class="second-container">
					<p>Tu te rends compte qu'il faut même avoir une <span @click="checkWord('attestation')">attestation</span><br />pour pouvoir se déplacer librement ?</p>
			</div>
			<Rebus v-if="showRebus" :showRebus.sync="showRebus"  :rebusValue.sync="rebusValue" :buttonCounter.sync="buttonCounter" :timerPause.sync="timerPause" />
		</section>
	</transition>
</template>

<script>
import Rebus from '@/components/newspaper/Rebus.vue'

export default {
	name: 'SecondPage',
	data () {
		return {
			input: document.getElementsByTagName('input'),
			badWords: ['quarantaine', 'pénurie', 'attestation'],
			score: 0,
			quarantaine: null,
			pénurie: null,
			attestation: null,
			showRebus: false,
			rebusValue: null,
			buttonCounter: 0
		}
	},
	components: {
		Rebus
	},
	props: {
		showSecondPage: Boolean,
		timerPause: Boolean
	},
	methods: {
		checkWord (rebusValue) {
			this.rebusValue = rebusValue
			this.showRebus = true
		}
	},
	watch: {
		timerPause (newValue) {
			this.$emit('update:timerPause', newValue)
		}
	}

}
</script>

<style lang='scss' scoped>
@import '@/assets/scss/_variables.scss';

section {
	width: 100%;
	height: 100vh;
	background-image: url('../../../public/assets/img/newspaper/background2.jpg');
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
}

.first-container {
	position: absolute;
	top: 35%;
	left: 20%;
	width: 30vw;
	height: 80%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

.second-container {
	position: absolute;
	top: -10%;
	right: 18%;
	width: 30vw;
	height: 80%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

h2 {
	font-family: $chantal-font;
	font-size: 2rem;
	color: $red
}

p, input, h3 {
	font-family: $chantal-font;
	font-size: 1.5rem;
}

p {
	text-align: left;
	padding: 0 20px;
	color: $violet;

	span {
		color: $orange;
		cursor: pointer;
		transition: color 0.3s ease;
		animation-duration: 1.5s;
		animation-name: clignoter;
		animation-iteration-count: infinite;
		// transition: none;

		&:hover {
			color: $violet;
				animation-name: none;
		}
	}
}

h3 {
	color: red;
	letter-spacing: 2px;
	position: absolute;
	bottom: 0;
}

@keyframes clignoter {
	0% {
		opacity: 1;
	}
	50% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

@media (min-width: 1600px) {
	h2 {
		font-size: 2.5rem;
	}

	p, input {
		font-size: 2rem;
	}

	p{
		padding: 0 60px;
	}
}

</style>
