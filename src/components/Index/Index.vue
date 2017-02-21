<template>
  <div id="index">
    <button @click="turnTo('/Login')">To Login</button>
    <button @click="turnTo('/component0')">To component0</button>
  </div>
</template>
<script>
  export default {
    methods: {
      turnTo(path) {
        this.$router.push(path);
      }
    }
  }
</script>
