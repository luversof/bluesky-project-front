<script context="module">
	// export const load = async ({ params, fetch, session, stuff }) => {
	// 	console.log('ASDFAAAAA');
	// 	console.log(session);
	// 	const url = `/api/user/loginInfo`;
	// 	const response = await fetch(url, {
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			Accept: 'application/json'
	// 		}
	// 	});

	// 	if (response.ok) {
	// 		session = await response.json();
	// 		// return {
	// 		// 	status: response.status,
	// 		// 	props: {
	// 		// 		userInfo: response.ok && (await response.json())
	// 		// 	}
	// 		// };
	// 	}

	// 	// console.log('222');
	// 	// return {
	// 	// 	status: 200,
	// 	// 	props: {
	// 	// 		userInfo: {}
	// 	// 	}
	// 	// };
	// 	console.log('session : ', session);
	// 	return {
	// 		status: 200,
	// 		props: {
	// 			session
	// 		}
	// 	};
	// };
</script>

<script>
	import '../app.css';
	import BlueskyNavBar from '$lib/BlueskyNavBar.svelte';
	import '@fortawesome/fontawesome-free/js/all.min.js';
	import { session } from '$app/stores';
</script>

<BlueskyNavBar />

<div class="mt-14">
	<slot />
</div>
