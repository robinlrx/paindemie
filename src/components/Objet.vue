<template>
	<div class="objet">
			<img :src="this.etape.objetQuestion" alt="">
			<p>Eh papi c'est quoi ça !?</p>
	</div>
</template>

<script>
export default {
	props: {
		etape: Object
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.objet {
	z-index: 2;
	position: absolute;
	left: 2%;
	bottom: 0;
	display: flex;
	align-items: flex-end;
	// background-color: red;

	img {
		margin: auto;
		height: 150px;
	}

	p {
		margin-bottom: 0;
		font-family: chantal, sans-serif;
		color: $violet;
		font-size: 1.8rem;
		background-color: rgba(229, 229, 229, .8);
		padding: 5px 10px;
		border-radius: 10px;
	}
}
</style>
