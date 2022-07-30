<script type="ts">
	export let href: string | undefined = undefined;
	export let isActive: boolean = false;
	let classProp: string = '';
	export { classProp as class };
</script>

<a
	class="h-12 flex justify-center items-center text-gray-500 no-underline hover:text-blue-500 hover:text-underline hover:bg-gray-50 py-2 px-4
	 border-b border-transparent hover:border-b-blue-500 transition hover:duration-700 {classProp}
	  {isActive ? 'border-b-blue-500 text-blue-500' : ''}"
	{href}
>
	<slot />
</a>
