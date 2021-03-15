<template>
  <div class="loader">
    <p>[i]</p>
  </div>
</template>

<script>
export default {
	name: 'Loader'
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.loader {
	width: 100%;
	height: 100vh;
	display: flex;
	background-color: $orange;
	position: fixed;
	top:0;
	z-index: 999;

	p {
		margin: auto;
		font-family: $chelsea-font;
		font-size: 4rem;
		color: $yellow;
		animation-duration: 1s;
		animation-name: clignoter;
		animation-iteration-count: infinite;
		transition: none;
	}
}

@keyframes clignoter {
	0% {
		opacity: 1;
	}
	40% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
</style>
