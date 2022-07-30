<script type="ts">
	export let type: 'text' | 'password' | 'number' = 'text';
	export let value: string | undefined = undefined;
	export let id: string | undefined = undefined;
	export let placeholder: string = '';
	let classProp: string = '';
	export { classProp as class };
</script>

{#if type == 'text'}
	<div class="relative z-0 {classProp}">
		<input
			type="text"
			class="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-0"
			{id}
			placeholder=" "
			bind:value
		/>
		<label
			for={id}
			class="absolute top-3 -z-10 -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0
			 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-500 peer-focus:dark:text-blue-500"
			>{placeholder}</label
		>
	</div>
{/if}
