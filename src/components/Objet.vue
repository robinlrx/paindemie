<template>
	<div class="objet">
			<img src="../assets/img/gel.png" alt="">
			<p>Eh papi c'est quoi ça !?</p>
	</div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.objet {
	z-index: 88;
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
