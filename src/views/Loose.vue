<template>
	<section>
		<h2>PERDU !</h2>
		<p><span>Eh merde . . .</span> Léo ne t’as pas cru ! <br>modifie tes choix pour arriver à la fin !</p>
		<Button v-bind:link="'room'" v-bind:size=1 v-bind:type=1>Recommencer</Button>
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

	a {
		font-family: $chantal-font;
		border: solid 3px $orange;
		font-weight: 300;
		font-size: 1.4rem;
		text-decoration: none;
		color: white;
		background-color: $orange;
		padding: 10px 50px;
		border-radius: 50px;
		transition: all .2s ease;

		&:hover {
		background-color: transparent;
		color: $orange;
		}
	}
}

</style>
