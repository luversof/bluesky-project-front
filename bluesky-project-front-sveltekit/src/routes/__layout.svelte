<script>
	import { Styles } from 'sveltestrap';
	import BlueskyNavBar from '$lib/BlueskyNavBar.svelte';
	import '@fortawesome/fontawesome-free/js/all.min.js';
</script>

<Styles />
<BlueskyNavBar />

<slot />
