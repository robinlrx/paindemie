<template>
	<section>
		<h2>PERDU !</h2>
		<p><span>Eh merde . . .</span> Léo ne t’as pas cru ! <br>modifie tes choix pour arriver à la fin !</p>
		<Button class="button" v-bind:link="'room'" v-bind:size=2 v-bind:type=1>Recommencer</Button>
	</section>
</template>

<script>
import Button from '@/components/Button.vue'
export default {
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
	background-color: $dark-green;
	color: $white;

	h2 {
		font-family: $chelsea-font;
		font-size: 5rem;
		font-weight: 400;
		margin-bottom: 0;
	}

	p{
		font-family: $chantal-font;
		font-size: 1.5rem;

		span {
			font-weight: bold;
		}
	}

	.button {
		position: absolute;
		right: 0;
		bottom: 5vh;
		right: 3vw;
	}
}

</style>
