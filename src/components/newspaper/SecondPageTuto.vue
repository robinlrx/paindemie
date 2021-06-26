<template>
<transition name="fade">
	<section class="second-tuto">
		<p>Invente un mytho avec les mots <br> qui constituent le rébus ! </p>

		<Button class="button" :size=2 :type=1 :link="'room'">J'AI CAPTÉ</Button>
	</section>
</transition>
</template>

<script>
import Button from '@/components/ui/AppButton.vue'

export default {
	name: 'SecondPageTuto',
	components: {
		Button
	},
	props: {
		timerPause: Boolean
	},
	mounted () {
		this.$emit('update:timerPause', true)
	}

}
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.second-tuto {
	width: 100%;
	height: 100vh;
	background-color: rgba(255, 255, 255, 0.8);
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 4rem;
	position: relative;
	z-index: 3;

	p {
		color: $red;
		font-size: 1.8rem;
		font-family: $chantal-font;
		width: 50vw;
	}
}
</style>
