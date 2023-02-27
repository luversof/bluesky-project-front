<script lang="ts">
	import { loginInfoStore } from '$lib/loginInfo';
	import Button from '$lib/components/navbars/Button.svelte';
</script>

<nav class="grid grid-cols-2 items-center">
	<div class="">
		<ul class="flex">
			<li><Button href="/">Home</Button></li>
			<li><Button href="/board">Board</Button></li>
			<li><Button href="/blog">Blog</Button></li>
			<li><Button href="/bookkeeping">Bookkeeping</Button></li>
			<li><Button href="/ui-components">UI components</Button></li>
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
