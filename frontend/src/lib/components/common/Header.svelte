<script lang="ts">
    import { strapiMediaUrl } from "$lib/strapi/media";
    import type { StrapiHeader } from "$lib/types/strapi";

    let { header }: { header: StrapiHeader | null } = $props();

    let logoUrl = $derived(strapiMediaUrl(header?.logo?.url));
    let navLinks = $derived(header?.nav_links ?? []);
</script>

<header
    class="fixed top-0 left-0 z-50 w-full px-6 py-6 transition-all duration-300 sm:px-10"
>
    <div class="mx-auto flex max-w-7xl items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center">
            <a href="/" class="flex items-center gap-3">
                {#if logoUrl}
                    <img
                        src={logoUrl}
                        alt={header?.logo?.alternativeText ??
                            "Northern Trails Logo"}
                        class="h-18 w-auto object-contain"
                    />
                {:else}
                    <span
                        class="text-xs font-medium tracking-[0.4em] text-white uppercase sm:text-sm"
                    >
                        Northern Trails
                    </span>
                {/if}
            </a>
        </div>

        <!-- Navigation -->
        <nav class="hidden md:block">
            <ul class="flex items-center gap-8">
                {#each navLinks as link}
                    <li>
                        <a
                            href={link.url ?? "#"}
                            class="text-[10px] font-medium tracking-[0.2em] text-white/90 uppercase transition-colors hover:text-white"
                        >
                            {link.label}
                        </a>
                    </li>
                {/each}
            </ul>
        </nav>

        <!-- Mobile Menu Button (Placeholder) -->
        <div class="md:hidden">
            <button class="text-white/90" aria-label="Open menu">
                <svg
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>
        </div>
    </div>
</header>

<style>
    header {
        /* Optional: Add a subtle text shadow to ensure legibility over bright images */
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }
</style>
