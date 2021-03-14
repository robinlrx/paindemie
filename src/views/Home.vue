<template>
  <section class="home">
    <Loader @click.native="loaderClick" v-bind:class="{display: visible}"></Loader>

    <div class="homePage">
      <img src="../assets/img/papi.png" alt="">
        <div>
          <h1>Pa<span>[i]</span>ndemie</h1>
          <p>Eh papi c'est quoi une pandémie !?</p>
          <router-link tag="start" to="/about">
             <a>Lancer le jeu</a>
          </router-link>
        </div>
    </div>

  </section>
</template>

<script>
import Loader from '@/components/Loader.vue'

export default {
	name: 'Home',
	data () {
		return {
			visible: false
		}
	},
	components: {
		Loader
	},
	methods: {
		loaderClick () {
			console.log('test click')
			this.visible = !this.visible
		}
	}
}
</script>

<style lang="scss" scoped>

  .display {
    display: none;
  }

  .homePage {
    width: 100%;
    height: 100vh;
    background-color: #2A6864;
    display: flex;

    img {
      margin-left: 2%;
    }

    div {
      margin: auto;
      height: 100%;
      text-align: right;
      display: flex;
      flex-direction: column;
      // margin-right: 2%;

      h1 {
       font-family: 'Chelsea Market', cursive;
       font-size: 6rem;
       margin-top: 35%;
      //  margin: auto;
       margin-bottom: 0;
       color: white;
       text-transform: uppercase;
       span {
         color: #FFCD1D;
       }
    }

    p {
    font-family: chantal, sans-serif;
    font-weight: 300;
    font-style: normal;
    margin-top: 10px;
    // margin: auto;
    // margin-bottom: 0;
    color: white;
    font-size: 1.6rem;
    }

    a {
       font-family: chantal, sans-serif;
       border: solid 2.5px #C84C16;
      font-weight: 300;
      font-size: 1.4rem;
      text-decoration: none;
      color: white;
      background-color: #C84C16;
      padding: 10px 30px;
      border-radius: 50px;
      transition: all .2s ease;

      &:hover {
        background-color: transparent;
        color: #C84C16;
      }
    }
    }
  }
</style>
