<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { blogArticleClient, blogViewUrl } from '$lib/blog';
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
	$: blogArticle = data;
	let viewer: Viewer;

	onMount(async () => {
		var targetEl = document.querySelector('#viewer') as HTMLElement;
		if (targetEl !== null) {
			viewer = new Viewer({
				el: targetEl,
				initialValue: blogArticle.content
			});
		}
	});

	let deleteArticle = async () => {
		blogArticleClient.delete({ blogArticleId: $page.params.blogArticleId });
		goto(blogViewUrl.list($page.params.blogId));
	};
</script>

<div class="grid grid-flow-row gap-3 px-3">
	<h1 class="text-2xl py-2">글 보기</h1>

	<div>
		<!--
			{JSON.stringify(boardArticle)}
		-->
		<h2>{blogArticle.title}</h2>
		<div>{dayjs(blogArticle.createdDate).fromNow()}</div>
		<div id="viewer" />
	</div>

	<div class="py-2">
		<Button href={blogViewUrl.list($page.params.blogId)} style="primary">목록</Button>
		<Button href={blogViewUrl.write($page.params.blogId)} style="primary">쓰기</Button>

		{#if $loginInfoStore && blogArticle.blogArticleId && blogArticle.userId === $loginInfoStore.username}
			<Button
				href={blogViewUrl.modify($page.params.blogId, blogArticle.blogArticleId)}
				style="primary">수정</Button
			>
			<Button on:click={deleteArticle} style="primary">삭제</Button>
		{/if}
	</div>
</div>
