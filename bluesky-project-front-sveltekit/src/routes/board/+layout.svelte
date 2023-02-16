<script lang="ts">
	import { loginInfoStore } from '$lib/loginInfo';
</script>

<div class="grid gap-1 grid-flow-col auto-cols-max">
	<aside class="w-48 px-2 py-2">
		<ul class="space-y-2">
			<li class="hover:bg-gray-100 rounded-lg p-3">
				<a href="/board/free/list">자유 게시판</a>
			</li>
			<li class="hover:bg-gray-100 rounded-lg p-3">
				<a href="/board/empty/list">empty 게시판</a>
			</li>
		</ul>
	</aside>
	<div><slot /></div>
</div>
