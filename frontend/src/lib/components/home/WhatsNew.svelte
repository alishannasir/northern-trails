<script lang="ts">
	import type {
		WhatsNewSectionComponent,
		StrapiTrail,
	} from "$lib/types/strapi";
	import { strapiMediaUrl } from "$lib/strapi/media";

	let { section }: { section: WhatsNewSectionComponent } = $props();

	const trails = $derived(section.trails ?? []);
	console.log(trails, "trails");
	const layout = $derived(section.layout ?? "equal");

	const getTrailImage = (trail: StrapiTrail) => {
		if (trail.photos && trail.photos.length > 0) {
			return strapiMediaUrl(trail.photos[0].url);
		}
		return "/images/placeholder-trail.jpg";
	};

	const getTrailAlt = (trail: StrapiTrail) => {
		if (trail.photos && trail.photos.length > 0) {
			return trail.photos[0].alternativeText ?? trail.title;
		}
		return trail.title;
	};
</script>

<section class="whats-new bg-white py-24 px-6 sm:px-10">
	<div class="mx-auto max-w-7xl">
		{#if section.title}
			<header class="mb-16 flex items-center justify-between">
				<h2
					class="text-sm font-medium tracking-[0.3em] uppercase text-stone-400"
				>
					{section.title}
				</h2>
				<div class="h-px flex-1 bg-stone-100 ml-8"></div>
			</header>
		{/if}

		<div class="grid gap-12 sm:gap-x-10 sm:gap-y-16">
			{#each trails as trail, i}
				{@const isEvenRow = Math.floor(i / 2) % 2 === 0}
				<!-- 
					We handle the layout logic here. 
					"at least two trails should be in one row" 
				-->
				<div
					class="trail-card group flex flex-col
					{layout === 'equal' ? 'col-span-12 sm:col-span-6' : ''}
					{layout === 'asymmetric'
						? i % 2 === 0
							? 'col-span-12 sm:col-span-5'
							: 'col-span-12 sm:col-span-7'
						: ''}"
				>
					<div
						class="relative aspect-[4/5] overflow-hidden rounded-sm bg-stone-100 sm:aspect-[3/2]"
					>
						<img
							src={getTrailImage(trail)}
							alt={getTrailAlt(trail)}
							class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
							loading="lazy"
						/>

						<!-- Subtle vignette for premium feel -->
						<div
							class="absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
						></div>
					</div>

					<div class="mt-6 flex items-start justify-between gap-6">
						<!-- Left side: Title and Summary -->
						<div class="flex-1">
							<h3
								class="text-xl font-light text-stone-900 tracking-tight sm:text-2xl group-hover:text-stone-600 transition-colors duration-300"
							>
								{trail.title}
							</h3>
							{#if trail.summary}
								<p
									class="mt-2 text-sm text-stone-500 leading-relaxed max-w-md line-clamp-2"
								>
									{trail.summary}
								</p>
							{/if}
						</div>

						<!-- Right side: Distance and Difficulty -->
						<div class="flex flex-col items-end pt-1">
							<div class="flex flex-col items-end gap-1">
								{#if trail.distance_km}
									<span
										class="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-stone-400"
									>
										{trail.distance_km} KM
									</span>
								{/if}
								{#if trail.difficulty}
									<span
										class="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-stone-800"
									>
										{trail.difficulty}
									</span>
								{/if}
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.whats-new {
		font-family: "DM Sans", sans-serif;
	}

	h2,
	h3 {
		font-family: "Playfair Display", serif;
	}

	/* Force at least two items per row on screens larger than mobile */
	@media (min-width: 640px) {
		.grid {
			grid-template-columns: repeat(12, minmax(0, 1fr));
		}
	}

	.trail-card {
		transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.trail-card:hover {
		transform: translateY(-4px);
	}
</style>
