<script lang="ts">
	import { fade } from "svelte/transition";
	import type {
		HeroSlide,
		StrapiMedia,
		HeroSectionComponent,
	} from "$lib/types/strapi";
	import { strapiMediaUrl } from "$lib/strapi/media";

	type SlideContent = {
		topLeft: string;
		topRight: string;
		titleLine1: string;
		titleLine2: string;
		subtitle: string;
		description: string;
	};

	const AUTOPLAY_MS = 6000;

	let { section }: { section: HeroSectionComponent } = $props();
	let slideItems = $derived(section.slide ?? []);

	let currentIndex = $state(0);
	let isPaused = $state(false);

	const splitHeading = (
		heading: string,
	): { titleLine1: string; titleLine2: string } => {
		const trimmed = heading.trim();
		const words = trimmed.split(/\s+/).filter(Boolean);
		if (words.length <= 2) {
			return { titleLine1: trimmed, titleLine2: "" };
		}

		const half = Math.ceil(words.length / 2);
		return {
			titleLine1: words.slice(0, half).join(" "),
			titleLine2: words.slice(half).join(" "),
		};
	};

	const getEffectiveImage = (
		slide: HeroSlide | null | undefined,
	): StrapiMedia | null => {
		if (!slide) return null;
		return (
			slide.image ||
			(slide.background_images && slide.background_images[0]) ||
			null
		);
	};

	const getImageUrl = (
		slide: HeroSlide | null | undefined,
	): string | null => {
		const image = getEffectiveImage(slide);
		if (!image) return null;
		const imageAny = image as any;
		if (typeof imageAny === "object" && typeof imageAny.url === "string") {
			return strapiMediaUrl(imageAny.url);
		}
		if (typeof imageAny === "object" && imageAny.data?.attributes?.url) {
			return strapiMediaUrl(imageAny.data.attributes.url);
		}
		return null;
	};

	const getImageAlt = (
		slide: HeroSlide | null | undefined,
	): string | null => {
		const image = getEffectiveImage(slide);
		if (!image) return null;
		const imageAny = image as any;
		if (
			typeof imageAny === "object" &&
			typeof imageAny.alternativeText === "string"
		) {
			return imageAny.alternativeText;
		}
		if (
			typeof imageAny === "object" &&
			imageAny.data?.attributes?.alternativeText
		) {
			return imageAny.data.attributes.alternativeText;
		}
		return null;
	};

	const slides = $derived(
		slideItems.map((slide) => {
			const imageUrl = getImageUrl(slide);

			const heading = slide.heading ?? "";
			const { titleLine1, titleLine2 } = splitHeading(heading);

			return {
				image: slide.image,
				imageUrl,
				content: {
					topLeft: slide.nav_left_label ?? "",
					topRight: slide.nav_right_label ?? "",
					titleLine1,
					titleLine2,
					subtitle: slide.episode_label
						? `— ${slide.episode_label} —`
						: "",
					description: slide.description ?? "",
				},
			};
		}),
	);

	const activeSlide = $derived(slides[currentIndex]);

	function goTo(index: number) {
		if (slides.length === 0) return;
		currentIndex =
			((index % slides.length) + slides.length) % slides.length;
	}

	function next() {
		goTo(currentIndex + 1);
	}

	function prev() {
		goTo(currentIndex - 1);
	}

	$effect(() => {
		if (slides.length <= 1 || isPaused) return;

		const intervalId = setInterval(next, AUTOPLAY_MS);
		return () => clearInterval(intervalId);
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link
		rel="preconnect"
		href="https://fonts.gstatic.com"
		crossorigin="anonymous"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,400&family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

{#if activeSlide}
	<section
		class="hero-slider relative h-screen w-full overflow-hidden bg-stone-900"
		onmouseenter={() => (isPaused = true)}
		onmouseleave={() => (isPaused = false)}
		aria-roledescription="carousel"
		aria-label="Hero image slider"
	>
		{#key currentIndex}
			<div
				class="absolute inset-0"
				in:fade={{ duration: 900 }}
				out:fade={{ duration: 900 }}
			>
				{#if activeSlide.imageUrl}
					<img
						src={activeSlide.imageUrl}
						alt={getImageAlt(activeSlide.image) ??
							activeSlide.content.titleLine1}
						class="h-full w-full object-cover"
						loading={currentIndex === 0 ? "eager" : "lazy"}
					/>
				{/if}
				<div
					class="absolute inset-0 bg-linear-to-b from-black/35 via-black/20 to-black/55"
					aria-hidden="true"
				></div>
			</div>
		{/key}

		<div class="pointer-events-none absolute inset-0 z-10 text-white">
			<!-- Top left label: pinned corner -->
			<div class="hero-corner-slot hero-corner-left">
				{#key currentIndex}
					<div
						class="absolute inset-0"
						in:fade={{ duration: 400 }}
						out:fade={{ duration: 300 }}
					>
						<p class="hero-label">{activeSlide.content.topLeft}</p>
					</div>
				{/key}
			</div>

			<!-- Top center brand: static, never moves -->
			<div class="hero-brand-slot hidden sm:flex">
				{#if section.logo_icon}
					<img
						src={strapiMediaUrl(section.logo_icon.url)}
						alt={section.logo_icon.alternativeText ?? "Logo"}
						class="h-10 w-auto opacity-90 object-contain"
					/>
				{:else}
					<svg
						class="h-5 w-5 opacity-90"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						aria-hidden="true"
					>
						<path
							d="M3 18 L12 6 L21 18"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path d="M6 14 L18 14" stroke-linecap="round" />
					</svg>
					<p class="hero-brand text-xs tracking-[0.35em]">
						{section.title ?? "NORTHERN TRAILS"}
					</p>
				{/if}
			</div>

			<!-- Top right label: pinned corner -->
			<div class="hero-corner-slot hero-corner-right">
				{#key currentIndex}
					<div
						class="absolute inset-0"
						in:fade={{ duration: 400 }}
						out:fade={{ duration: 300 }}
					>
						<p class="hero-label text-right">
							{activeSlide.content.topRight}
						</p>
					</div>
				{/key}
			</div>

			<!-- Center title + curved subtitle: fixed position -->
			<div
				class="absolute top-1/2 left-1/2 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 px-6 text-center sm:px-10"
			>
				<svg
					class="mx-auto mb-6 h-6 w-6 opacity-80"
					viewBox="0 0 32 16"
					fill="none"
					stroke="currentColor"
					stroke-width="1.25"
					aria-hidden="true"
				>
					<path
						d="M2 12 C 8 10, 14 6, 22 4"
						stroke-dasharray="2 3"
						stroke-linecap="round"
					/>
					<path
						d="M22 2 L26 4 L22 6 Z"
						fill="currentColor"
						stroke="none"
					/>
				</svg>

				<div
					class="hero-text-slot mx-auto h-[11rem] w-full max-w-3xl sm:h-[12rem]"
				>
					{#key currentIndex}
						<div
							class="absolute inset-0"
							in:fade={{ duration: 500 }}
							out:fade={{ duration: 350 }}
						>
							<h1 class="sr-only">
								{activeSlide.content.titleLine1}
								{activeSlide.content.titleLine2}
							</h1>

							<svg
								class="hero-title-curve"
								viewBox="0 0 800 220"
								role="img"
								aria-label="{activeSlide.content
									.titleLine1} {activeSlide.content
									.titleLine2}"
							>
								<defs>
									<path
										id="hero-title-curve-1"
										d="M 60 130 Q 400 45 740 130"
										fill="none"
									/>
									<path
										id="hero-title-curve-2"
										d="M 100 175 Q 400 105 700 175"
										fill="none"
									/>
									<path
										id="hero-subtitle-curve"
										d="M 120 210 Q 400 185 680 210"
										fill="none"
									/>
								</defs>
								<text class="hero-title-accent-path">
									<textPath
										href="#hero-title-curve-1"
										startOffset="50%"
										text-anchor="middle"
									>
										{activeSlide.content.titleLine1}
									</textPath>
								</text>
								<text class="hero-title-secondary-path">
									<textPath
										href="#hero-title-curve-2"
										startOffset="50%"
										text-anchor="middle"
									>
										{activeSlide.content.titleLine2}
									</textPath>
								</text>
								<text class="hero-subtitle-path">
									<textPath
										href="#hero-subtitle-curve"
										startOffset="50%"
										text-anchor="middle"
									>
										{activeSlide.content.subtitle}
									</textPath>
								</text>
							</svg>
						</div>
					{/key}
				</div>
			</div>

			<!-- Bottom description: fixed position -->
			<div
				class="hero-text-slot absolute right-24 bottom-24 left-6 mx-auto max-w-3xl text-center sm:right-32 sm:bottom-28 sm:left-10"
			>
				{#key currentIndex}
					<p
						class="hero-description"
						in:fade={{ duration: 500 }}
						out:fade={{ duration: 350 }}
					>
						{activeSlide.content.description}
					</p>
				{/key}
			</div>
		</div>

		{#if slides.length > 1}
			<div
				class="absolute right-6 bottom-6 z-20 flex items-center gap-3 sm:right-10 sm:bottom-10"
			>
				<button
					type="button"
					class="hero-control"
					onclick={prev}
					aria-label="Previous slide"
				>
					<span aria-hidden="true">‹</span>
				</button>

				<div class="flex items-center gap-2">
					{#each slides as _, index (index)}
						<button
							type="button"
							class="hero-dot {index === currentIndex
								? 'hero-dot-active'
								: ''}"
							onclick={() => goTo(index)}
							aria-label="Go to slide {index + 1}"
							aria-current={index === currentIndex
								? "true"
								: undefined}
						></button>
					{/each}
				</div>

				<button
					type="button"
					class="hero-control"
					onclick={next}
					aria-label="Next slide"
				>
					<span aria-hidden="true">›</span>
				</button>
			</div>
		{/if}
	</section>
{/if}

<style>
	.hero-text-slot,
	.hero-corner-slot {
		position: relative;
	}

	.hero-corner-slot {
		height: 2.75rem;
		position: absolute;
		top: 2rem;
		width: 11rem;
	}

	.hero-corner-left {
		left: 1.5rem;
		text-align: left;
	}

	.hero-corner-right {
		right: 1.5rem;
		text-align: right;
	}

	@media (min-width: 640px) {
		.hero-corner-slot {
			top: 2.5rem;
		}

		.hero-corner-left {
			left: 2.5rem;
		}

		.hero-corner-right {
			right: 2.5rem;
		}
	}

	.hero-brand-slot {
		align-items: center;
		flex-direction: column;
		gap: 0.5rem;
		left: 50%;
		position: absolute;
		top: 2rem;
		transform: translateX(-50%);
	}

	@media (min-width: 640px) {
		.hero-brand-slot {
			top: 2.5rem;
		}
	}

	.hero-label {
		font-family: "DM Sans", sans-serif;
		font-size: 0.65rem;
		font-weight: 400;
		letter-spacing: 0.28em;
		line-height: 1.5;
		text-transform: uppercase;
	}

	.hero-title-curve {
		display: block;
		height: auto;
		overflow: visible;
		width: 100%;
	}

	.hero-title-accent-path {
		fill: white;
		font-family: "Playfair Display", serif;
		font-size: 72px;
		font-style: italic;
		font-weight: 400;
		letter-spacing: -0.02em;
	}

	.hero-title-secondary-path {
		fill: white;
		font-family: "Playfair Display", serif;
		font-size: 44px;
		font-style: italic;
		font-weight: 400;
		letter-spacing: -0.01em;
	}

	.hero-subtitle-path {
		fill: white;
		font-family: "DM Sans", sans-serif;
		font-size: 12px;
		font-weight: 400;
		letter-spacing: 0.22em;
		text-transform: uppercase;
	}

	.sr-only {
		border: 0;
		clip: rect(0, 0, 0, 0);
		height: 1px;
		margin: -1px;
		overflow: hidden;
		padding: 0;
		position: absolute;
		white-space: nowrap;
		width: 1px;
	}

	.hero-description {
		font-family: "DM Sans", sans-serif;
		font-size: 0.62rem;
		font-weight: 300;
		letter-spacing: 0.18em;
		line-height: 1.8;
		text-transform: uppercase;
	}

	.hero-control {
		align-items: center;
		background: rgb(255 255 255 / 12%);
		border: 1px solid rgb(255 255 255 / 25%);
		border-radius: 9999px;
		color: white;
		cursor: pointer;
		display: inline-flex;
		font-size: 1.25rem;
		height: 2.25rem;
		justify-content: center;
		line-height: 1;
		transition: background-color 150ms ease;
		width: 2.25rem;
	}

	.hero-control:hover {
		background: rgb(255 255 255 / 22%);
	}

	.hero-dot {
		background: rgb(255 255 255 / 35%);
		border: none;
		border-radius: 9999px;
		cursor: pointer;
		height: 0.4rem;
		padding: 0;
		transition:
			background-color 150ms ease,
			width 150ms ease;
		width: 0.4rem;
	}

	.hero-dot-active {
		background: white;
		width: 1.5rem;
	}
</style>
