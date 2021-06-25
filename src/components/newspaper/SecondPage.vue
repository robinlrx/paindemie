<template>
	<section v-if="showSecondPage"> <!-- v-if="showSecondPage" -->
		<div class="first-container">
				<p>La <span @click="showRebus=true">quarantaine</span><br />à causé beaucoup de solitude, il y a une <span>pénurie</span> dans tous les supermarchés... </p>
		</div>
		<div class="second-container">
				<p>Tu te rends compte qu'il faut même avoir une <span>attestation</span><br />pour pouvoir se déplacer librement ?</p>

				<h3 v-if="showError">Remplit tous les champs fréro !</h3>
		</div>
		<Rebus v-if="showRebus" :showRebus.sync="showRebus" />
	</section>
</template>

<script>
// import Button from '@/components/ui/AppButton.vue'
// import AppInput from '@/components/ui/AppInput.vue'
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
			showError: false,
			showRebus: false
		}
	},
	components: {
		// Button,
		// AppInput,
		Rebus
	},
	props: {
		showSecondPage: Boolean
	},
	methods: {
		checkInput () {
			if ((this.qurantaine === '' || this.qurantaine === null) || (this.pénurie === '' || this.pénurie === null) || (this.attestation === '' || this.attestation === null)) {
				this.showError = true
				setTimeout(function () { this.showError = false }, 2000)
			} else {
				this.checkWord()
			}
		},
		checkWord () {
			for (let i = 0; i <= this.badWords.length; i++) {
				if (this.input[i].value.toLowerCase() === this.badWords[i]) {
					// console.log('bad word')
					this.input[i].style.color = '#FF4465'
				} else {
					// console.log('good word')
					this.input[i].style.color = 'rgb(42, 104, 100)'
					this.score += 1
				}

				if (this.input[0].style.color === 'rgb(42, 104, 100)' && this.input[1].style.color === 'rgb(42, 104, 100)' && this.input[2].style.color === 'rgb(42, 104, 100)') {
					this.$emit('update:showSecondPage', false)
					this.$emit('update:showLastPage', true)
				}
			}
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
	// border: solid red;
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
	// border: solid red;
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

		&:hover {
			color: $violet;
		}
	}
}

h3 {
	color: red;
	letter-spacing: 2px;
	position: absolute;
	bottom: 0;
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
