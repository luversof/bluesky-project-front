<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { loginInfoStore } from '$lib/loginInfo';
	import type { BoardArticle } from '$lib/board';
	import Button from '$lib/components/Button.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import { boardViewUrl } from '$lib/board';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import 'dayjs/locale/ko';
	dayjs.extend(relativeTime);
	dayjs.locale('ko');

	export let data: PageData;
	$: boardArticlePage = data;

	let gotoView = (boardArticle: BoardArticle) => {
		if (boardArticle.boardArticleId)
			goto(boardViewUrl.view($page.params.alias, boardArticle.boardArticleId));
	};
</script>

<div class="grid grid-flow-row gap-3">
	<h1 class="text-2xl py-2">글 목록</h1>

	<div>
		<table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
			<thead class="bg-gray-50 dark:bg-gray-800">
				<tr>
					<th
						scope="col"
						class="w-9/12 py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
						>제목</th
					>

					<th
						scope="col"
						class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
						>작성자</th
					>

					<th
						scope="col"
						class="w-1/12 px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
						>날짜</th
					>
				</tr>
			</thead>
			<tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
				{#each boardArticlePage.content as boardArticle}
					<tr>
						<td class="text-sm">
							<button on:click={() => gotoView(boardArticle)} class="px-4 py-4 text-left w-full">
								{boardArticle.title}
							</button>
						</td>

						<td class="px-4 py-4 text-sm whitespace-nowrap">
							{boardArticle.userId}
						</td>

						<td class="px-4 py-4 text-sm whitespace-nowrap">
							{dayjs(boardArticle.createdDate).fromNow()}
						</td>
					</tr>
				{:else}
					<tr>
						<td class="px-4 py-4 text-sm font-medium whitespace-nowrap" />
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<div class="flex justify-between py-2">
		<div />
		<div>
			<Pagination page={boardArticlePage} />
		</div>
		<div class="px-3">
			{#if $loginInfoStore && $loginInfoStore.login}
				<Button href="write" style="primary">글 쓰기</Button>
			{/if}
		</div>
	</div>
</div>
