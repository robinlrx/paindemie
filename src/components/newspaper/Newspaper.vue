<template>
	<transition name="fade"> <!--  v-if="showNewspaper" -->
		<section>
			<!-- <Lottie/>
			<Motion :src="lastVideoSrc()" :timerPause.sync="timerPause" /> -->
			<LastTuto />
			<FirstPage :showFirstPage.sync="showFirstPage" :showSecondPage.sync="showSecondPage" />
			<SecondPage  :showSecondPage.sync="showSecondPage" :showLastPage.sync="showLastPage"/>
			<LastPage :showLastPage.sync="showLastPage" />
		</section>
	</transition>
</template>

<script>
import FirstPage from '@/components/newspaper/FirstPage.vue'
import SecondPage from '@/components/newspaper/SecondPage.vue'
import LastPage from '@/components/newspaper/LastPage.vue'
import LastTuto from '@/components/LastTuto.vue'
// import Motion from '@/components/Motion.vue'
// import Lottie from '@/components/Lottie.vue'
export default {
	name: 'Newspaper',
	props: {
		showNewspaper: Boolean,
		numChoice: Object,
		myScore: Object,
		timerPause: Boolean
	},
	data () {
		return {
			showFirstPage: false,
			showSecondPage: false,
			showLastPage: false
		}
	},
	components: {
		FirstPage,
		SecondPage,
		LastPage,
		LastTuto
		// Motion,
		// Lottie
	},
	methods: {
		lastVideoSrc () {
			if (this.myScore[7].answer === 1) {
				return this.numChoice.btn1.motionChoice
			} else {
				return this.numChoice.btn2.motionChoice
			}
		}
	},
	watch: {
		timerPause (newValue) {
			this.$emit('update:timerPause', newValue)
		}
	}

}
</script>

<style lang='scss' scoped>
@import '@/assets/scss/_variables.scss';

section {
	cursor: default;
}

</style>
