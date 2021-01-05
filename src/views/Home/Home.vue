<template>
  <div class="home">
    <nav-top></nav-top>
    <nav-menu></nav-menu>
  </div>
</template>

<script>
import NavMenu from "./HomeChildren/NavMenu";
import NavTop from "./HomeChildren/NavTop";

export default {
  components: {
    NavMenu,
    NavTop,
  },
};
</script>

<style>
</style>