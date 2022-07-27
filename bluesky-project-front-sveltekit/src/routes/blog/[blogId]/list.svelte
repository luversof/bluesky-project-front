<script type="ts" context="module">
	import type { LoadEvent } from '@sveltejs/kit';
	export async function load({ params, fetch, session }: LoadEvent) {
		const blogArticlePageResponse = await fetch(
			'/api/blogArticle/search/findByBlogId/' + params.blogId,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			}
		);

		return {
			status: blogArticlePageResponse.status,
			props: {
				blogArticlePage: blogArticlePageResponse.ok && (await blogArticlePageResponse.json()),
				blogId: params.blogId
			}
		};
	}
</script>

<script type="ts">
	import { session } from '$app/stores';
	import type { BlogArticlePage } from '$lib/types';
	export let blogArticlePage: BlogArticlePage;

	function hasBlogArticle(): boolean {
		return (
			blogArticlePage != null &&
			blogArticlePage.content != null &&
			blogArticlePage.content.length > 0
		);
	}
</script>

{#if hasBlogArticle()}
	글 있음
{:else}
	글 없음
{/if}
로그인 체크: {$session.loginInfo}
