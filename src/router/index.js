import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Room from '../views/Room.vue'
import Choices from '../components/Choices.vue'
import Loose from '../views/Loose.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/room',
		name: 'Room',
		component: Room
	},
	{
		path: '/choices',
		name: 'Choices',
		component: Choices
	},
	{
		path: '/loose',
		name: 'Loose',
		component: Loose
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
