<template>
  <div class="container">
    <div class="message">
      <template v-if="authenticated">
        <Movies/>
      </template>
      <template v-else>
        <div class = "center">
          <h6>Please</h6>
          <nuxt-link to="/auth/login">Login</nuxt-link>
          <h6>OR</h6>
          <nuxt-link to="/auth/register">Register</nuxt-link>
          <h6>to watch movies</h6>
        </div>        
      </template>
    </div>
  </div>
</template>

<script>
import Movies from './movies'

export default {
  components: { Movies },
  name: 'IndexPage'
}
</script>

<style scoped>
  .center {
      margin: auto;
      margin-top: 30px;
  width: 60%;
  padding: 10px;
  text-align: center;
  }
  
</style> 
