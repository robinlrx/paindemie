<template>
<transition name="fade">
	<section v-if="showTuto" class="firstTuto">
		<p><span>Eh merde . . . </span> <br> Invente des mythos concernant les objets de la boite en t’inspirant de ce qui t’entoure.  <br><br> Fais gaffe, Léo a l’air très relou!</p>

		<Button @click.native="$emit('update:showTuto', false)" class="button" :size=2 :type=1 :link="'room'">J'AI CAPTÉ</Button>
	</section>
</transition>
</template>

<script>
import Button from '@/components/Button.vue'

export default {
	name: 'FirstTuto',
	props: {
		showTuto: Boolean,
		timerPause: Boolean
	},
	components: {
		Button
	},
	mounted () {
		this.$emit('update:timerPause', true)
	},
	watch: {
		showTuto (newValue) {
			this.$emit('update:timerPause', newValue)
		}
	}

}
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.firstTuto {
	width: 100%;
	height: 100vh;
	background-color: rgba(255, 255, 255, 0.8);
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 4rem;

	p {
		color: $red;
		font-size: 1.8rem;
		font-family: $chantal-font;
		width: 50vw;

		span {
			font-weight: bold;
		}
	}
}
</style>
