<script lang="ts">
	import { onMount } from 'svelte';
	import Editor from '@toast-ui/editor';
	import '@toast-ui/editor/dist/toastui-editor.css';
	import { page } from '$app/stores';
	import { boardClient, boardArticleClient, type Board } from '$lib/board';

	let board: Board;
	let title = '';
	let editor: Editor;

	onMount(async () => {
		board = await boardClient.findByAlias({ alias: $page.params.alias });
		console.log('board : ' + board.boardId);
		editor = new Editor({
			el: document.querySelector('#editor')
		});
	});
	function create() {
		console.log('editor : ', editor.getMarkdown());
		console.log('page : ', $page.params.alias);
		boardArticleClient.create({
			boardId: board.boardId,
			title: title,
			content: editor.getMarkdown()
		});
	}
</script>

<div>
	<div>
		<input type="text" id="title" bind:value={title} placeholder="제목" />
	</div>
	<div id="editor" />
	<div>
		<button on:click={create}>쓰기</button>
	</div>
</div>
