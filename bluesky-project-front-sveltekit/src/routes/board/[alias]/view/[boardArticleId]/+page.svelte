<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { boardArticleClient, boardViewUrl } from '$lib/board';
	import Button from '$lib/components/Button.svelte';
	import { loginInfoStore } from '$lib/loginInfo';
	import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
	import '@toast-ui/editor/dist/toastui-editor-viewer.css';
	import dayjs from 'dayjs';
	import 'dayjs/locale/ko';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	dayjs.extend(relativeTime);
	dayjs.locale('ko');

	export let data: PageData;
	$: boardArticle = data;

	let viewer: Viewer;

	onMount(async () => {
		var targetEl = document.querySelector('#viewer') as HTMLElement;
		if (targetEl !== null) {
			viewer = new Viewer({
				el: targetEl,
				initialValue: boardArticle.content
			});
		}
	});

	let deleteArticle = async () => {
		boardArticleClient.delete({ boardArticleId: $page.params.boardArticleId });
		goto(boardViewUrl.list($page.params.alias));
	};
</script>

<div>
	<div>
		<h1 class="text-2xl py-2">글 보기</h1>
	</div>

	<div>
		<!--
			{JSON.stringify(boardArticle)}
		-->
		<h2>{boardArticle.title}</h2>
		<div>{dayjs(boardArticle.createdDate).fromNow()}</div>
		<div id="viewer" />
	</div>

	<div class="py-2">
		<Button href={boardViewUrl.list($page.params.alias)} style="primary">목록</Button>
		<Button href={boardViewUrl.write($page.params.alias)} style="primary">쓰기</Button>

		{#if $loginInfoStore && boardArticle.boardArticleId && boardArticle.userId === $loginInfoStore.username}
			<Button
				href={boardViewUrl.modify($page.params.alias, boardArticle.boardArticleId)}
				style="primary">수정</Button
			>
			<Button on:click={deleteArticle} style="primary">삭제</Button>
		{/if}
	</div>
</div>
