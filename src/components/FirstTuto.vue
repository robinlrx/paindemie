<template>
	<section v-if="showTuto" class="first-tuto">
		<p><span>Eh merde . . . </span> <br> Invente des mythos concernant les objets de la boite en t’inspirant de ce qui t’entoure.  <br><br> Fais gaffe, Léo a l’air très relou!</p>

		<Button @click.native="closeFirstTuto()" class="button" :size=2 :type=1 :link="'room'">J'AI CAPTÉ</Button>
	</section>
</template>

<script>
import Button from '@/components/ui/AppButton.vue'

export default {
	name: 'FirstTuto',
	props: {
		showTuto: Boolean,
		timerPause: Boolean
	},
	components: {
		Button
	},
	methods: {
		closeFirstTuto () {
			this.$emit('update:timerPause', false)
			this.$emit('update:showTuto', false)
			this.$emit('update:show360', true)
		}
	},
	mounted () {
		this.$emit('update:timerPause', true)
	}

}
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.first-tuto {
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

		span {
			font-weight: bold;
		}
	}
}
</style>
