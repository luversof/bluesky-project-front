<script lang="ts">
	import Button from '$lib/components/navbars/Button.svelte';
</script>

<div class="flex px-2">
	<aside class="w-64">
		<ul>
			<li>
				<Button class="w-5/6" href="/board/free/list" hrefTarget="/board/free">자유 게시판</Button>
			</li>
			<li>
				<Button class="w-5/6" href="/board/empty/list" hrefTarget="/board/empty"
					>empty 게시판</Button
				>
			</li>
		</ul>
	</aside>
	<div class="w-full"><slot /></div>
</div>
