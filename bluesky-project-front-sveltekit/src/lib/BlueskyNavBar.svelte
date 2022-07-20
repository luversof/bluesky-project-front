<script>
	//Javascript to toggle the menu
	let isMenuShow = true;
	function menuToggle() {
		isMenuShow = !isMenuShow;
	}
</script>

<nav class="flex items-center justify-between flex-wrap bg-gray-800 p-2 fixed w-full z-10 top-0">
	<div class="flex items-center flex-shrink-0 text-white mr-6">
		<a class="text-white no-underline hover:text-white hover:no-underline" href="/">
			<span class="text-2xl pl-2">Bluesky</span>
		</a>
	</div>

	<div class="block lg:hidden">
		<button
			on:click={menuToggle}
			class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white"
		>
			<svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
				><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg
			>
		</button>
	</div>

	<div
		class:hidden={isMenuShow}
		class="w-full flex-grow lg:flex lg:items-center lg:w-auto lg:block pt-6 lg:pt-0"
	>
		<ul class="list-reset lg:flex justify-start flex-1 items-center">
			<li class="mr-3">
				<a
					class="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
					href="/blog">Blog</a
				>
			</li>
			<li class="mr-3">
				<a
					class="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
					href="/bookkeeping">Bookkeeping</a
				>
			</li>
		</ul>
		<ul class="list-reset flex justify-end flex-1 items-center">
			<li class="mr-3">
				<a
					class="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
					href="/oauth2/authorization/google"><i class="fa-brands fa-google" /></a
				>
			</li>
			<li class="mr-3">
				<a
					class="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
					href="/oauth2/authorization/facebook"><i class="fa-brands fa-facebook" /></a
				>
			</li>
			<li class="mr-3">
				<a
					class="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
					href="/oauth2/authorization/github"><i class="fa-brands fa-github" /></a
				>
			</li>
			<li class="mr-3">
				<a
					class="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
					href="/oauth2/authorization/battlenet"><i class="fa-brands fa-battle-net" /></a
				>
			</li>
		</ul>
	</div>
</nav>
