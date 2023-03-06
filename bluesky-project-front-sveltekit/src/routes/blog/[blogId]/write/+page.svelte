<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { blogArticleClient, blogViewUrl } from '$lib/blog';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Editor from '@toast-ui/editor';
	import '@toast-ui/editor/dist/toastui-editor.css';
	import { onMount } from 'svelte';

	let title = '';
	let editor: Editor;
	console.log('blogId : ', $page.params.blogId);

	onMount(async () => {
		editor = new Editor({
			el: document.querySelector('#editor') as HTMLElement,
			placeholder: '내용'
		});
	});

	let create = async () => {
		let resultBlogArticle = await blogArticleClient.create({
			blogId: $page.params.blogId,
			title: title,
			content: editor.getMarkdown()
		});
		if (resultBlogArticle.blogArticleId)
			goto(blogViewUrl.view($page.params.blogId, resultBlogArticle.blogArticleId));
		else {
			alert('오류');
		}
	};
</script>

<div class="grid grid-flow-row gap-3 px-3">
	<h1 class="text-2xl py-2">글 쓰기</h1>
	<div>
		<Input type="text" id="title" bind:value={title} placeholder="제목" />
	</div>
	<div id="editor" />
	<div class="py-2">
		<Button on:click={create} style="primary">쓰기</Button>
		<Button on:click={() => history.back()}>취소</Button>
	</div>
</div>
