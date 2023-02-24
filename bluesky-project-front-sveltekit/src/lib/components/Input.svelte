<script lang="ts">
	export let type: 'text' = 'text';
	export let id: string | undefined = undefined;
	export let placeholder: string = '';
	export let value: string | '' = '';
	let classProp: string = '';
	export { classProp as class };
</script>

<input
	class="p-2 w-full border border-gray-400 rounded-md {classProp}"
	{...{ type }}
	{id}
	{placeholder}
	bind:value
/>
