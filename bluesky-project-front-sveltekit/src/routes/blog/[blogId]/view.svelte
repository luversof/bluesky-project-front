<script type="ts" context="module">
	import type { LoadEvent } from '@sveltejs/kit';
	import { blogApi, blogViewUrl } from '$lib/blog';
	export async function load({ params, fetch, session, url }: LoadEvent) {
		const blogArticleId = url.searchParams.get('blogArticleId');

		if (blogArticleId == null) {
			// 에러 처리
			return {
				status: 303,
				redirect: blogViewUrl.list(params.blogId)
			};
		}

		const blogArticleResponse = await fetch(blogApi.getBlogArticleUrl(blogArticleId), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		});

		return {
			status: blogArticleResponse.status,
			props: {
				blogArticle: blogArticleResponse.ok && (await blogArticleResponse.json()),
				blogId: params.blogId
			}
		};
	}
</script>

<script type="ts">
	import { onMount } from 'svelte';
	import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
	import '@toast-ui/editor/dist/toastui-editor-viewer.css';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { BlogArticle } from '$lib/types';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import Textarea from '$lib/components/Textarea.svelte';

	export let blogArticle: BlogArticle;

	let title = '';
	let viewer: Viewer;

	onMount(async () => {
		var targetEl = document.querySelector('#viewer');

		if (targetEl != null) {
			viewer = new Viewer({
				el: targetEl,
				height: '500px',
				initialValue: blogArticle.content
			});
		}
	});
</script>

<div class="min-h-screen flex">
	<div class="flex flex-col items-center justify-center w-full">
		<h1 class="text-4xl font-medium">글 보기</h1>

		<h2 class="text-4xl w-1/2 m-2">{blogArticle.title}</h2>

		<div id="viewer" class="w-1/2 m-2" />

		<Button href={blogArticle.blogId ? blogViewUrl.list(blogArticle.blogId) : '/blog'}>목록</Button>
	</div>
</div>
