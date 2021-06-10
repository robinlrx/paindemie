<template>
	<section>
		<div class="container">
			<h2>13 décembre 2020,</h2>
			<p>Ma chère <AppInput /> <br />Cela fait maintenant 2 mois que tu es <AppInput /> Ce maudit <AppInput /> <br />a causé tellement de <AppInput /></p>
			<p>Je pris pour que tu <AppInput /> Ne t'inquiètes pas, je m'occupe de <AppInput :size="'15'" /> comme je te <br />l'avais promis avant que tu <AppInput :size="'15'" /></p>
		</div>
		<p class="score">{{ this.score }}</p>
		<Button :link="''" :size=3 :type=1 class="button" ref="button" @click.native="checkColor();checkWord()">Valider</Button>
	</section>
</template>

<script>
import Button from '@/components/Button.vue'
import AppInput from '@/components/ui/AppInput.vue'
export default {
	name: 'FirstPage',
	data () {
		return {
			input: document.getElementsByTagName('input'),
			goodWords: ['femme', 'partie', 'virus', 'morts', 'reviennes', 'notre enfant', 'nous quittes'],
			score: 0
		}
	},
	components: {
		Button,
		AppInput
	},
	methods: {
		checkWord () {
			for (let i = 0; i <= this.goodWords.length; i++) {
				if (this.input[i].value.toLowerCase() === this.goodWords[i]) {
					// console.log('good word')
					this.input[i].style.color = '#2A6864'
					this.score += 1
				} else {
					// console.log('bad word')
					this.input[i].style.color = '#FF4465'
				}
				// console.log(this.score)
			}
		},

		checkColor () {
			this.input.forEach(element => {
				console.log(element.style.color)
				if (element.style.color === 'rgb(42, 104, 100)') {
					console.log('oui')
				}
			})
		}
	}

}
</script>

<style lang='scss' scoped>
@import '@/assets/scss/_variables.scss';

section {
	width: 100%;
	height: 100vh;
	background-image: url('../../../public/assets/img/newspaper/background1.jpg');
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
}

.container {
	position: absolute;
	top: 12%;
	left: 20%;
	width: 30vw;
	height: 80%;
	// border: solid red;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	h2 {
		font-family: $chantal-font;
		font-size: 2rem;
		color: $red
	}

	p, input {
		font-family: $chantal-font;
		font-size: 1.5rem;
		color: $violet;
	}

	p {
		text-align: left;
		padding: 0 20px;
	}
}

.score {
	position: absolute;
	left: 20px;
	bottom: 10px;
	font-size: 2rem;
	color: $white;
}

.button {
	position: absolute;
	right: 20px;
	bottom: 10px;
}

@media (min-width: 1600px) {

	.container {
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
}

</style>
