<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { loginInfoStore } from '$lib/loginInfo';
	import type { BoardArticle } from '$lib/board';
	import Button from '$lib/components/Button.svelte';
	import { boardViewUrl } from '$lib/board';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import 'dayjs/locale/ko';
	dayjs.extend(relativeTime);
	dayjs.locale('ko');

	export let data: Promise<PageData>;

	function gotoView(boardArticle: BoardArticle) {
		if (boardArticle.boardArticleId)
			goto(boardViewUrl.view($page.params.alias, boardArticle.boardArticleId));
	}
</script>

<div class="grid grid-flow-row gap-3">
	<div>
		<h1 class="text-2xl">글 목록</h1>
	</div>
	<div>
		<table class="table-auto">
			<tbody>
				{#await data}
					<tr>
						<td>waiting...</td>
					</tr>
				{:then boardArticlePage}
					{#each boardArticlePage.content as boardArticle}
						<tr class="px-3 cursor-pointer" on:click={() => gotoView(boardArticle)}>
							<!--
								{JSON.stringify(boardArticle)}
							-->
							<td>{boardArticle.title}</td>
							<td>{dayjs(boardArticle.createdDate).fromNow()}</td>
							<td>{boardArticle.userId}</td>
						</tr>
					{:else}
						<tr>
							<td>empty</td>
						</tr>
					{/each}
				{/await}
			</tbody>
		</table>
	</div>

	<div>네비게이션</div>
	<div>
		{#if $loginInfoStore && $loginInfoStore.login}
			<Button href="write" type="primary">글 쓰기</Button>
		{/if}
	</div>
</div>
