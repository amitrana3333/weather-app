import axios from "axios";
const BaseUrl = "http://localhost:3001/api/weather";

export const getWeatherByCityId = async (cityId: number) => {
  try {
    const result = await axios.get(`${BaseUrl}/city/${cityId}`);
    return result.data;
  } catch (err) {
    if (err instanceof TypeError) {
      return { error: err, message: err.message };
    }
  }
};

export const getWeatherForeCastByCityId = async (cityId: number) => {
  try {
    const result = await axios.get(`${BaseUrl}/city/forecast/${cityId}`);
    return result.data;
  } catch (err) {
    if (err instanceof TypeError) {
      return { error: err, message: err.message };
    }
  }
};
