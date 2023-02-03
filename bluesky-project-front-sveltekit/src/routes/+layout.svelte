<script lang="ts">
	import '../app.css';
	import Navbars from '$lib/Navbars.svelte';
</script>

<div class="border border-red-400">
	<div>
		<Navbars />
	</div>
	<div>
		<slot />
	</div>
</div>
