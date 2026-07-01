<script lang="ts">
	import HomeSections from "$lib/components/home/HomeSections.svelte";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();
	console.log(data, "home data");
</script>

<svelte:head>
	<title>Northern Trails</title>
</svelte:head>

{#if data.homePage?.sections?.length}
	<HomeSections homePageSections={data.homePage.sections} />
{:else}
	<p class="mx-auto max-w-6xl px-6 py-24 text-center text-stone-500">
		Home page content is not available yet.
	</p>
{/if}
