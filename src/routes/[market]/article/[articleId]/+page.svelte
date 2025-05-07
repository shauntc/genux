<script lang="ts">
  import { onMount } from "svelte";
  import type { PageProps } from "./$types";
  let content = $state("");
  let isLoading = $state(true);
  let { data }: PageProps = $props();
  async function get() {
    isLoading = true;
    const response = await fetch(
      `/api/article?market=${data.market}&id=${data.articleId}`
    );
    if (response.ok != true) {
      return;
    }
    content = await response.text();
    isLoading = false;
  }

  onMount(() => {
    get();
  });
</script>

{#if isLoading}
  <div class="flex justify-center items-center min-h-[200px]">
    <div class="spinner"></div>
  </div>
{:else}
  {@html content}
{/if}

<style>
  .spinner {
    width: 2rem;
    height: 2rem;
    border: 2px solid transparent;
    border-top-color: currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    color: #000000;
  }

  @media (prefers-color-scheme: dark) {
    .spinner {
      color: #ffffff;
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
