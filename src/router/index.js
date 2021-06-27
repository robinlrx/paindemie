import Vue from 'vue'
import VueRouter from 'vue-router'
import Intro from '../views/Intro.vue'
import Home from '../views/Home.vue'
import Room from '../views/Room.vue'
import Choices from '../components/Choices.vue'
import Loose from '../views/Loose.vue'
import Newspaper from '../components/newspaper/Newspaper.vue'
import Win from '../views/Win.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Intro',
		component: Intro
	},
	{
		path: '/home',
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
	},
	{
		path: '/newspaper',
		name: 'Newspaper',
		component: Newspaper
	},
	{
		path: '/win',
		name: 'Win',
		component: Win
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
