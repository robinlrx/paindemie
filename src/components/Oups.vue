<template>
	<transition v-if="show" name="fade">
		<section>
			<div>
				<div class="title">
					<h2>OUPS!</h2>
					<img src="assets/img/oups-point.png" alt="">
				</div>
				<p>{{this.etape.choice3}}</p>
				<Button @click.native="$emit('update:show', false)" class="button" v-bind:link="'room'" v-bind:size=3 v-bind:type=1>Allez j'me rattrape</Button>
			</div>
		</section>
	</transition>
</template>

<script>
import Button from '@/components/Button.vue'
export default {
	props: {
		etape: Object,
		show: Boolean
	},
	components: {
		Button
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
		background-image: url('/assets/img/fond-oups.png');
		background-repeat: no-repeat;
		background-size: cover;
		width: 727px;
		height: 285px;

		.title {
			position: absolute;
			top:-40px;
			left: -40px;
			background-image: url('/assets/img/fond-title.png');
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
