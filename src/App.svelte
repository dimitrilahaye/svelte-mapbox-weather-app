<svelte:head>
  <link rel="stylesheet" href="https://unpkg.com/mapbox-gl/dist/mapbox-gl.css"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css"/>
</svelte:head>

<script>
  import Map from './Map.svelte';
  import Marker from './Marker.svelte';
  import WeatherDetails from "./WeatherDetails.svelte";
  import {cityStore, weatherStore} from './app.store';
  import {get} from 'lodash';

  let select;
  let apiError;
  let weather;
  let coordinates = {
    lng: -84,
    lat: 35,
  };

  /**
   * Search for the city according to the input value
   */
  const searchForCities = async (e) => {
    const {value} = e.target;
    if (value.length) {
      await cityStore.getCities$(value);
      if (!$cityStore.error) {
        apiError = undefined;
      } else {
        cityStore.set([]);
      }
    } else {
      cityStore.set(undefined);
    }
  };

  /**
   * Call api to get weather by coordinates
   */
  const getWeatherOnClick = async (e) => {
    await weatherStore.getWeatherByCoordinates$(e.detail.coordinates);
    manageWeatherData();
  };

  /**
   * Call api to get weather by city
   */
  const getWeatherByCity = async () => {
    await weatherStore.getWeatherByCityId$(select.value);
    manageWeatherData();
  };

  const manageWeatherData = () => {
    const data = $weatherStore;
    if (get(data, 'error')) {
      apiError = data.error;
      weather = undefined;
    } else {
      apiError = undefined;
      coordinates.lng = data.coord.lon;
      coordinates.lat = data.coord.lat;
      weather = {
        icon: get(data, 'weather[0].icon', ''),
        name: get(data, 'name', ''),
        main: get(data, 'main', {}),
        wind: get(data, 'wind', {}),
        sys: get(data, 'sys', {}),
      };
    }
  };
</script>

<h1>Entrer a full city name or click on the map</h1>
<input on:input={searchForCities} placeholder="enter a city name"/>
{#if $cityStore}
  <select bind:this={select} disabled="{!get($cityStore, 'length')}">
      {#if $cityStore.length}
          {#each $cityStore as city (city.id)}
            <option value={city.id}>{city.name}, {city.sys.country}</option>
          {/each}
      {:else}
        <option>No cities found</option>
      {/if}
  </select>
{/if}
{#if !!get($cityStore, 'length') && !apiError }
  <button on:click={getWeatherByCity}>Get weather</button>
{/if}
{#if apiError}
  <span style="color: red">Error: {apiError}</span>
{/if}

{#if coordinates}
  <Map {...coordinates} zoom={3.5} on:clickonmap={getWeatherOnClick}>
      {#if weather}
        <Marker {...coordinates}>
          <WeatherDetails {...weather}></WeatherDetails>
        </Marker>
      {/if}
  </Map>
{/if}
