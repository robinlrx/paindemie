<template>
	<transition name="fade">
		<section class="first-tuto">
			<p><span>Oh la la... C’est la merde!</span><br><br> Débrouille-toi pour que Léo ne comprenne pas <br>ce qu’il y a écrit.<br><br> <span>Remplace les mots soulignés!<br> Attention les synonymes sont interdits!</span></p>

			<Button @click.native="closeTuto()" class="button" :size=2 :type=1 :link="''">J'AI CAPTÉ</Button>
		</section>
	</transition>
</template>

<script>
import Button from '@/components/ui/AppButton.vue'

export default {
	name: 'FirstPageTuto',
	components: {
		Button
	},
	props: {
		timerPause: Boolean,
		showFirstTutoNewspaper: Boolean
	},
	methods: {
		closeTuto () {
			this.$emit('update:showFirstTutoNewspaper', false)
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
	background-image: none;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 4rem;
	position: absolute;
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
