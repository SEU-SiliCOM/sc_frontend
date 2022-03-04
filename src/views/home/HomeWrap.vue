<template>
  <home-nav-bar/>
  <div class="background"/>
  <div class="content-wrap">
    <router-view/>
  </div>
</template>

<script>
  import HomeNavBar from "components/bar/HomeNavBar";

  export default {
    name: "HomeWrap",
    components: {
      HomeNavBar
    }
  }
</script>

<style scoped>
  @media screen and (min-width: 840px) {
    .content-wrap {
      width: 56%;
      margin: 64px auto;
    }
  }

  @media screen and (max-width: 840px) {
    .content-wrap {
      margin: 98px 0 0;
    }
  }
</style>