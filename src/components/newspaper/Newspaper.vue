<template>
	<transition name="fade"> <!--  v-if="showNewspaper" -->
		<section>
			<FirstPage :showFirstPage.sync="showFirstPage" :showSecondPage.sync="showSecondPage" />
			<!-- <SecondPage  /> -->
			<SecondPage :showSecondPage.sync="showSecondPage" />
			<LastPage />
		</section>
	</transition>
</template>

<script>
import FirstPage from '@/components/newspaper/FirstPage.vue'
import SecondPage from '@/components/newspaper/SecondPage.vue'
import LastPage from '@/components/newspaper/LastPage.vue'
export default {
	name: 'Newspaper',
	props: {
		showNewspaper: Boolean
	},
	data () {
		return {
			showFirstPage: true,
			showSecondPage: false
		}
	},
	components: {
		FirstPage,
		SecondPage,
		LastPage
	}

}
</script>

<style lang='scss' scoped>
@import '@/assets/scss/_variables.scss';

section {
	cursor: default;
}

</style>
