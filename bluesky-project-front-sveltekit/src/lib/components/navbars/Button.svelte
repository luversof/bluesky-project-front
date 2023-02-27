<script lang="ts">
	import { page } from '$app/stores';
	export let href: string | undefined = undefined;
	export let hrefTarget: string | undefined = href;
	let classProp: string = '';
	export { classProp as class };

	let pathname;
	let isActive = false;
	page.subscribe((value) => {
		pathname = value.url.pathname;
		isActive = false;
		if (hrefTarget === undefined) {
			isActive = false;
		} else if (hrefTarget == '/' && pathname == '/') {
			isActive = true;
		} else if (hrefTarget != '/' && pathname.startsWith(hrefTarget)) {
			isActive = true;
		}
	});
	$: activeCss = isActive ? 'border-blue-500' : 'border-transparent hover:border-blue-500';
</script>

<a {href}>
	<button class="px-5 pt-1 h-12 border-b transition duration-300 {classProp} {activeCss}">
		<slot />
	</button>
</a>
