<script lang="ts">
	import { boardArticleClient } from '$lib/board';
	$: boardArticle = boardArticleClient.findByBoardArticleId('208e94d0-2560-4517-8ff5-1892d9f5f4df');
</script>

<a href="/board/free/list">자유 게시판 목록</a>

{#await boardArticle then boardArticle}
	then : {boardArticle}
{/await}
테스트 일반적인 게시글 구현? 주소에 boardAlias가 구성되고 해당 글의 목록 보기 해당 글 보기 쓰기 수정
삭제
