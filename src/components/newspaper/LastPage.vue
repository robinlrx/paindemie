<template>
	<section v-if="showLastPage">
		<div class="first-container">
			<p>Un test <AppInput :placeholder="'pcr'" :size="'7'" v-model="pcr"/> est <br />obligatoire si l'on veut <br />voyager tu imagines ??</p>
		</div>
		<div class="second-container">
			<p>Décidémment ce <AppInput :placeholder="'covid'" :size="'5'" v-model="covid"/> va <br />finir par avoir raison de nous...</p>

			<h3 v-if="showError">Remplit tous les champs fréro !</h3>
		</div>
		<p class="love-text"><strong>Je t'aime...</strong><br/> de tout mon coeur...</p>
		<Button @click.native="checkInput()" :size=3 :type=1 class="button" ref="button" :link="''">Valider</Button>
	</section>
</template>

<script>
import Button from '@/components/ui/AppButton.vue'
import AppInput from '@/components/ui/AppInput.vue'
export default {
	name: 'LastPage',
	data () {
		return {
			input: document.getElementsByTagName('input'),
			badWords: ['pcr', 'covid'],
			score: 0,
			pcr: null,
			covid: null,
			showError: false
		}
	},
	components: {
		Button,
		AppInput
	},
	props: {
		showLastPage: Boolean
	},
	methods: {
		checkInput () {
			if ((this.pcr === '' || this.pcr === null) || (this.covid === '' || this.covid === null)) {
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

				if (this.input[0].style.color === 'rgb(42, 104, 100)' && this.input[1].style.color === 'rgb(42, 104, 100)') {
					// this.$emit('update:showSecondPage', false)
					// this.$emit('update:showLastPage', true)
					alert('bravo')
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
	background-image: url('../../../public/assets/img/newspaper/background3.jpg');
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
}

.first-container {
	position: absolute;
	top: 0;
	left: 17%;
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
	top: -15%;
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

	&.love-text {
		position: absolute;
		bottom: 3%;
		right: 21%;
	}
}

h3 {
	color: red;
	letter-spacing: 2px;
	position: absolute;
	bottom: 0;
}

.button {
	position: absolute;
	left: 20px;
	bottom: 10px;
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
