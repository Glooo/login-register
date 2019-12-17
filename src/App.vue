<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
  /* width: 100%; */
  min-height: 600px;
  /* background-image: url() */
  background: #89E6DE;
}
</style>
<style lang="less" scoped>

#app {
  background: rgba(0, 0, 0, 0);
  width: 100%;
  padding: 0;
  margin: 0;
  min-width: 300px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
// @media screen and (max-width: 400px) {
//   body {
//     background: #000;
//   }
// }
</style>
