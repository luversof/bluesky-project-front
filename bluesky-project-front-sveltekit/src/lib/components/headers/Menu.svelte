<script type="ts">
	export let href: string | undefined = undefined;
	let classProp: string = '';
	export { classProp as class };
</script>

<a
	class="h-12 flex justify-center items-center text-gray-400 no-underline hover:text-black hover:text-underline hover:bg-gray-50 py-2 px-4 border-b-2 border-transparent hover:border-b-sky-600 transition hover:duration-700 {classProp}"
	{href}
>
	<slot />
</a>
