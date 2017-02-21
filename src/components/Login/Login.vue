<template>
  <div id="Login">
    this is Login Page
    <button @click="turnTo">To Index</button>
  </div>
</template>
<script>
  export default {
    methods: {
      turnTo() {
        this.$router.push('/');
      }
    }
  }
</script>
