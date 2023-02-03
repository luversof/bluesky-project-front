<script lang="ts">
	import { loginInfoStore } from '$lib/loginInfo';

	$: {
		console.log('bookkeeping nav ', $loginInfoStore);
	}
</script>

<div class="grid gap-1 grid-flow-col auto-cols-max">
	<div>bookkeeping nav</div>
	<div><slot /></div>
</div>
