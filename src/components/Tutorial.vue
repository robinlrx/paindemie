<template>
	<section>
		<p  v-if="show"><span>Eh merde . . . </span> <br> Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus asperiores consequatur deserunt sapiente iure aut saepe aperiam tenetur labore obcaecati.<br>Lorem ipsum</p>
		<Button v-on:click="show = !show" v-bind:link="'room'" v-bind:size=1 v-bind:type=1 class="button">J'AI CAPTÉ</Button>
	</section>
</template>

<script>
import Button from '@/components/Button.vue'

export default {
	components: {
		Button
	},
	data () {
		return {
			show: true
		}
	},

	methods: {
	}

}
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

section {
	width: 100%;
	height: 100vh;
	background-color: rgba(255, 255, 255, 0.7);
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	p {
		color: $red;
		font-size: 1.125rem;
		font-family: $chantal-font;
		width: 40vw;

		span {
			font-weight: bold;
		}
	}
}

</style>
