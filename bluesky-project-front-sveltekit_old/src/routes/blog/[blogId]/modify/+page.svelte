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
	import Editor from '@toast-ui/editor';
	import '@toast-ui/editor/dist/toastui-editor.css';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { BlogArticle } from '$lib/types';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';

	export let blogArticle: BlogArticle;

	let editor: Editor;

	async function modify() {
		let response = await blogApi.modifyBlogArticle({
			blogId: $page.params.blogId,
			blogArticleId: blogArticle.blogArticleId,
			title: blogArticle.title,
			content: editor.getMarkdown()
		});

		if (response.status == 200) {
			const blogArticle: BlogArticle = await response.json();
			goto(blogViewUrl.view(blogArticle));
			return;
		} else {
			//error 처리
			var error = await response.json();
			console.log('ERROR', error);
			goto('/');
		}
	}

	onMount(async () => {
		var targetEl = document.querySelector('#editor');

		if (targetEl != null) {
			editor = new Editor({
				el: targetEl,
				height: '500px',
				initialEditType: 'markdown',
				previewStyle: 'vertical',
				initialValue: blogArticle.content
			});
		}
	});
</script>

<div class="min-h-screen flex">
	<div class="flex flex-col items-center justify-center w-full">
		<h1 class="text-4xl font-medium">글 수정</h1>

		<Input type="text" bind:value={blogArticle.title} placeholder="제목" class="w-1/2 m-2" />

		<div id="editor" class="w-1/2 m-2" />

		<Button on:click={modify}>수정</Button>
	</div>
</div>
