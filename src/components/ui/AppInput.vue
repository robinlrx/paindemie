<template>
  <input type="text" required :size="sizeProps" :placeholder="placeholderProps" :value="value" @input="$emit('input', $event.target.value)">
</template>

<script>
export default {
	name: 'AppInput',
	props: {
		size: {
			type: String,
			required: false,
			default: '8'
		},
		placeholder: {
			type: String,
			required: true,
			default: ''
		},
		value: String
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
		// color: #FF4465;

		&::placeholder {
			color: $orange;
		}
	}
}
</style>
