<script context="module">
	export async function load({ params, fetch, session, stuff }) {
		console.log('ASDFAAAAA');
		const url = `/api/user/loginInfo`;
		const response = await fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		});

		console.log('111');
		if (response.ok) {
			return {
				status: response.status,
				props: {
					userInfo: response.ok && (await response.json())
				}
			};
		}

		console.log('222');
		return {
			status: 200,
			props: {
				userInfo: {}
			}
		};
	}
</script>

<script>
	import '../app.css';
	import BlueskyNavBar from '$lib/BlueskyNavBar.svelte';
	import '@fortawesome/fontawesome-free/js/all.min.js';
</script>

<BlueskyNavBar />

<div class="mt-14">
	<slot />
</div>
