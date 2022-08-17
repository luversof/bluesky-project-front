

<script type="ts">
	import { onMount } from 'svelte';
	import Editor from '@toast-ui/editor';
	import '@toast-ui/editor/dist/toastui-editor.css';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { BlogArticle } from '$lib/types';
	import { blogViewUrl, blogApi } from '$lib/blog';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';

	let title = '';
	let editor: Editor;

	async function write() {
		let response = await blogApi.writeBlogArticle({
			blogId: $page.params.blogId,
			title: title,
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
				previewStyle: 'vertical'
			});
		}
	});
</script>

<div class="min-h-screen flex">
	<div class="flex flex-col items-center justify-center w-full">
		<h1 class="text-4xl font-medium">글 쓰기</h1>

		<Input type="text" bind:value={title} placeholder="제목" class="w-1/2 m-2" />

		<div id="editor" class="w-1/2 m-2" />

		<Button on:click={write}>완료</Button>
	</div>
</div>
