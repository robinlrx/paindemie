<template>
	<section v-if="showFirstPage">
		<div class="container">
			<h2>13 décembre 2020,</h2>
			<p>Ma chère <AppInput :placeholder="'femme'" v-model="femme"/> <br />Cela fait maintenant 2 mois que tu es <AppInput :placeholder="'partie'" v-model="partie"/> Ce maudit <AppInput :placeholder="'virus'" v-model="virus"/> <br />a causé tellement de <AppInput :placeholder="'morts'" v-model="morts" /></p>
			<p>Je pris pour que tu <AppInput :placeholder="'reviennes'" v-model="reviennes" /> Ne t'inquiètes pas, je m'occupe de <AppInput :size="'15'" :placeholder="'notre enfant'" v-model="enfant" /> comme je te <br />l'avais promis avant que tu <AppInput :size="'15'" :placeholder="'nous quittes'" v-model="quittes" /></p>

			<h3 v-if="showError">Remplit tous les champs fréro !</h3>
		</div>
		<Button @click.native="checkInput()" :size=3 :type=1 class="button" ref="button" :link="''">Valider</Button>
	</section>
</template>

<script>
import Button from '@/components/ui/AppButton.vue'
import AppInput from '@/components/ui/AppInput.vue'
export default {
	name: 'FirstPage',
	props: {
		showFirstPage: Boolean
	},
	data () {
		return {
			input: document.getElementsByTagName('input'),
			badWords: ['femme', 'partie', 'virus', 'morts', 'reviennes', 'notre enfant', 'nous quittes'],
			score: 0,
			femme: null,
			partie: null,
			virus: null,
			morts: null,
			reviennes: null,
			enfant: null,
			quittes: null,
			showError: false
		}
	},
	components: {
		Button,
		AppInput
	},
	methods: {
		checkInput () {
			if ((this.femme === '' || this.femme === null) || (this.partie === '' || this.partie === null) || (this.virus === '' || this.virus === null) || (this.morts === '' || this.morts === null) || (this.reviennes === '' || this.reviennes === null) || (this.enfant === '' || this.enfant === null) || (this.quittes === '' || this.quittes === null)) {
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

				if (this.input[0].style.color === 'rgb(42, 104, 100)' && this.input[1].style.color === 'rgb(42, 104, 100)' && this.input[2].style.color === 'rgb(42, 104, 100)' && this.input[3].style.color === 'rgb(42, 104, 100)' && this.input[4].style.color === 'rgb(42, 104, 100)' && this.input[5].style.color === 'rgb(42, 104, 100)' && this.input[6].style.color === 'rgb(42, 104, 100)') {
					this.$emit('update:showFirstPage', false)
					this.$emit('update:showSecondPage', true)
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

	p, input, h3 {
		font-family: $chantal-font;
		font-size: 1.5rem;
	}

	p {
		text-align: left;
		padding: 0 20px;
		color: $violet;
	}

	h3 {
		color: red;
		letter-spacing: 2px;
		position: absolute;
		bottom: 0;
	}
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
