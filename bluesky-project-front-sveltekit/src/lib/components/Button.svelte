<script lang="ts">
	export let href: string | undefined = undefined;

	export let type: 'primary' | 'success' | 'error' | 'warning' | 'info' | 'dark' | 'light' = 'info';

	let classProp: string = '';
	export { classProp as class };
	let typeClass = '';
	switch (type) {
		case 'primary':
			typeClass = 'border-indigo-500 bg-indigo-500 hover:bg-indigo-600 text-white';
			break;
		case 'success':
			typeClass = 'border-green-500 bg-green-500 hover:bg-green-600 text-white';
			break;
		case 'error':
			typeClass = 'border-red-500 bg-red-500 hover:bg-red-600 text-white';
			break;
		case 'warning':
			typeClass = 'border-yellow-500 bg-yellow-500 hover:bg-yellow-600 text-white';
			break;
		case 'info':
			typeClass = 'border-teal-500 bg-teal-500 hover:bg-teal-600 text-white';
			break;
		case 'dark':
			typeClass = 'border-gray-700 bg-gray-700 hover:bg-gray-800 text-white';
			break;
		case 'light':
			typeClass = 'border-gray-200 bg-gray-200 hover:bg-gray-300 text-gray-700';
			break;
	}
</script>

<a
	class="border rounded-md px-3 py-2 transition duration-500 ease select-none focus:outline-none focus:shadow-outline
        {typeClass}
                {classProp}"
	{href}
	on:click
>
	<slot />
</a>
