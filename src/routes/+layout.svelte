<script>
	import './styles.css';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';

	onMount(() => {
		if ('serviceWorker' in navigator && import.meta.env.PROD) {
			navigator.serviceWorker.register(`${base}/service-worker.js`).catch((error) => {
				console.error('Service worker registration failed', error);
			});
		}
	});
</script>

<div class="app">
	<main>
		<slot />
	</main>
</div>

<style>
</style>
