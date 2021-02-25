<template>
  <canvas ref="canvas" class="canvas"></canvas>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default {
	mounted () {
		this.init()
	},
	methods: {
		init () {
			// Setup Scene
			this.scene = new THREE.Scene()
			this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)

			this.renderer = new THREE.WebGLRenderer({
				canvas: this.$refs.canvas,
				alpha: true,
				antialias: true
			})
			this.renderer.setSize(window.innerWidth, window.innerHeight)
			this.renderer.setPixelRatio(window.devicePixelRatio)

			window.addEventListener('resize', () => {
				this.renderer.setSize(window.innerWidth, window.innerHeight)
				this.renderer.setPixelRatio(window.devicePixelRatio)
				this.camera.aspect = window.innerWidth / window.innerHeight
				this.camera.updateProjectionMatrix()
			})

			// Display axes
			const axesHelper = new THREE.AxesHelper(100)
			this.scene.add(axesHelper) // The X axis is red. The Y axis is green. The Z axis is blue.

			const controls = new OrbitControls(this.camera, this.$refs.canvas)
			this.camera.position.set(-3, 0, 0)
			controls.rotateSpeed = 0.5
			controls.enableZoom = false
			controls.enablePan = false
			controls.update()

			const sphereGeometry = new THREE.SphereGeometry(5, 32, 32)
			const room = require('../assets/img/360.jpg')
			const textureLoader = new THREE.TextureLoader()
			const texture = textureLoader.load(room)
			texture.wrapS = THREE.RepeatWrapping
			texture.repeat.x = -1
			const sphereMaterial = new THREE.MeshBasicMaterial({
				map: texture,
				side: THREE.DoubleSide
			})
			sphereMaterial.transparent = true
			const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
			this.scene.add(sphere)

			// this.camera.position.z = 5
			this.update()
		},
		update () {
			this.renderer.render(this.scene, this.camera)
			requestAnimationFrame(this.update)
		}
	}
}
</script>

<style scoped lang="scss">
.canvas {
	position: absolute;
	top: 0;
	left: 0;
	z-index: -1;
}
</style>
