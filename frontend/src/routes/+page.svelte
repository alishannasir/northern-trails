<script lang="ts">
	import { motion } from '@humanspeak/svelte-motion';
</script>

<main class="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-white">
	<motion.div
		class="max-w-xl text-center"
		initial={{ opacity: 0, y: 24 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.6, ease: 'easeOut' }}
	>
		<p class="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
			Northern Trails
		</p>
		<h1 class="text-4xl font-bold tracking-tight sm:text-5xl">SvelteKit is ready</h1>
		<p class="mt-4 text-lg text-slate-300">
			Bun, Tailwind CSS, and Svelte Motion are configured and ready to build with.
		</p>
	</motion.div>
</main>
