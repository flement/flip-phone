import { build, files, version } from '$service-worker';

const CACHE = `flip-phone-${version}`;
const OFFLINE_URL = new URL('offline', self.location.href).href;
const ASSETS = [...new Set([...build, ...files, OFFLINE_URL])];

self.addEventListener('install', (event) => {
	event.waitUntil(
		(async () => {
			const cache = await caches.open(CACHE);
			await cache.addAll(ASSETS);
			self.skipWaiting();
		})()
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		(async () => {
			const cacheKeys = await caches.keys();
			await Promise.all(cacheKeys.map((key) => (key === CACHE ? null : caches.delete(key))));
			await self.clients.claim();
		})()
	);
});

self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return;

	const url = new URL(event.request.url);
	if (url.origin !== self.location.origin) return;

	event.respondWith(
		(async () => {
			const cache = await caches.open(CACHE);

			try {
				const response = await fetch(event.request);

				if (response.ok) {
					cache.put(event.request, response.clone());
				}

				return response;
			} catch {
				const cached = await cache.match(event.request);
				if (cached) return cached;

				if (event.request.mode === 'navigate') {
					return (await cache.match(OFFLINE_URL)) ?? Response.error();
				}

				return Response.error();
			}
		})()
	);
});


