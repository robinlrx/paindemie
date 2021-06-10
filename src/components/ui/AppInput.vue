<template>
  <input type="text" required :size="sizeProps" >
</template>

<script>
export default {
	name: 'AppInput',
	props: {
		size: {
			type: String,
			required: false,
			default: '10'
		}
	},
	computed: {
		sizeProps () {
			return this.size
		}
	}
}
</script>

<style lang='scss' scoped>
input {
	width: auto;
	background-color: transparent;
	border: none;
	border-bottom: solid;
	&:focus{
		outline: none;
	}
}
</style>
