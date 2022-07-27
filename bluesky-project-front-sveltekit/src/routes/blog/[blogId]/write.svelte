<script type="ts" context="module">
</script>

<script type="ts">
	import type { BlogArticle } from '$lib/types';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';

	let title = '';
	let content = '';

	async function test() {
		console.log('title : ', title);

		let response = await fetch('/api/blogArticle', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				blogId: $page.params.blogId,
				title: title,
				content: content
			})
		});

		if (response.status == 200) {
			const blogArticle: BlogArticle = await response.json();
			goto('/blog/' + blogArticle.blogId + '/blogArticle/' + blogArticle.blogArticleId);
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

<div class="text-center">
	<div>
		<Input type="text" class="border" placeholder="www.example.com" bind:value={title} />
		{title}
		<textarea bind:value={content} />

		<Button on:click={test}>글쓰기</Button>
	</div>
</div>
