<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>
<script>
import axios from "axios";
import api from "../mock/api.js";
export default {
  async created() {
    let res = await axios.get(api.getUserInfo);
    console.log(res);
  }
};
</script>
<style lang="scss">
$black: black;
$yellow: yellow;

h2 {
  font-size: 40px;
  color: $black;
  background: $yellow;
  text-align: center;
}
</style>

