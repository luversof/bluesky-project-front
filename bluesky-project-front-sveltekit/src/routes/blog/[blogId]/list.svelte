<script type="ts" context="module">
	import type { LoadEvent } from '@sveltejs/kit';
	export async function load({ params, fetch }: LoadEvent) {
		const response = await fetch('/api/blogArticle/search/findByBlogId/' + params.blogId, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		});

		return {
			status: response.status,
			props: {
				blogArticlePage: response.ok && (await response.json()),
				blogId: params.blogId
			}
		};
	}
</script>

<script type="ts">
	import { session } from '$app/stores';
	import type { BlogArticlePage } from '$lib/types';
	export let blogArticlePage: BlogArticlePage;
	export let blogId: string;

	async function getUserBlog() {
		return await fetch('http://localhost:8084/api/blog/userBlogList', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		}).then((response) => response.json());
	}

	function hasBlogArticle(): boolean {
		return (
			blogArticlePage != null &&
			blogArticlePage.content != null &&
			blogArticlePage.content.length > 0
		);
	}

	function isBlogOwner(): boolean {
		console.log(getUserBlog());
		return $session.loginInfo != null;
	}
</script>

목록
{JSON.stringify(blogArticlePage)}

{#if hasBlogArticle()}
	글 있음
{:else}
	글 없음
{/if}
로그인 체크: {$session.loginInfo}

{#if isBlogOwner()}글쓰기{/if}
