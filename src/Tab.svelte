<script>
  import { getContext } from 'svelte';
  import { tabKey } from './Tabs.svelte';

  const tab = {};
  const { registerTab, selectTab, selectedTab } = getContext(tabKey);

  registerTab(tab);
</script>

<style>
  button {
    background: none;
    border: none;
    border-bottom: 2px solid white;
    border-radius: 0;
    margin: 0;
    color: #ccc;
    cursor: pointer;
    padding: 15px;
    font-size: 18px;
  }

  .selected {
    border-bottom: 2px solid gray;
    color: #333;
  }
</style>

<button class:selected="{$selectedTab === tab}" on:click="{() => selectTab(tab)}">
  <slot></slot>
</button>
