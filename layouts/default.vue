<template>
  <div>
    <top-nav/>
    <Nuxt keep-alive :keep-alive-props="{ max: 10 }" />
  </div>      
</template>

<script>
import TopNav from './partials/TopNav.vue'
export default {
  components: { TopNav },
    
}
</script>