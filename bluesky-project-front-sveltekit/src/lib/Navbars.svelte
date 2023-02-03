<script lang="ts">
	import { getLoginInfo, loginInfoStore } from '$lib/loginInfo';
	let loginInfoPromise = getLoginInfo();
</script>

<nav class="border border-blue-400 grid grid-cols-2">
	<div>
		<ul class="grid gap-1 grid-flow-col auto-cols-max">
			<li><a href="/">Home</a></li>
			<li><a href="/bookkeeping">Bookkeeping</a></li>
		</ul>
	</div>

	<div>
		{#await loginInfoPromise}
			waiting...
		{:then loginInfo}
			{#if loginInfo.login}
				username : {loginInfo.username}
			{:else}
				not login
				<a href="/login">로그인</a>
			{/if}
		{:catch error}
			error : {error.message}
		{/await}

		{$loginInfoStore?.username}
	</div>
</nav>
