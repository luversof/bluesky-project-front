<script lang="ts">
	export let href: string | undefined = undefined;

	export let style: 'primary' | 'success' | 'error' | 'warning' | 'info' | 'dark' | 'light' =
		'info';

	let classProp: string = '';
	export { classProp as class };
	let styleClass = '';
	switch (style) {
		case 'primary':
			styleClass = 'border-blue-500 bg-blue-500 hover:bg-blue-600 text-white';
			break;
		case 'success':
			styleClass = 'border-green-500 bg-green-500 hover:bg-green-600 text-white';
			break;
		case 'error':
			styleClass = 'border-red-500 bg-red-500 hover:bg-red-600 text-white';
			break;
		case 'warning':
			styleClass = 'border-yellow-500 bg-yellow-500 hover:bg-yellow-600 text-white';
			break;
		case 'info':
			styleClass = 'border-teal-500 bg-teal-500 hover:bg-teal-600 text-white';
			break;
		case 'dark':
			styleClass = 'border-gray-700 bg-gray-700 hover:bg-gray-800 text-white';
			break;
		case 'light':
			styleClass = 'border-gray-200 bg-gray-200 hover:bg-gray-300 text-gray-700';
			break;
	}
</script>

<a {href} on:click>
	<button
		class="border rounded-md px-3 py-2 transition duration-500 ease select-none focus:outline-none focus:shadow-outline
		{styleClass} {classProp}"
	>
		<slot />
	</button>
</a>
