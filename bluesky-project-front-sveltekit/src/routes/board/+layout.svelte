<script lang="ts">
	import { loginInfoStore } from '$lib/loginInfo';
</script>

<div class="grid grid-flow-col">
	<aside class="col-span-1">
		<ul>
			<li class="hover:bg-gray-100 rounded-lg p-3">
				<a href="/board/free/list">자유 게시판</a>
			</li>
			<li class="hover:bg-gray-100 rounded-lg p-3">
				<a href="/board/empty/list">empty 게시판</a>
			</li>
		</ul>
	</aside>
	<div class="col-span-12"><slot /></div>
</div>
