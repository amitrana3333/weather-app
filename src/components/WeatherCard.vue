<script lang="ts">
import type { RootObject } from "@/models";
import { defineComponent, type PropType } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
library.add(faTwitter);
export default defineComponent({
  name: "WeatherCard",
  props: {
    weatherData: Object as PropType<RootObject>,
  },
});
</script>
<template>
  <div
    class="wth-card"
    v-if="weatherData && weatherData.weather && weatherData.weather.length"
  >
    <div>
      <div>{{ weatherData.name }}</div>
      <div>
        <font-awesome-icon
          :icon="
            weatherData.weather[0]?.main === 'Clouds'
              ? 'fa fa-cloud'
              : weatherData.weather[0]?.main === 'Rain'
              ? 'fa fa-cloud-rain'
              : 'fa fa-sun'
          "
          :class="
            weatherData.weather[0]?.main === 'Clouds' ||
            weatherData.weather[0]?.main === 'Rain'
              ? 'cloud-clr'
              : 'sun-clr'
          "
        />
        <span>{{ Math.round(weatherData?.main?.temp - 273.15) }}°c</span>
      </div>
      <span>{{ weatherData.weather[0]?.main }}</span>

      <main>{{ weatherData?.weather[0]?.description }}</main>
      <main>wind speed - {{ weatherData?.wind?.speed }}</main>
    </div>
  </div>
</template>
<style scoped>
.wth-card {
  text-transform: capitalize;
  display: flex;
  padding: 10px;
  margin: auto;
  width: 15%;
  backdrop-filter: blur(20px);
  background: rgba(0, 0, 0, 0.25);
  border-radius: 6px;
}
div {
  font-size: 18px;
  line-height: 1.52;
  margin-right: 0;
  max-width: 139px;
}
span {
  margin-left: 10px;
}
main {
  font-size: small;
}
</style>
