<template>
  <div>
    
       <Head></Head>
    
      <router-view />
  </div>
</template>

<script>
import Head from "@/components/head";
export default {
  components: {
    Head
  }
};
</script>

<style scoped>
</style>
