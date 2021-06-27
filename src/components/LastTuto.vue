<template>
	<section class="win">

		<div class="win-container">
			<div class="title">
				<h2>BRAVO!</h2>
			</div>
			<p><span>Leo te crois!</span> (pour le moment)<br/>
			Seulement moi j'en ai marre<br/>
			de t'aider donc à toi<br/>
			d'improviser</p>
			<img src="assets/img/icons/perso_content.png" alt="">
		</div>

		<Button @click.native="closeLastTuto()" :link="''" :size=3 :type=1 class="button" ref="button">J'y go</Button>
	</section>
</template>

<script>
import Button from '@/components/ui/AppButton.vue'
export default {
	name: 'LastTuto',
	props: {
		showLastTuto: Boolean,
		showThirdMotion: Boolean,
		timerPause: Boolean
	},
	components: {
		Button
	},
	methods: {
		closeLastTuto () {
			this.$emit('update:showLastTuto', false)
			this.$emit('update:showThirdMotion', true)
		}
	},
	mounted () {
		this.$emit('update:timerPause', true)
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.win {
	position: relative;
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	background-image: url('/assets/img/backgrounds/background-bravo.jpg');
	background-repeat: no-repeat;
	background-size: cover;
	color: $red;
	cursor: initial;
	z-index: 3;

	.win-container {
		position: relative;
		display: flex;
		background-image: url('/assets/img/backgrounds/background-container-loose.png');
		background-repeat: no-repeat;
		background-size: contain;
		width: 801px;
		height: 409px;
		justify-content: center;
		align-items: center;

		.title {
			position: absolute;
			top:-40px;
			left: -30px;
			background-image: url('/assets/img/backgrounds/background-title-bravo.png');
			background-repeat: no-repeat;
			background-size: cover;
			width: 312px;
			height: 120px;
			display: flex;

			h2 {
				font-family: $chelsea-font;
				font-size: 3rem;
				font-weight: 400;
				color: $red;
				margin: auto;
				letter-spacing: .6rem;
				transform: rotate(-5deg);
			}
		}

		p {
			font-family: $chantal-font;
			text-align: left;
			font-size: 2rem;
			max-width: 42vw;
			letter-spacing: 0.15em;
			margin-right: 5vw;
			span {
				font-weight: bold;
			}
		}

		img {
			position: absolute;
			top: 20px;
			right: -35px;
		}
	}

	.button {
		position: absolute;
		bottom: .5em;
		right: 1em;
	}
}
</style>
