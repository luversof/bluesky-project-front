<script lang="ts">
	import { beforeUpdate, afterUpdate } from 'svelte';
	import { page } from '$app/stores';
	import { boardArticleClient } from '$lib/board';
	import type { PageData } from './$types';
	import type { BoardArticle } from '$lib/board';
	import Button from '$lib/components/Button.svelte';
	('$lib/components/Button.svelte');

	export let data: Promise<BoardArticle>;
	console.log('A : ', data);

	beforeUpdate(() => {
		// boardArticlePagePromise = boardArticleClient.findByBoardAlias($page.params.alias);
		console.log('beforeUpdate');
	});

	afterUpdate(() => {
		console.log('afterUpdate');
	});
</script>

<div>
	<div>
		{#await data}
			waiting...
		{:then boardArticlePage}
			{#each boardArticlePage.content as boardArticle}
				<div>not empty</div>
			{:else}
				<a>empty</a>
			{/each}
			<div>{JSON.stringify(boardArticlePage)}</div>
		{/await}
		글 목록 보여줌
	</div>
	<div>
		<div>네비게이션</div>
		<div>
			<a>글 쓰기</a>
			<Button href="write" type="primary">글 쓰기</Button>
			<Button href="write" type="primary">글 쓰기</Button>
		</div>
	</div>
</div>
