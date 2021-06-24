<template>
	<transition v-if="showOups" name="fade">
		<section>
			<transition name="fade">
				<Motion :src="this.etape.choice3.motion"/>
			</transition>
			<div>
				<div class="title">
					<h2>OUPS!</h2>
					<img src="assets/img/icons/oups-point.png" alt="">
				</div>
				<p>{{this.etape.choice3.text}}</p>
				<Button @click.native="$emit('update:showOups', false)" class="button" :link="'room'" :size=3 :type=1>Allez j'me rattrape</Button>
			</div>
		</section>
	</transition>
</template>

<script>
import Motion from '@/components/Motion.vue'
import Button from '@/components/ui/AppButton.vue'
export default {
	name: 'Oups',
	props: {
		etape: Object,
		showOups: Boolean,
		timerPause: Boolean
	},
	components: {
		Button,
		Motion
	},
	mounted () {
		this.$emit('update:timerPause', true)
	},
	watch: {
		showOups (newValue) {
			this.$emit('update:timerPause', newValue)
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

section {
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	background-color: rgba(255, 205, 29, 0.8);
	color: $red;
	cursor: initial;

	div {
		position: relative;
		display: flex;
		background-image: url('/assets/img/backgrounds/background-oups.png');
		background-repeat: no-repeat;
		background-size: cover;
		width: 727px;
		height: 285px;

		.title {
			position: absolute;
			top:-40px;
			left: -40px;
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
				color: $yellow;
				margin: auto;
				letter-spacing: .6rem;
				transform: rotate(-5deg);
			}

			img {
				position: absolute;
				width: 80px;
				bottom: -10px;
				right: -30px;
			}
		}

		p {
			font-family: $chantal-font;
			margin: auto;
			font-weight: bold;
			font-size: 2rem;
			max-width: 45vw;
		}

		a {
			position: absolute;
			bottom: -40px;
			right: -40px;
		}
	}
}
</style>
