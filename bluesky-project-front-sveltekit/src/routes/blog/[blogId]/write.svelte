<script type="ts" context="module">
</script>

<script type="ts">
	import type { BlogArticle } from '$lib/types';
	import { blogViewUrl, writeBlogArticle } from '$lib/blog';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import Textarea from '$lib/components/Textarea.svelte';

	let title = '';
	let content = '';

	async function test() {
		console.log('title : ', title);

		let response = await writeBlogArticle({
			blogId: $page.params.blogId,
			title: title,
			content: content
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

		console.log('result : ', await response.json());
	}
</script>

<div class="min-h-screen flex">
	<div class="flex flex-col items-center justify-center w-full">
		<h1 class="text-4xl font-medium">글 쓰기</h1>

		<Input type="text" bind:value={title} placeholder="제목" class="w-1/2 m-2" />

		<Textarea bind:value={content} placeholder="내용" class="w-1/2 m-2" />

		<Button on:click={test}>완료</Button>
	</div>
</div>
