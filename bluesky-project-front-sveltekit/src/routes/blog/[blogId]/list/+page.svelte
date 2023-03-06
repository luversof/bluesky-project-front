<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { BlogArticle } from '$lib/blog';
	import { blogViewUrl } from '$lib/blog';
	import Button from '$lib/components/Button.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import { loginInfoStore } from '$lib/loginInfo';
	import dayjs from 'dayjs';
	import 'dayjs/locale/ko';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import type { PageData } from './$types';
	dayjs.extend(relativeTime);
	dayjs.locale('ko');
	export let data: PageData;
	$: blog = data.blog;
	$: blogArticlePage = data.blogArticlePage;

	let gotoView = (blogArticle: BlogArticle) => {
		if (blogArticle.blogArticleId)
			goto(blogViewUrl.view($page.params.blogId, blogArticle.blogArticleId));
	};
</script>

<div class="grid grid-flow-row gap-3 px-3">
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
				{#each blogArticlePage.content as blogArticle}
					<tr>
						<td class="text-sm">
							<button on:click={() => gotoView(blogArticle)} class="px-4 py-4 text-left w-full">
								{blogArticle.title}
							</button>
						</td>

						<td class="px-4 py-4 text-sm whitespace-nowrap">
							{blogArticle.userId}
						</td>

						<td class="px-4 py-4 text-sm whitespace-nowrap">
							{dayjs(blogArticle.createdDate).fromNow()}
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
			<Pagination page={blogArticlePage} />
		</div>
		<div>
			{#if $loginInfoStore && $loginInfoStore.login && $loginInfoStore.username === blog.userId}
				<Button href="write" style="primary">글 쓰기</Button>
			{/if}
		</div>
	</div>
</div>
