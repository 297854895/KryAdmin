<template>
  <div id="notFound">
    NotFound this page!!!!
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
