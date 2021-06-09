<template>
<transition v-if="showSecondTuto" name="fade">
	<section class="secondTuto">
		<p>Choisis bien ton côté fréro!</p>

		<img src="assets/img/second-tuto.png" alt="tutoChoix">

		<Button @click.native="$emit('update:showSecondTuto', false)" class="button" :size=2 :type=1 :link="'room'">J'AI CAPTÉ</Button>
	</section>
</transition>
</template>

<script>
import Button from '@/components/Button.vue'

export default {
	props: {
		showSecondTuto: Boolean,
		timerPause: Boolean
	},
	components: {
		Button
	},
	mounted () {
		this.$emit('update:timerPause', true)
	},
	watch: {
		showSecondTuto (newValue) {
			this.$emit('update:timerPause', newValue)
		}
	}

}
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.secondTuto {
	position: absolute;
	width: 100%;
	height: 100vh;
	background-color: rgba(255, 255, 255, 0.8);
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	cursor: default;
	gap: 2rem;
	z-index: 3;

	p {
		color: $red;
		font-size: 1.8rem;
		font-family: $chantal-font;
		margin: 0;
	}

	img {
		width: 30%;
	}
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
