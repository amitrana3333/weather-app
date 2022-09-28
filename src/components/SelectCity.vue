<script lang="ts">
import { defineComponent } from "vue";
import { CityJson } from "../utils/FakeData";
import { store } from "../views/HomeStore";
interface IProps {
  country: string;
  id: number;
  name: string;
}
export default defineComponent({
  name: "SelectCity",
  data() {
    return {
      store,
      cityoptions: [] as IProps[],
    };
  },
  methods: {
    handleChange(event: Event) {
      const { value } = event.target as HTMLSelectElement;
      store.selectedCity = parseInt(value);
    },
  },
  created() {
    this.cityoptions = CityJson;
    store.selectedCity = CityJson[0].id;
  },
});
</script>

<template>
  <div>
    <label>Select City - </label>
    <select @change="handleChange">
      <option v-for="city in cityoptions" :value="city.id">
        {{ city.name }}
      </option>
    </select>
  </div>
</template>
<style scoped>
div {
  display: flex;
  justify-content: center;
  font-size: large;
  align-items: baseline;
}
select {
  background-color: aliceblue;
  margin-left: 10px;
  width: 25%;
  height: 23px;
  border-radius: 2px;
  outline: none;
  border: none;
  border-bottom: 1px solid;
  margin-bottom: 35px;
}
</style>
