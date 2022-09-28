<script lang="ts">
import { defineComponent } from "vue";
import { store } from "@/views/HomeStore";
import { getWeatherForeCastByCityId } from "@/api";
import type { RootObject } from "@/models";
import moment from "moment";

export default defineComponent({
  name: "ForeCast",
  data() {
    return {
      store,
      foreCastData: [] as RootObject[],
      isClicked: false,
    };
  },
  props: {
    isDisplay: Boolean,
  },
  methods: {
    handleClick() {
      if (this.isClicked) {
        this.foreCastData = [];
      }
      this.isClicked = !this.isClicked;
    },
  },
  watch: {
    "store.selectedCity": function (oldState, newState) {
      console.log(oldState, newState);
      if (oldState !== newState) {
        this.isClicked = false;
        this.foreCastData = [];
      }
    },
    isClicked: function (oldState, newState) {
      if (oldState) {
        getWeatherForeCastByCityId(store.selectedCity).then((res) => {
          const { weatherForeCastData } = res;
          const alterData = weatherForeCastData.list.map((elem: RootObject) => {
            const day = moment.unix(elem?.dt).format("ddd");
            const date = moment.unix(elem?.dt).format("MM/DD");
            const time = moment.unix(elem?.dt).format("HH:mm A");
            return { ...elem, day, date, time };
          });
          this.foreCastData = alterData;
        });
      }
    },
  },
  created() {
    console.log(this.isDisplay);
  },
});
</script>
<template>
  <div class="btn-container" v-if="isDisplay">
    <button @click="handleClick">
      {{ isClicked ? "Close ForeCast" : "View ForeCast" }}
    </button>
  </div>
  <div class="container-forecast" v-if="foreCastData.length">
    <div class="forecast-div" v-for="foreCast in foreCastData">
      <div class="day-details">
        <div>
          <b>{{ foreCast.day }}</b>
          <br />
          <span>{{ foreCast.date }}</span>
        </div>
        <div class="time-details">{{ foreCast.time }}</div>
      </div>
      <div class="temp-details">
        <div>
          <font-awesome-icon
            :icon="
              foreCast.weather[0]?.main === 'Clouds'
                ? 'fa fa-cloud'
                : foreCast.weather[0]?.main === 'Rain'
                ? 'fa fa-cloud-rain'
                : 'fa fa-sun'
            "
            :class="
              foreCast.weather[0]?.main === 'Clouds' ||
              foreCast.weather[0]?.main === 'Rain'
                ? 'cloud-clr'
                : 'sun-clr'
            "
          />
          <span>{{ Math.round(foreCast?.main?.temp - 273.15) }}°c</span>
        </div>
      </div>
      <div>
        <span>{{ foreCast.weather[0]?.main }}</span> -
        <span>{{ foreCast.weather[0]?.description }}</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container-forecast {
  display: flex;
  width: 80%;
  flex-direction: column;
  margin: auto;
  margin-top: 2rem;
}
.forecast-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  background: #ffff;
  padding: 10px;
  margin-bottom: 5px;
  color: #000;
  border-radius: 2px;
  box-shadow: 1px 1px 2px 1px;
}
.btn-container {
  display: flex;
  justify-content: center;
  margin-top: 4rem;
  margin-right: 12px;
}
.btn-container button {
  background: #000;
  color: white;
  cursor: pointer;
}

.day-details {
  display: flex;
}
.day-details b {
  font-weight: 500;
}

.day-details span {
  color: grey;
  font-size: 12px;
}
.time-details {
  align-items: center;
  display: flex;
  margin-left: 15px;
  font-size: 12px;
  color: grey;
}
.temp-details {
  display: flex;
  width: 50%;
  font-size: 30px;
}
.temp-details span {
  margin-left: 10px;
}
.cloud-clr {
  color: rgba(199, 197, 197, 0.84);
}
.sun-clr {
  color: rgb(184, 136, 15);
}
</style>
