<script type="ts" context="module">
	import type { LoadEvent } from '@sveltejs/kit';
	import { blogStore } from '$lib/store';
	const { userBlogList } = blogStore;

	export async function load({ params, fetch, session }: LoadEvent) {
		if (session.loginInfo != null) {
			const userBlogListResponse = await fetch('/api/blog/userBlogList', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			});

			userBlogList.set(await userBlogListResponse.json());
		}

		return {
			status: 200
		};
	}
</script>

<script type="ts">
	import { page } from '$app/stores';
	import type { BlogArticlePage } from '$lib/types';
	import Menu from '$lib/components/headers/Menu.svelte';
	import { isUserBlog } from '$lib/blog';
	import { getCurrentBlogMenu } from '$lib/navigation';

	$: currentMenu = getCurrentBlogMenu($page.url.pathname)?.name;

	let blogArticlePage: BlogArticlePage;
	let blogId: string = $page.params.blogId;

	function hasBlogArticle(): boolean {
		return (
			blogArticlePage != null &&
			blogArticlePage.content != null &&
			blogArticlePage.content.length > 0
		);
	}
</script>

<section class="lg:flex min-h-screen">
	<nav class="basis-32">
		<ul class="flex lg:flex-col">
			<li>
				<Menu href="list" class={currentMenu == 'list' ? 'border-b-sky-600' : ''}
					><i class="fa-solid fa-list pr-2" /> 글 목록</Menu
				>
			</li>
			{#if isUserBlog($userBlogList, blogId)}
				<li>
					<Menu href="write" class={currentMenu == 'write' ? 'border-b-sky-600' : ''}
						><i class="fa-solid fa-pen-to-square pr-2" /> 글 쓰기</Menu
					>
				</li>
			{/if}
		</ul>
	</nav>
	<div class="grow">
		<slot />
	</div>
</section>
