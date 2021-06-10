<template>
	<transition name="fade">
		<section>
			<FirstPage />
		</section>
	</transition>
</template>

<script>
import FirstPage from '@/components/newspaper/FirstPage.vue'
export default {
	name: 'Newspaper',
	props: {
		showNewspaper: Boolean
	},
	components: {
		FirstPage
	}

}
</script>

<style lang='scss' scoped>
@import '@/assets/scss/_variables.scss';

section {
	cursor: default;
}

</style>
