<script type="ts" context="module">
	import type { LoadEvent } from '@sveltejs/kit';
	export async function load({ params, fetch, session, stuff }: LoadEvent) {
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
				blogArticlePage: response.ok && (await response.json())
			}
		};
	}
</script>

<script type="ts">
	import type { BlogArticlePage } from '$lib/types';
	export let blogArticlePage: BlogArticlePage;
</script>

목록
{JSON.stringify(blogArticlePage)}
