<script lang="ts">
	import { beforeUpdate, afterUpdate } from 'svelte';
	import { getLoginInfo } from '$lib/loginInfo';
	import '../app.css';
	import Navbars from '$lib/Navbars.svelte';

	beforeUpdate(() => {
		getLoginInfo();
		console.log('layout beforeUpdate');
	});
</script>

<div class="border border-red-400">
	<div>
		<Navbars />
	</div>
	<div>
		<slot />
	</div>
</div>
