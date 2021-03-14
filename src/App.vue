<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">360</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
::after,
::before {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  position: fixed;
  width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: red;

  a {
    font-weight: bold;
    color: white;

    &.router-link-exact-active {
      color: #FFCD1D;
    }
  }
}
</style>
