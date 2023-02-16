<script lang="ts">
	export let href: string | undefined = undefined;

	export let type: 'primary' | 'success' | 'error' | 'warning' | 'info' | 'dark' | 'light' = 'info';

	let classProp: string = '';
	export { classProp as class };
	let typeClass = '';
	switch (type) {
		case 'primary':
			typeClass = 'indigo';
			break;
		case 'success':
			typeClass = 'green';
			break;
		case 'error':
			typeClass = 'red';
			break;
		case 'warning':
			typeClass = 'yellow';
			break;
		case 'info':
			typeClass = 'teal';
			break;
		case 'dark':
			typeClass = 'gray';
			break;
		case 'light':
			typeClass = 'white';
			break;
	}
</script>

<a
	class="border border-{typeClass}-500 bg-{typeClass}-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-{typeClass}-600 focus:outline-none focus:shadow-outline
            {classProp}"
	{href}
	on:click
>
	<slot />
</a>
