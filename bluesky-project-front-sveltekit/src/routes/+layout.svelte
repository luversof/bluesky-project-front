<script lang="ts">
	import { beforeUpdate, afterUpdate } from 'svelte';
	import { getLoginInfo } from '$lib/loginInfo';
	import '../app.css';
	import Navbars from '$lib/Navbars.svelte';

	//beforeUpdate가 두번 실행되는 버그가 있어서 임시로 afterUpdate로 변경함
	//https://github.com/sveltejs/svelte/issues/6016
	afterUpdate(() => {
		getLoginInfo();
		console.log('layout afterUpdate');
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
