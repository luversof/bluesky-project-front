<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { blogArticleClient, blogViewUrl } from '$lib/blog';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';

	import Editor from '@toast-ui/editor';
	import '@toast-ui/editor/dist/toastui-editor.css';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: blogArticle = data;

	let editor: Editor;

	onMount(async () => {
		editor = new Editor({
			el: document.querySelector('#editor') as HTMLElement,
			initialValue: blogArticle.content
		});
	});
	let modify = async () => {
		let resultBlogArticle = await blogArticleClient.update({
			blogArticleId: blogArticle.blogArticleId,
			title: blogArticle.title,
			content: editor.getMarkdown()
		});
		if (resultBlogArticle.blogArticleId)
			goto(blogViewUrl.view($page.params.blogId, resultBlogArticle.blogArticleId));
		else {
			alert('오류');
		}
	};
</script>

<div class="grid grid-flow-row gap-3 px-2">
	<h1 class="text-2xl py-2">글 수정</h1>
	<div>
		<Input type="text" id="title" bind:value={blogArticle.title} placeholder="제목" />
	</div>
	<div id="editor" />
	<div class="text-center py-2">
		<Button on:click={modify} style="primary">수정</Button>
	</div>
</div>
