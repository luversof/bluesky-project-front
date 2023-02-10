<script lang="ts">
	import { loginInfoStore } from '$lib/loginInfo';
</script>

<div class="grid gap-1 grid-flow-col auto-cols-max">
	<div>
		<ul>
			<li>
				<a href="/board/free/list">자유 게시판</a>
			</li>
			<li>
				<a href="/board/free/list">자유 게시판</a>
			</li>
			<li>
				<a href="/board/free/list">자유 게시판</a>
			</li>
		</ul>
	</div>
	<div><slot /></div>
</div>
