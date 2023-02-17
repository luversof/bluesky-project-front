<script lang="ts">
	import { page } from '$app/stores';
	import { boardViewUrl } from '$lib/board';
	import Button from '$lib/components/Button.svelte';
	import { loginInfoStore } from '$lib/loginInfo';
	import dayjs from 'dayjs';
	import 'dayjs/locale/ko';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import type { PageData } from './$types';
	dayjs.extend(relativeTime);
	dayjs.locale('ko');

	export let data: Promise<PageData>;
</script>

<div>
	<div>
		<h1 class="text-2xl">글 보기</h1>
	</div>

	<div>
		<table class="table-auto">
			<tbody>
				{#await data}
					<tr>
						<td>waiting...</td>
					</tr>
				{:then boardArticle}
					<tr class="px-3">
						<!--
                            {JSON.stringify(boardArticle)}
                        -->
						<td>{boardArticle.title}</td>
						<td>{dayjs(boardArticle.createdDate).fromNow()}</td>
					</tr>
				{/await}
			</tbody>
		</table>
	</div>

	<div>
		<button>글 쓰기</button>
		<Button href={boardViewUrl.list($page.params.alias)} type="primary">목록</Button>
		<Button href={boardViewUrl.write($page.params.alias)} type="primary">글 쓰기</Button>
		{#await data}
			<tr>
				<td>waiting...</td>
			</tr>
		{:then boardArticle}
			{#if $loginInfoStore && boardArticle.boardArticleId && boardArticle.userId === $loginInfoStore.username}
				<Button
					href={boardViewUrl.modify($page.params.alias, boardArticle.boardArticleId)}
					type="primary">수정</Button
				>
				<Button href="write" type="primary">삭제</Button>
			{/if}
		{/await}
	</div>
</div>
