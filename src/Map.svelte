<script context="module">
  export const mapKey = {};
</script>
<script>
  import {onMount, setContext, afterUpdate, createEventDispatcher} from 'svelte';
  import {mapbox} from './mapbox.js';

  export let lat;
  export let lng;
  export let zoom;

  setContext(mapKey, {
    getMap: () => map
  });

  let container;
  let map;
  let dispatch = createEventDispatcher();

  /**
   * Trigger event with coordinates when we click on the map
   * @param coordinates
   */
  const clickOnMap = (coordinates) => {
    dispatch('clickonmap', {coordinates});
  };

  /**
   * On mount, create new map
   */
  onMount(() => {
    map = new mapbox.Map({
      container,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    });
    map.on('click', function (e) {
      clickOnMap(e.lngLat);
    });
    return () => {
      map.remove();
    };
  });

  /**
   * Update map's center
   */
  afterUpdate(() => {
    if (map) {
      map.setCenter([lng, lat]);
    }
  });
</script>

<style>
  div {
    width: 100%;
    height: 100%;
  }
</style>

<div bind:this={container}>
    {#if map}
      <slot></slot>
    {/if}
</div>
