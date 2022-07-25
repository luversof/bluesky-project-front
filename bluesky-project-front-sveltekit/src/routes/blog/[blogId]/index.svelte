<script type="ts" context="module">
	import type { Load } from './__types/index';
	export const load: Load = ({}) => {
		return {
			status: 303,
			redirect: 'list'
		};
	};
</script>
