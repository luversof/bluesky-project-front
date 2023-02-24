<script lang="ts">
	import Button from '$lib/components/navbars/Button.svelte';
</script>

<div class="grid grid-flow-col">
	<aside class="col-span-1">
		<ul>
			<li>
				<Button class="w-5/6" href="/board/free/list">자유 게시판</Button>
			</li>
			<li>
				<Button class="w-5/6" href="/board/empty/list">empty 게시판</Button>
			</li>
		</ul>
	</aside>
	<div class="col-span-12"><slot /></div>
</div>
