<script lang="ts">
  import { onMount } from "svelte";
  import type { PageProps } from "./$types";
  let { data }: PageProps = $props();
  let content = $state("");
  console.log("market s", data.market);

  async function stream() {
    const response = await fetch(`/api/feed/stream?market=${data.market}`);
    if (response.ok != true) {
      return;
    }
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    while (reader != null) {
      console.log("stream:while");
      const { done, value } = await reader.read();
      if (done) return;
      var text = decoder.decode(value);
      content += text;
    }
  }

  onMount(() => {
    stream();
  });
</script>

{@html content}
