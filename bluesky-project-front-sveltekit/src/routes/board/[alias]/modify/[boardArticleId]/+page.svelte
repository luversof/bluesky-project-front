<script lang="ts">
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { boardArticleClient, boardViewUrl, type Board } from '$lib/board';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';

	import Editor from '@toast-ui/editor';
	import '@toast-ui/editor/dist/toastui-editor.css';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;
	$: boardArticle = data;

	let editor: Editor;

	onMount(async () => {
		editor = new Editor({
			el: document.querySelector('#editor') as HTMLElement,
			initialValue: boardArticle.content
		});
	});
	let modify = async () => {
		let resultBlogArticle = await boardArticleClient.modify({
			boardArticleId: boardArticle.boardArticleId,
			boardId: boardArticle.boardId,
			title: boardArticle.title,
			content: editor.getMarkdown()
		});
		if (resultBlogArticle.boardArticleId)
			goto(boardViewUrl.view($page.params.alias, resultBlogArticle.boardArticleId));
		else {
			alert('오류');
		}
	};
</script>

<div class="grid grid-flow-row gap-3 p-2">
	<h1 class="text-2xl py-2">글 수정</h1>
	<div>
		<Input type="text" id="title" bind:value={boardArticle.title} placeholder="제목" />
	</div>
	<div id="editor" />
	<div class="text-center">
		<Button on:click={modify}>수정</Button>
	</div>
</div>
