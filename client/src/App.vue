  
<template>
  <div class="root">
    <!--<Header />-->
    <NavBar/>
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
//import Header from './components/Header.vue'
import NavBar from './components/NavBar.vue'
export default defineComponent({

  components: { NavBar },
   beforeMount() {
    
    if(this.$cookie.getCookie('user') !== null){
      const user = this.$cookie.getCookie('user')
      const isLogged = this.$cookie.getCookie('isLogged')
      this.$store.commit('login', user)
      this.$store.commit('isLogged', isLogged)
      
    }
    console.log("Login status:" + this.$store.state.loggedIn)
  }
  
}

)

</script>