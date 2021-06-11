<template>
  <input type="text" required :size="sizeProps" :placeholder="placeholderProps" >
</template>

<script>
export default {
	name: 'AppInput',
	props: {
		size: {
			type: String,
			required: false,
			default: '10'
		},
		placeholder: {
			type: String,
			required: true,
			default: ''
		}
	},
	computed: {
		sizeProps () {
			return this.size
		},
		placeholderProps () {
			return this.placeholder
		}
	}
}
</script>

<style lang='scss' scoped>
@import '@/assets/scss/_variables.scss';

input {
	width: auto;
	background-color: transparent;
	border: none;
	border-bottom: solid 1.5px;
	color: $violet;
	&:focus{
		outline: none;
		color: #FF4465;
	}
	&::placeholder {
		color: $violet;
	}
}
</style>
