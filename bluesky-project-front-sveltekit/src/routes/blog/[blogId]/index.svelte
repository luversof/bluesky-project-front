<script type="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = ({}) => {
		return {
			status: 303,
			redirect: 'list'
		};
	};
</script>
