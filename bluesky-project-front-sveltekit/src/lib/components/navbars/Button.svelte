<script lang="ts">
	import { page } from '$app/stores';
	export let href: string | undefined = undefined;
	let classProp: string = '';
	export { classProp as class };

	let pathname;
	let isActive = false;
	page.subscribe((value) => {
		pathname = value.url.pathname;
		isActive = false;
		if (href === undefined) {
			isActive = false;
		} else if (href == '/' && pathname == '/') {
			isActive = true;
		} else if (href != '/' && pathname.startsWith(href)) {
			isActive = true;
		}
	});
	$: activeCss = isActive ? 'border-blue-500' : 'border-transparent hover:border-blue-500';
</script>

<a {href}>
	<button class="px-5 pt-1 h-10 border-b-4 transition duration-300 {classProp} {activeCss}">
		<slot />
	</button>
</a>
