<script lang="ts">
  import WarningIcon from 'radicle-design-system/icons/ExclamationCircle.svelte';
  import InfoCircle from 'radicle-design-system/icons/InfoCircle.svelte';
  export let type: 'warning' | 'info' = 'warning';
  export let size: 'normal' | 'small' = 'normal';
</script>

<div class="annotation-box typo-text-small {type} {size}">
  <div class="content">
    {#if type === 'warning'}
      <WarningIcon style="height: 1.25rem; width: 1.25rem; fill: var(--color-caution-level-6)" />
    {:else}
      <InfoCircle style="height: 1.25rem; width: 1.25rem; fill: var(--color-primary-level-6)" />
    {/if}
    <p>
      <slot />
    </p>
  </div>
</div>

<style>
  .annotation-box {
    border-radius: 1rem 0 1rem 1rem;
    padding: 0.75rem;
    text-align: left;
  }

  .annotation-box > .content {
    display: flex;
    gap: 0.5rem;
  }

  .annotation-box.small {
    border-radius: 0.75rem 0 0.75rem 0.75rem;
    padding: 0.5rem;
    background-color: red;
    border-color: none;
  }

  .annotation-box.warning {
    background-color: var(--color-caution-level-1);
    border: 1px solid var(--color-caution-level-6);
    color: var(--color-caution-level-6);
  }

  .annotation-box.info {
    background-color: var(--color-primary-level-1);
    border: 1px solid var(--color-primary-level-6);
  }
</style>
