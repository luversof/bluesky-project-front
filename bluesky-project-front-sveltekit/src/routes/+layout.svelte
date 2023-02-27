<script lang="ts">
	import { beforeUpdate, afterUpdate } from 'svelte';
	import { getLoginInfo } from '$lib/loginInfo';
	import '../app.css';
	import Navbars from '$lib/components/navbars/Navbars.svelte';

	//beforeUpdate가 두번 실행되는 버그가 있어서 임시로 afterUpdate로 변경함
	//https://github.com/sveltejs/svelte/issues/6016
	afterUpdate(() => {
		getLoginInfo();
	});
</script>

<div>
	<div>
		<Navbars />
	</div>
	<div>
		<slot />
	</div>
</div>
