<template>
	<transition name="fade">
		<section class="loose">

			<div class="loose-container">
				<div class="title">
					<h2>PERDU!</h2>
				</div>
				<p><span>Sérieux ?</span><br/>
				T’as vraiment cru qu’en disant ça il allait te croire?<br/><br/>
				Tu peux encore te rattraper...</p>
				<img src="assets/img/icons/perso_venere.png" alt="">
			</div>

			<Button :link="'/home'" :size=3 :type=2 class="button" ref="button">Vas-y je retente</Button>
		</section>
	</transition>
</template>

<script>
import Button from '@/components/ui/AppButton.vue'
export default {
	name: 'Loose',
	components: {
		Button
	},
	mounted () {
		const audioPerdu = new Audio('assets/audios/fin-perdu.mp3')
		audioPerdu.play()
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.loose {
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	background-image: url('/assets/img/backgrounds/background-loose.jpg');
	background-repeat: no-repeat;
	background-size: cover;
	color: $red;
	cursor: initial;

	.loose-container {
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
			background-image: url('/assets/img/backgrounds/background-title.png');
			background-repeat: no-repeat;
			background-size: cover;
			width: 312px;
			height: 120px;
			display: flex;

			h2 {
				font-family: $chelsea-font;
				font-size: 3rem;
				font-weight: 400;
				color: $cream;
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
