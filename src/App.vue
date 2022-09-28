<script lang="ts">
import { defineComponent } from "vue";
import HomeView from "./views/HomeView.vue";
import { store } from "./views/HomeStore";
export default defineComponent({
  components: {
    HomeView,
  },
  data() {
    return {
      store,
    };
  },
});
</script>

<template>
  <header>
    <h2>Weather App</h2>
    <p>{{ store.cityName }}</p>
  </header>
  <main>
    <HomeView />
  </main>
</template>
<style>
body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #fff;
  background: url("./src/assets/sunset.jpg");
  background-color: #cccccc; /* Used if the image is unavailable */
  height: 250px; /* You must set a specified height */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
}
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 15px 0 15px;
  margin-bottom: 10px;
}
</style>
