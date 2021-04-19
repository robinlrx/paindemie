<template>
	<div ref="container" v-on:click="onClick" v-on:mousemove="onMousemove">
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
	data (e) {
		return {
			tall: 0,
			sprite: null,
			rayCaster: new THREE.Raycaster(),
			mouse: new THREE.Vector2()
		}
	},
	mounted () {
		console.log('etape:', this.etape)
		// console.log('currentEtape:', this.currentEtape)
		this.init()
		this.addCoronaObject(new THREE.Vector3(this.etape.c1.x, this.etape.c1.y, this.etape.c1.z), 'choice1', this.etape.objet1.url)
		this.addCoronaObject(new THREE.Vector3(this.etape.c2.x, this.etape.c2.y, this.etape.c2.z), 'choice2', this.etape.objet2.url)
		// if (this.etape.c3) eviter des erreurs / des crashs
		this.addCoronaObject(new THREE.Vector3(this.etape.c3.x, this.etape.c3.y, this.etape.c3.z), 'choice3', this.etape.objet3.url)
	},
	methods: {
		init () {
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
			const controls = new OrbitControls(this.camera, this.renderer.domElement)
			this.camera.position.set(0, 0, 5)
			controls.rotateSpeed = 0.5
			controls.enableZoom = false
			controls.enablePan = false
			// controls.minPolarAngle = 0 // vertical
			// controls.maxPolarAngle = Math.PI * 0.5 // vertical
			controls.minAzimuthAngle = Math.PI - 0.5 // radians (axe  horizontal)
			controls.maxAzimuthAngle = 0.5 // radians (axe  horizontal)
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
				map: icons,
				color: 0xffffff
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
			this.sprite.position.copy(position.clone().multiplyScalar(30))
			if (name === 'choice1') {
				this.sprite.scale.set(this.etape.objet1.width / 50, this.etape.objet1.height / 50, 1)
			} else if (name === 'choice2') {
				this.sprite.scale.set(this.etape.objet2.width / 50, this.etape.objet2.height / 50, 1)
			} else {
				this.sprite.scale.set(this.etape.objet3.width / 50, this.etape.objet3.height / 50, 1)
			}
			// TODO if ?
		},

		onClick (e) {
			this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
			this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
			console.log('direction xyz point')
			console.log(this.rayCaster.ray.direction)
			this.rayCaster.setFromCamera(this.mouse, this.camera)
			const intersects = this.rayCaster.intersectObjects(this.scene.children)
			console.log(intersects)

			intersects.forEach(intersect => {
				// Si on clique sur un sprite (les icones)
				if (intersect.object.type === 'Sprite' && intersect.object.name === 'choice1') {
					console.log(`nom : ${intersect.object.name}`)
					// console.log(`route : ${intersect.object.userData.route}`)
					console.log(intersect.object)
					// const route = intersect.object.userData.route // Avoir accès a l'objet route dans intersect
					// router.push('/choices')
					// const img1 = this.etape.videoChoice1
					this.$emit('objectClicked')
					this.$emit('buttonSend', intersect.object.name)
				} else if (intersect.object.type === 'Sprite' && intersect.object.name === 'choice2') {
					console.log(`nom : ${intersect.object.name}`)
					this.$emit('objectClicked')
					this.$emit('buttonSend', intersect.object.name)
				}
			})
		},
		// MouseMove
		onMousemove (e) {
			this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
			this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
			this.rayCaster.setFromCamera(this.mouse, this.camera)
			const sprites = this.scene.children.filter(obj => obj.type === 'Sprite')
			const intersects = this.rayCaster.intersectObjects(sprites)
			// Si on est sur un object
			// Alors intersects à une length
			intersects.forEach(sprite => {
				sprite.object.material.color.set(0x0066CC)
			})

			if (intersects.length === 0) {
				sprites.forEach(ch => ch.material.color.set(0xffffff))
			}
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
