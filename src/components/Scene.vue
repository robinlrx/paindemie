<template>
	<div ref="container" v-on:click="onClick">
		<canvas ref="canvas" class="canvas"></canvas>
	</div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default {
	props: {
		etape: Object
	},
	data () {
		return {
			tall: 0,
			sprite: null
		}
	},
	mounted () {
		console.log('etape:', this.etape)
		// console.log('currentEtape:', this.currentEtape)
		this.init()
		this.addCoronaObject(new THREE.Vector3(this.etape.c1.x, this.etape.c1.y, this.etape.c1.z), 'bouton1', this.etape.objet1)
		this.addCoronaObject(new THREE.Vector3(this.etape.c2.x, this.etape.c2.y, this.etape.c2.z), 'bouton2', this.etape.objet2)
	},
	methods: {
		init () {
			// const container = this.$refs.container
			// colnsole.log(container)
			// Setup Scene
			this.scene = new THREE.Scene()
			this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000)

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
			const axesHelper = new THREE.AxesHelper(500)
			this.scene.add(axesHelper) // The X axis is red. The Y axis is green. The Z axis is blue.

			// Orbit controls
			const controls = new OrbitControls(this.camera, this.$refs.canvas)
			this.camera.position.set(0, 0, 5)
			controls.rotateSpeed = 0.5
			controls.enableZoom = false
			controls.enablePan = false
			// controls.minPolarAngle = 0 // vertical
			// controls.maxPolarAngle = Math.PI * 0.5 // vertical
			controls.minAzimuthAngle = Math.PI // radians (axe  horizontal)
			controls.maxAzimuthAngle = 0 // radians (axe  horizontal)
			controls.update()

			// Sphere
			const sphereGeometry = new THREE.SphereGeometry(50, 32, 32) // rayon , widthSeg, heightSeg
			const room = this.etape.imageScene
			const textureLoader = new THREE.TextureLoader()
			const texture = textureLoader.load(room)
			texture.wrapS = THREE.RepeatWrapping
			texture.repeat.x = -1
			const sphereMaterial = new THREE.MeshBasicMaterial({
				map: texture,
				side: THREE.DoubleSide
			})
			// sphereMaterial.transparent = true
			const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
			this.scene.add(sphere)

			// this.camera.position.z = 5
			this.update()
		},

		// Fonction pour les afficher les icones cliquables
		addCoronaObject (position, name, icon) {
			const manager = new THREE.LoadingManager()
			const iconsLoader = new THREE.TextureLoader(manager)
			const icons = iconsLoader.load(icon)
			const spriteMaterial = new THREE.SpriteMaterial({
				map: icons
			})

			// const width = spriteMaterial.map
			// console.log('width:', width)
			// const height = spriteMaterial.map.image.height
			// console.log('height:', height)

			this.sprite = new THREE.Sprite(spriteMaterial)
			this.sprite.name = name
			// sprite.userData = { route: route } // on peut mettre nos données
			this.scene.add(this.sprite)

			// this.position = new THREE.Vector3(30, 0, 0)
			this.sprite.position.copy(position.clone().normalize().multiplyScalar(30))
			this.sprite.scale.set(194 / 50, 338 / 50, 1)
		},

		onClick (e) {
			const mouse = new THREE.Vector2((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1)

			const rayCaster = new THREE.Raycaster()
			// console.log(rayCaster)
			console.log('direction xyz point')
			console.log(rayCaster.ray.direction)
			rayCaster.setFromCamera(mouse, this.camera)
			const intersects = rayCaster.intersectObjects(this.scene.children)
			console.log(intersects)

			intersects.forEach(intersect => {
				// Si on clique sur un sprite (les icones)
				if (intersect.object.type === 'Sprite' && intersect.object.name === 'bouton1') {
					console.log(`nom : ${intersect.object.name}`)
					// console.log(`route : ${intersect.object.userData.route}`)
					console.log(intersect.object)
					// const route = intersect.object.userData.route // Avoir accès a l'objet route dans intersect
					// router.push('/choices')
					// const img1 = this.etape.videoChoice1
					this.$emit('objectClicked')
				} else if (intersect.object.type === 'Sprite' && intersect.object.name === 'bouton2') {
					console.log(`nom : ${intersect.object.name}`)
					this.$emit('objectClicked')
				}
			})
		},

		update () {
			this.renderer.render(this.scene, this.camera)
			requestAnimationFrame(this.update)
		}
	}
}
</script>

<style scoped lang="scss">
div {
	position: absolute;
	top: 0;
	left: 0;
	z-index: -1;
}
</style>
