<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { boardArticleClient, boardClient, boardViewUrl, type Board } from '$lib/board';
	import Button from '$lib/components/Button.svelte';
	import Editor from '@toast-ui/editor';
	import '@toast-ui/editor/dist/toastui-editor.css';
	import { onMount } from 'svelte';
	import Input from '$lib/components/Input.svelte';
	let board: Board;
	let title = '';
	let editor: Editor;

	onMount(async () => {
		board = await boardClient.findByAlias({ alias: $page.params.alias });
		console.log('board : ' + board.boardId);
		editor = new Editor({
			el: document.querySelector('#editor') as HTMLElement,
			placeholder: '내용'
		});
	});
	let create = async () => {
		let resultBlogArticle = await boardArticleClient.create({
			boardId: board.boardId,
			title: title,
			content: editor.getMarkdown()
		});
		if (resultBlogArticle.boardArticleId)
			goto(boardViewUrl.view($page.params.alias, resultBlogArticle.boardArticleId));
		else {
			alert('오류');
		}
	};
</script>

<div class="grid grid-flow-row gap-3">
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
