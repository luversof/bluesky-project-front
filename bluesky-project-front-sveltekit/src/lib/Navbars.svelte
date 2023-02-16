<script lang="ts">
	import { loginInfoStore } from '$lib/loginInfo';
</script>

<nav class="border border-blue-400 grid grid-cols-2 px-3 py-4">
	<div>
		<ul class="grid gap-1 grid-flow-col auto-cols-max">
			<li><a href="/">Home</a></li>
			<li><a href="/board">Board</a></li>
			<li><a href="/blog">Blog</a></li>
			<li><a href="/bookkeeping">Bookkeeping</a></li>
		</ul>
	</div>

	<div class="text-right">
		{#if $loginInfoStore}
			{#if $loginInfoStore.login}
				username : {$loginInfoStore.username}
			{:else}
				<a href="/oauth2/authorization/github">github 로그인</a>
				<a href="/oauth2/authorization/github-local">github local 로그인</a>
			{/if}
		{:else}
			waiting...
		{/if}
	</div>
</nav>
