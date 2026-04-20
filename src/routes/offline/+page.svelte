<script>
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Flip Phone — hors ligne</title>
	<meta
		name="description"
		content="Flip Phone est accessible hors connexion grâce à son service worker."
	/>
</svelte:head>

<section class="offline-page">
	<p class="eyebrow">Mode hors ligne</p>
	<h1>Vous êtes hors connexion</h1>
	<p>
		L’application a été mise en cache par le service worker. Reconnectez-vous puis rechargez la page pour reprendre le jeu.
	</p>
	<a class="home-link" href={`${base}/`}>Retour à l’accueil</a>
</section>

<style>
	.offline-page {
		min-height: 100vh;
		display: grid;
		align-content: center;
		justify-items: center;
		gap: 1rem;
		padding: 2rem;
		text-align: center;
		background: var(--random-background);
		color: var(--random-color, #000);
	}

	.offline-page h1 {
		max-width: 12ch;
		font-size: clamp(2.5rem, 8vw, 5rem);
		line-height: 0.95;
	}

	.offline-page p {
		max-width: 34rem;
		font-size: 1.1rem;
		line-height: 1.5;
	}

	.eyebrow {
		font-size: 0.875rem;
		text-transform: uppercase;
		letter-spacing: 0.2em;
	}

	.home-link {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 1rem 1.5rem;
		background: #000;
		color: #fff;
		text-decoration: none;
		font-weight: 600;
	}
</style>


