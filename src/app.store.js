import {writable} from 'svelte/store';
import {config} from './openweathermap';

//region Cities store
/**
 * Get the cities store
 */
const createCitiesStore = () => {
  const {subscribe, update, set} = writable(undefined);
  return {
    subscribe,
    set,
    getCities$: async (name) => {
      const res = await getCities(name);
      update(state => (state = res));
    },
  }
};

/**
 * Get the list of cities according to the given name
 * @param name
 */
const getCities = async (name) => {
  const response = await fetch(`${config.urls.data}?q=${name}&type=like&appid=${config.token}`);
  const cities = await response.json();

  if (response.ok) {
    return cities.list;
  }
  return {error: response.statusText};
};

export const cityStore = createCitiesStore();

//endregion

//region Weather store
/**
 * Get the Weather store
 */
const createWeatherStore = () => {
  const {subscribe, update} = writable([]);
  return {
    subscribe,
    getWeatherByCityId$: async (id) => {
      const res = await getWeatherByCityId(id);
      update(state => (state = res));
    },
    getWeatherByCoordinates$: async (coordinates) => {
      const {lng, lat} = coordinates;
      const res = await getWeatherByCoordinates(lng, lat);
      update(state => (state = res));
    }
  }
};

/**
 * Get the weather for a given city id
 * @param id
 */
async function getWeatherByCityId(id) {
  const response = await fetch(`${config.urls.api}?id=${id}&appid=${config.token}`);
  const weather = await response.json();

  if (response.ok) {
    return weather;
  }
  return {error: `${response.statusText}: ${weather.message}`};
}

/**
 * Get the weather for a given coordinates
 * @param lng
 * @param lat
 */
async function getWeatherByCoordinates(lng, lat) {
  const response = await fetch(`${config.urls.api}?lat=${lat}&lon=${lng}&appid=${config.token}`);
  const weather = await response.json();

  if (response.ok) {
    return weather;
  }
  return {error: `${response.statusText}: ${weather.message}`};
}

export const weatherStore = createWeatherStore();

//endregion
