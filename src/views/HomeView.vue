<script lang="ts">
import { defineComponent } from "vue";
import SelectCity from "@/components/SelectCity.vue";
import WeatherCard from "@/components/WeatherCard.vue";
import ForeCast from "@/components/ForeCast.vue";
import { store } from "./HomeStore";
import type { RootObject } from "@/models";
import { getWeatherByCityId } from "@/api";
export default defineComponent({
  name: "HomeView",
  data() {
    return {
      store,
      weatherData: {} as RootObject,
    };
  },
  components: {
    SelectCity,
    WeatherCard,
    ForeCast,
  },
  watch: {
    "store.selectedCity": function (oldState, _) {
      const cityID = oldState;
      getWeatherByCityId(cityID).then((res) => {
        const { weatherData } = res;
        this.weatherData = weatherData as RootObject;
        store.cityName = weatherData.name;
      });
    },
  },
});
</script>

<template>
  <SelectCity />
  <WeatherCard :weatherData="weatherData" />
  <ForeCast :isDisplay="store.cityName ? true : false" />
</template>
