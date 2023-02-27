<script lang="ts">
	export let href: string | undefined = undefined;

	export let style: 'primary' | 'success' | 'error' | 'warning' | 'info' | 'dark' | 'light' =
		'info';

	let classProp: string = '';
	export { classProp as class };
	let styleClass = '';
	switch (style) {
		case 'primary':
			styleClass = 'bg-blue-500 hover:bg-blue-600 text-white';
			break;
		case 'success':
			styleClass = 'bg-green-500 hover:bg-green-600 text-white';
			break;
		case 'error':
			styleClass = 'bg-red-500 hover:bg-red-600 text-white';
			break;
		case 'warning':
			styleClass = 'bg-yellow-500 hover:bg-yellow-600 text-white';
			break;
		case 'info':
			styleClass = 'bg-teal-500 hover:bg-teal-600 text-white';
			break;
		case 'dark':
			styleClass = 'bg-gray-700 hover:bg-gray-800 text-white';
			break;
		case 'light':
			styleClass = 'bg-gray-200 hover:bg-gray-300 text-gray-700';
			break;
	}
</script>

<a {href} on:click>
	<button
		class="tracking-wider rounded-md px-3 py-2 transition-colors duration-500 ease select-none
		{styleClass} {classProp}"
	>
		<slot />
	</button>
</a>
