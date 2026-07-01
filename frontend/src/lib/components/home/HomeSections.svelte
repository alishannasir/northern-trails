<script lang="ts">
	import type {
		HomePageSection,
		HeroSectionComponent,
	} from "$lib/types/strapi";
	import {
		isHeroSection,
		isAllAboutHikingSection,
		isWhatsNewSection,
	} from "$lib/types/strapi";
	import HeroSlider from "./HeroSlider.svelte";
	import AllAboutHiking from "./AllAboutHiking.svelte";
	import WhatsNew from "./WhatsNew.svelte";

	let { homePageSections }: { homePageSections: HomePageSection[] } =
		$props();

	// svelte-ignore state_referenced_locally
	console.log("homePageSections", homePageSections);
</script>

{#each homePageSections as section, index (`${section.__component}-${section.id}-${index}`)}
	{#if isHeroSection(section) && section.slide?.length}
		<HeroSlider {section} />
	{:else if isAllAboutHikingSection(section)}
		<AllAboutHiking {section} />
	{:else if isWhatsNewSection(section)}
		<WhatsNew {section} />
	{/if}
{/each}
