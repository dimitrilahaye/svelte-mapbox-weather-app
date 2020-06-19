<script>
  import {afterUpdate, getContext, onMount} from 'svelte';
  import {mapbox} from './mapbox.js';
  import {mapKey} from './Map.svelte';

  export let lat;
  export let lng;

  const {getMap} = getContext(mapKey);
  const map = getMap();

  let dom;
  let marker;
  let popup;

  /**
   * On mount, we create the marker and display the popup
   */
  onMount(() => {
    popup = addPopup();
    marker = addMarker();
    return () => {
      marker.remove();
      popup.remove();
    };
  });

  /**
   * Update marker and popup according to new city
   */
  afterUpdate(() => {
    if (marker && popup) {
      popup.off('close', close);
      popup.remove();
      popup = addPopup();
      marker.remove();
      marker = addMarker();
      popup.on('close', close);
    }
  });

  /**
   * Add new popup to the map
   * @return {Popup}
   */
  const addPopup = () => {
    return new mapbox.Popup({offset: 25})
        .setDOMContent(dom)
        .setLngLat([lng, lat])
        .addTo(map);
  };

  /**
   * Add new marker to the map
   * @return {Marker}
   */
  const addMarker = () => {
    return new mapbox.Marker()
        .setLngLat([lng, lat])
        .addTo(map);
  };

  const close = () => marker.remove();
</script>

<div bind:this={dom}>
  <slot></slot>
</div>
