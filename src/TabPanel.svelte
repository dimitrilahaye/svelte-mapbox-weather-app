<script>
  import { getContext } from 'svelte';
  import { tabKey } from './Tabs.svelte';

  const panel = {};
  const { registerPanel, selectedPanel } = getContext(tabKey);

  registerPanel(panel);
</script>

{#if $selectedPanel === panel}
  <slot></slot>
{/if}
