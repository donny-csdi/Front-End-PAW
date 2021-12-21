<template>
  <v-app>
  <v-main class="master">
    <v-container class="contain">
      <router-view />
    </v-container>
  </v-main>
  <v-spacer/>
  <v-nav-bar app>
    <Footer />
  </v-nav-bar>
</v-app>
</template>

<script>

  import Footer from './components/Footer.vue'
  
  export default {
    name: 'App',
    components: {
      Footer
    }
    
  }
</script>

<style>
.master {
  margin-top: 25px;
  margin-bottom: 10px;
}
.contain {
  margin-top: 5%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
    @import url('https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700,800');

    .auth-footer, #app, #root {
      width: 100%;
      height: 100%;
    }

    #app {
      box-sizing: border-box;
      background: #1C8EF9 !important;
      min-height: 100vh;
      display: flex;
      font-weight: 400;
      font-family: 'Fira Sans', sans-serif;
    }

    
</style>
