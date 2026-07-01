<script lang="ts">
    import type { AllAboutHikingSectionComponent } from "$lib/types/strapi";
    import { strapiMediaUrl } from "$lib/strapi/media";

    let { section }: { section: AllAboutHikingSectionComponent } = $props();

    const splitTitle = (title: string) => {
        const words = title.split(" ");
        if (words.length <= 1) return { line1: title, line2: "" };
        const half = Math.ceil(words.length / 2);
        return {
            line1: words.slice(0, half).join(" "),
            line2: words.slice(half).join(" "),
        };
    };

    const { line1, line2 } = $derived(splitTitle(section.title ?? ""));
</script>

<section class="all-about-hiking bg-white py-20 px-6 sm:px-10">
    <div class="mx-auto max-w-7xl">
        <div
            class="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between mb-20"
        >
            <!-- Title Section -->
            <div class="lg:w-1/2">
                <h2
                    class="title-container flex flex-col text-black leading-tight"
                >
                    <span
                        class="title-line text-7xl font-light uppercase tracking-tight sm:text-8xl lg:text-9xl"
                    >
                        {line1}
                    </span>
                    <span
                        class="title-line text-7xl font-black uppercase tracking-tight sm:text-8xl lg:text-9xl"
                    >
                        {line2}
                    </span>
                </h2>
            </div>
            <!-- Description Section -->
            <div class="lg:w-1/3">
                <div class="prose prose-sm text-black sm:prose-base">
                    {#each (section.description ?? "").split("\n\n") as paragraph}
                        <p class="mb-6 last:mb-0">
                            {paragraph}
                        </p>
                    {/each}
                </div>
            </div>
        </div>

        {#if section.image}
            <div class="overflow-hidden rounded-lg">
                <img
                    src={strapiMediaUrl(section.image.url)}
                    alt={section.image.alternativeText ?? section.title}
                    class="aspect-21/9 w-full object-cover"
                />
            </div>
        {/if}
    </div>
</section>

<style>
    .title-container {
        font-family: "DM Sans", sans-serif;
    }

    .title-line {
        color: #1a4d6e; /* A dark blue-teal color similar to the screenshot, or black as requested */
        color: black;
    }

    @media (min-width: 1024px) {
        .title-line {
            line-height: 0.85;
        }
    }
</style>
