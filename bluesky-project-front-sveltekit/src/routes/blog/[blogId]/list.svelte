<script type="ts" context="module">
	import type { LoadEvent } from '@sveltejs/kit';
	import { blogApi } from '$lib/blog';
	export async function load({ params, fetch, session }: LoadEvent) {
		const blogArticlePageResponse = await fetch(blogApi.getBlogArticleListPageUrl(params.blogId), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		});

		return {
			status: blogArticlePageResponse.status,
			props: {
				blogArticlePage: blogArticlePageResponse.ok && (await blogArticlePageResponse.json())
			}
		};
	}
</script>

<script type="ts">
	import { session } from '$app/stores';
	import type { BlogArticlePage } from '$lib/types';
	import { blogViewUrl } from '$lib/blog';
	import { foramtDate } from '$lib/date';
	export let blogArticlePage: BlogArticlePage;

	function hasBlogArticle(): boolean {
		return (
			blogArticlePage != null &&
			blogArticlePage.content != null &&
			blogArticlePage.content.length > 0
		);
	}
</script>

<div class="min-h-screen flex">
	<div class="flex flex-col items-center justify-center w-full">
		<h1 class="text-4xl font-medium">글 목록</h1>
		<ul class="w-full lg:w-1/2">
			{#if hasBlogArticle()}
				{#each blogArticlePage.content as blogArticle}
					<li class="border-b border-b-gray-500 p-2">
						<article>
							<h2 class="text-3xl">
								<a href={blogViewUrl.view(blogArticle)}>{blogArticle.title}</a>
							</h2>
							<p class="py-2 h-16">{blogArticle.content}</p>
							<div><time>{foramtDate(blogArticle.createdDate)}</time></div>
						</article>
					</li>
				{/each}
			{:else}
				<li class="border-b border-b-gray-500 p-2">글 없음</li>
			{/if}
		</ul>
	</div>
</div>
로그인 체크: {$session.loginInfo}
