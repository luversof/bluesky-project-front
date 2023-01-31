

<script type="ts">
	import type { Blog } from '$lib/types';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';

	async function createBlog() {
		const response = await fetch('/api/blog', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		});

		if (response.status == 200) {
			const userBlog: Blog = await response.json();
			goto('/blog/' + userBlog.blogId + '/list');
			return;
		} else {
			//error 처리
			var error = await response.json();
			console.log('ERROR', error);
			goto('/');
		}
	}
</script>

<div class="min-h-screen flex">
	<div class="flex flex-col items-center justify-center w-full text-center">
		<div class="text-8xl font-black text-gray-800 p-10">Blog Create</div>

		<p class="text-3xl font-light leading-normal text-gray-600">Blog를 생성하시겠습니까?</p>

		<Button class="w-28" on:click={createBlog}>Create</Button>
	</div>
</div>
