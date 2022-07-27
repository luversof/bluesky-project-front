<script type="ts">
	export let type: 'text' | 'password' | 'number' = 'text';
	export let value: string | undefined = undefined;
	export let id: string | undefined = undefined;
	export let placeholder: string | undefined = undefined;
	let classProp: string = '';
	export { classProp as class };
</script>

{#if type == 'text'}
	<input type="text" class="border {classProp}" {id} {placeholder} bind:value />
{/if}
