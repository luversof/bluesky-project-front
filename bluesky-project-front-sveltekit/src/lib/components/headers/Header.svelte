<script type="ts">
	import Menu from '$lib/components/headers/Menu.svelte';
	import { page } from '$app/stores';
	import { getCurrentRootMenu } from '$lib/navigation';

	import { getLoginInfo } from '$lib/user';

	console.log('getLoginInfo : ', getLoginInfo());

	$: currentMenu = getCurrentRootMenu($page.url.pathname)?.name;

	console.log('SSDAAA', $page.data);
	let isMenuShow = true;
	function menuToggle() {
		isMenuShow = !isMenuShow;
	}
</script>

<header class="flex items-center justify-between flex-wrap bg-white/80 fixed w-full z-10 top-0">
	<div class="mr-6 ">
		<a href="/">
			<span class="text-2xl pl-2 font-black"><i class="fa-solid fa-cloud-moon" /> bluesky</span>
		</a>
	</div>

	<div class="lg:hidden p-2">
		<button
			on:click={menuToggle}
			class="px-3 py-2 border rounded text-gray-400 border-gray-400 hover:text-black hover:border-black"
		>
			<svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
				><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg
			>
		</button>
	</div>

	<nav
		class:hidden={isMenuShow}
		class="w-full flex-grow lg:flex lg:w-auto lg:block pt-2 lg:pt-0 bg-white"
	>
		<ul class="flex-1 lg:flex">
			<li>
				<Menu href="/blog" isActive={currentMenu == 'blog'}
					><i class="fa-solid fa-blog pr-2" /> Blog</Menu
				>
			</li>
			<li>
				<Menu href="/bookkeeping" isActive={currentMenu == 'bookkeeping'}
					><i class="fa-solid fa-coins pr-2" /> Bookkeeping</Menu
				>
			</li>
		</ul>

		<ul class="flex-1 flex justify-end">
			{#if $page.data.loginInfo != null}
				<li class="mr-3">
					<Menu>{$page.data.loginInfo.name}</Menu>
				</li>
			{:else}
				<li>
					<Menu href="/oauth2/authorization/google"><i class="fa-brands fa-google" /></Menu>
				</li>
				<li>
					<Menu href="/oauth2/authorization/facebook"><i class="fa-brands fa-facebook" /></Menu>
				</li>
				<li>
					<Menu href="/oauth2/authorization/github"><i class="fa-brands fa-github" /></Menu>
				</li>
				<li>
					<Menu href="/oauth2/authorization/battlenet"><i class="fa-brands fa-battle-net" /></Menu>
				</li>
			{/if}
		</ul>
	</nav>
</header>
