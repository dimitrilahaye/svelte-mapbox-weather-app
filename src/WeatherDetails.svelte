<script>
  import Tabs from "./Tabs.svelte";
  import Tab from "./Tab.svelte";
  import TabPanel from "./TabPanel.svelte";
  import TabList from "./TabList.svelte";
  import {config} from './openweathermap';

  export let icon;
  export let name;
  export let main;
  export let wind;
  export let sys;

  $: getName = () => `${name ? name : 'NO NAME'} (${sys.country ? sys.country : '-'})`;
  const toDegree = (temp) => Math.round(temp - 273.15);
  const getTimeFromDate = (timestamp) => {
    const pad = (num) => ("0" + num).slice(-2);
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return pad(hours) + " h " + pad(minutes) + " min. " + pad(seconds) + " sec."
  };
</script>

<div>
  <h2 title={getName()}><span class="name">{getName()}</span><span>: {toDegree(main.temp)}°C</span></h2>
  <img src="{config.urls.icon}{icon}.png" alt="icon"/>

  <Tabs>
    <TabList>
      <Tab>Temp. <i class="fa fa-thermometer-three-quarters"></i></Tab>
      <Tab>Wind <i class="fa fa-wind"></i></Tab>
      <Tab>Sun <i class="fa fa-sun"></i></Tab>
    </TabList>

    <TabPanel>
      <ul>
        <li><i class="fa fa-chevron-up"></i> {toDegree(main.temp_max)}°C</li>
        <li><i class="fa fa-chevron-down"></i> {toDegree(main.temp_min)}°C</li>
        <li><i class="fa fa-tachometer-alt"></i> {main.pressure} hPa</li>
        <li><i class="fa fa-tint"></i> {main.humidity}%</li>
      </ul>
    </TabPanel>

    <TabPanel>
      <ul>
        <li><i class="fa fa-wind"></i> {wind.speed} m/s</li>
        <li><i class="fa fa-directions"></i> {wind.deg}°</li>
      </ul>
    </TabPanel>

    <TabPanel>
      <ul>
        <li><i class="fa fa-sun"></i> {getTimeFromDate(sys.sunrise)}</li>
        <li><i class="fa fa-cloud-moon"></i> {getTimeFromDate(sys.sunset)}</li>
      </ul>
    </TabPanel>
  </Tabs>
</div>

<style>
  div {
    background-color: white;
  }

  img {
    display: block;
    margin: 0 auto;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    padding: 5px;
    font-size: 15px;
  }

  li:nth-child(odd) {
    background-color: #c5c5c5;
  }

  li:nth-child(even) {
    background-color: #dddddd;
  }

  li i {
    min-width: 23px;
  }

  span.name {
    max-width: 230px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
  }

  span.name + span {
    display: inline-block;
    overflow: hidden;
  }
</style>
