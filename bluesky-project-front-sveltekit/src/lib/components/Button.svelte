<script type="ts">
	export let href: string | undefined = undefined;
	let classProp: string = '';
	export { classProp as class };
</script>

<a
	class="flex items-center justify-center h-12 px-4 mt-2 cursor-pointer 
            text-sm text-center text-gray-500 
            transition-colors duration-300 transform border
            hover:text-blue-500 hover:border-blue-500
            dark:text-gray-300 dark:border-gray-50 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none
            {classProp}"
	{href}
	on:click
>
	<slot />
</a>
