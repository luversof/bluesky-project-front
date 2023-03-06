<script lang="ts">
	import { loginInfoStore } from '$lib/loginInfo';
	import Button from '$lib/components/Button.svelte';
	import { blogClient, blogViewUrl, type Blog, loginUserBlogListStore } from '$lib/blog';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';

	$: loginInfo = get(loginInfoStore);
	let blogListPromise: Promise<Blog[]>;

	loginInfoStore.subscribe((value) => {
		loginInfo = value;
	});

	let create = async () => {
		let blog = await blogClient.create();
		goto(blogViewUrl.list(blog.blogId));
	};
</script>

<div class="grid grid-flow-row gap-3 px-2">
	{#if $loginUserBlogListStore}
		{#if $loginUserBlogListStore.length > 0}
			<h1>블로그 목록</h1>
			<ul>
				{#each $loginUserBlogListStore as blog}
					<li>
						<a href="/blog/{blog.blogId}/list">{blog.blogId} 이동</a>
					</li>
				{/each}
			</ul>
		{:else}
			<Button on:click={create} style="primary">생성</Button>?
		{/if}
	{/if}
</div>
