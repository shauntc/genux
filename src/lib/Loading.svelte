<script lang="ts">
  export let text = "Loading...";
  export let size = "medium";

  $: sizeClass = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  }[size];
</script>

<div class="flex flex-col items-center justify-center gap-2">
  <div class={`${sizeClass} rounded-full bg-primary animate-pulse`}></div>
  {#if text}
    <span class="text-sm text-gray-500">{text}</span>
  {/if}
</div>

<style>
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
</style>
