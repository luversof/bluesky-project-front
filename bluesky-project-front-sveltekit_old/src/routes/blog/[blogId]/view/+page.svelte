<script type="ts" context="module">
	throw new Error("@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)");

	// import type { LoadEvent } from '@sveltejs/kit';
	// import { blogApi, blogViewUrl } from '$lib/blog';
	// export async function load({ params, fetch, session, url }: LoadEvent) {
	// 	const blogArticleId = url.searchParams.get('blogArticleId');

	// 	if (blogArticleId == null) {
	// 		// 에러 처리
	// 		return {
	// 			status: 303,
	// 			redirect: blogViewUrl.list(params.blogId)
	// 		};
	// 	}

	// 	const blogArticleResponse = await fetch(blogApi.getBlogArticleUrl(blogArticleId), {
	// 		method: 'GET',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			Accept: 'application/json'
	// 		}
	// 	});

	// 	return {
	// 		status: blogArticleResponse.status,
	// 		props: {
	// 			blogArticle: blogArticleResponse.ok && (await blogArticleResponse.json()),
	// 			blogId: params.blogId
	// 		}
	// 	};
	// }
</script>

<script type="ts">
	throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

	import { onMount } from 'svelte';
	import { session } from '$app/stores';
	import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
	import '@toast-ui/editor/dist/toastui-editor-viewer.css';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { BlogArticle } from '$lib/types';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import Textarea from '$lib/components/Textarea.svelte';

	export let blogArticle: BlogArticle;
	export let blogId: string;

	let title = '';
	let viewer: Viewer;

	function isOwner(): boolean {
		if ($session.loginInfo == null) {
			return false;
		}

		if (blogArticle.userId == $session.loginInfo.id) {
			return true;
		}
		return false;
	}

	function deleteBlogArticle() {
		if (!confirm('삭제하시겠습니까?')) {
			return;
		}
		blogApi.deleteBlogArticle(blogArticle);
		goto(blogViewUrl.list(blogId));
	}

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

		<div class="flex">
			<Button class="m-2" href={blogViewUrl.list(blogArticle.blogId)}>목록</Button>

			{#if isOwner}
				<Button class="m-2" href={blogViewUrl.modify(blogArticle)}>수정</Button>
				<Button class="m-2" on:click={deleteBlogArticle}>삭제</Button>
			{/if}
		</div>
	</div>
</div>
