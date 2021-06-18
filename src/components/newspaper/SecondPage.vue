<template>
  <section v-if="showSecondPage">
  </section>
</template>

<script>
// import Button from '@/components/ui/AppButton.vue'
// import AppInput from '@/components/ui/AppInput.vue'
export default {
	name: 'SecondPage',
	props: {
		showSecondPage: Boolean
	},
	components: {
		// Button
		// AppInput
	},
	methods: {
		// check () {
		// this.$emit('update:showSecondPage', false)
		// }
	},
	mounted () {
		// setTimeout(function () { this.$emit('update:showSecondPage', false) }, 3000)
	}

}
</script>

<style lang='scss' scoped>
@import '@/assets/scss/_variables.scss';

section {
	width: 100%;
	height: 100vh;
	background-image: url('../../../public/assets/img/newspaper/background2.jpg');
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
}

.button {
	position: absolute;
	right: 20px;
	bottom: 10px;
}

</style>
