<script>
	import { session } from '$app/stores';
	//Javascript to toggle the menu

	let isMenuShow = true;
	function menuToggle() {
		isMenuShow = !isMenuShow;
	}
</script>

<nav class="flex items-center justify-between flex-wrap bg-white-800 fixed w-full z-10 top-0">
	<div class="flex items-center flex-shrink-0 mr-6">
		<a class="no-underline  hover:no-underline" href="/">
			<span class="text-2xl pl-2">Bluesky</span>
		</a>
	</div>

	<div class="block lg:hidden p-2">
		<button
			on:click={menuToggle}
			class="flex items-center px-3 py-2 border rounded text-gray-400 border-gray-400 hover:text-black hover:border-black"
		>
			<svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
				><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg
			>
		</button>
	</div>

	<div
		class:hidden={isMenuShow}
		class="w-full flex-grow lg:flex lg:items-center lg:w-auto lg:block pt-2 lg:pt-0 bg-white"
	>
		<ul class="list-reset lg:flex justify-start flex-1 items-center">
			<li class="mr-3">
				<a
					class="inline-block text-gray-400 no-underline hover:text-black hover:text-underline py-2 px-4"
					href="/blog">Blog</a
				>
			</li>
			<li class="mr-3">
				<a
					class="inline-block text-gray-400 no-underline hover:text-black hover:text-underline py-2 px-4"
					href="/bookkeeping">Bookkeeping</a
				>
			</li>
		</ul>

		{#if $session.loginInfo != null}
			<ul class="list-reset flex justify-end flex-1 items-center">
				<li class="mr-3 text-gray-200">
					{$session.loginInfo.name}
				</li>
			</ul>
		{:else}
			<ul class="list-reset flex justify-end flex-1 items-center">
				<li>
					<a
						class="inline-block text-gray-400 no-underline hover:text-black hover:text-underline py-2 px-4"
						href="/oauth2/authorization/google"><i class="fa-brands fa-google" /></a
					>
				</li>
				<li>
					<a
						class="inline-block text-gray-400 no-underline hover:text-black hover:text-underline py-2 px-4"
						href="/oauth2/authorization/facebook"><i class="fa-brands fa-facebook" /></a
					>
				</li>
				<li>
					<a
						class="inline-block text-gray-400 no-underline hover:text-black hover:text-underline py-2 px-4"
						href="/oauth2/authorization/github"><i class="fa-brands fa-github" /></a
					>
				</li>
				<li>
					<a
						class="inline-block text-gray-400 no-underline hover:text-black hover:text-underline py-2 px-4"
						href="/oauth2/authorization/battlenet"><i class="fa-brands fa-battle-net" /></a
					>
				</li>
			</ul>
		{/if}
	</div>
</nav>
