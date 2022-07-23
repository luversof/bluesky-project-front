<script>
	import '../app.css';
	import Header from '$lib/components/headers/Header.svelte';
	import '@fortawesome/fontawesome-free/js/all.min.js';
	import { session } from '$app/stores';
</script>

<Header />

<div class="mt-14">
	<slot />
</div>
