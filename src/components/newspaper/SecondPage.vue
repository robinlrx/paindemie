<template>
  <section v-if="showSecondPage">
	<!-- <a @click="check()">Valider</a> -->
	<Button @click.native="check()" :size=3 :type=1 class="button" ref="button" :link="''">CLIQUER</Button>
  </section>
</template>

<script>
import Button from '@/components/ui/AppButton.vue'
// import AppInput from '@/components/ui/AppInput.vue'
export default {
	name: 'SecondPage',
	components: { Button },
	props: {
		showSecondPage: Boolean
	},
	methods: {
		check () {
			this.$emit('update:showSecondPage', false)
		}
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

a {
	position: absolute;
	right: 20px;
	bottom: 10px;
}

</style>
