<script lang="ts">
	import Button from '$lib/components/navbars/Button.svelte';
</script>

<div class="flex">
	<aside class="w-64">
		<ul>
			<li>
				<Button class="w-5/6" href="/bookkeeping/entry">입력</Button>
			</li>
			<li>
				<Button class="w-5/6" href="/bookkeeping/statistics">통계</Button>
			</li>
			<li>
				<Button class="w-5/6" href="/bookkeeping/asset">자산</Button>
			</li>
			<li>
				<Button class="w-5/6" href="/bookkeeping/config">설정</Button>
			</li>
		</ul>
	</aside>
	<div class="w-full"><slot /></div>
</div>
