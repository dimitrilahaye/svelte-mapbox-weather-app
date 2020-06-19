<script context="module">
  export const tabKey = {};
</script>
<script>
  import {setContext} from 'svelte';
  import {writable} from 'svelte/store';

  const tabs = [];
  const panels = [];
  const selectedTab = writable(null);
  const selectedPanel = writable(null);

  setContext(tabKey, {
    /**
     * Register a new tab, select it if no other has been already selected
     * @param tab
     */
    registerTab: tab => {
      tabs.push(tab);
      selectedTab.update(current => current || tab);
    },

    /**
     * Register a new panel, select it if no other has been already selected
     * @param panel
     */
    registerPanel: panel => {
      panels.push(panel);
      selectedPanel.update(current => current || panel);
    },

    /**
     * Select a tab on click, then select the panel too
     * @param tab
     */
    selectTab: tab => {
      const i = tabs.indexOf(tab);
      selectedTab.set(tab);
      selectedPanel.set(panels[i]);
    },

    selectedTab,
    selectedPanel
  });
</script>

<div class="tabs">
  <slot></slot>
</div>
