<template>
	<div class="choices">
		<canvas ref="canvas" class="canvas"></canvas>
		<img :src="this.etape.videoChoiceUn" alt="">
		<div v-bind:class="{ active: isActive }">
			<button>{{this.etape.btnChoiceUn}}</button>
			<button v-on:click="$emit('onClick')">{{this.etape.btnChoiceDeux}}</button>
		</div>
	</div>
</template>

<script>
import * as THREE from 'three'
import Mouse from '../utils/mouse'
import wfrag from '../shaders/wave.frag'
import wvert from '../shaders/wave.vert'

const { split } = require('lodash')

export default {
	props: {
		etape: Object
	},
	data () {
		return {
			isActive: false
		}
	},
	mounted () {
		this.showButtons()

		var scene = new THREE.Scene()
		var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
		const canvas = this.$refs.canvas
		// console.log(canvas	)
		var renderer = new THREE.WebGLRenderer({
			canvas: canvas,
			alpha: true
		})
		renderer.setSize(window.innerWidth, window.innerHeight)
		renderer.setPixelRatio(window.devicePixelRatio)

		window.addEventListener('resize', () => {
			renderer.setSize(window.innerWidth, window.innerHeight)
			renderer.setPixelRatio(window.devicePixelRatio)
		})

		let time = 0

		const geometry = new THREE.PlaneBufferGeometry(2, 2, 1, 1)

		const material = new THREE.RawShaderMaterial({
			uniforms: {
				time: { value: 1.0 },
				rez: { type: 'v2', value: [canvas.width, canvas.height] },
				mouse: { type: 'v2', value: Mouse.cursor }
			},
			vertexShader: wvert,
			fragmentShader: wfrag
		})

		material.uniforms.time.value = time
		material.uniforms.mouse.value = Mouse.cursor

		const mesh = new THREE.Mesh(geometry, material)
    	scene.add(mesh)

		const update = () => {
			requestAnimationFrame(update)
			time += 0.01
			renderer.render(scene, camera)
		}

		requestAnimationFrame(update)
	},
	methods: {
		showButtons () {
			setTimeout(() => {
				this.isActive = true
				// console.log('is active')
			}, 3000)
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

	.choices {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100vh;
		display: flex;
		animation-duration: 3s;
		animation-name: blackSail;
		animation-fill-mode: forwards;

		.canvas {
			position: absolute;
			// width: 100%;
			// height: 100vh;
		}

		img {
			margin: auto;
			animation-duration: 3s;
			animation-name: zoom;
			animation-fill-mode: forwards;
		}

		div {
			position: absolute;
			width: 30%;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			display: none;

			button {
				margin: auto;
				cursor: pointer;
			}
		}
	}

	@keyframes blackSail {
		0% {
			background-color: rgba(0, 0, 0, 0);
		}

		100% {
		background-color: rgba(0, 0, 0, 0.6);
		}
	}

	@keyframes zoom {
		0% {
			transform: scale(0);
		}

		80% {
			transform: scale(2);
		}

		100% {
			transform: scale(1.7);
		}
	}

	.active {
		display: flex !important;
	}
</style>
