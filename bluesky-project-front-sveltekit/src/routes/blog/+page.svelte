<script lang="ts">
	import { loginInfoStore } from '$lib/loginInfo';
	import { blogClient, blogViewUrl, type Blog } from '$lib/blog';
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

	$: if (loginInfo != null) {
		blogListPromise = blogClient.findByUserId(loginInfo.username);
	}
</script>

{#if blogListPromise != null}
	{#await blogListPromise then blogList}
		{#if blogList.length > 0}
			<a href="/blog/{blogList[0].blogId}/list">목록 이동</a>
		{:else}
			<button on:click={create}> 생성 </button>
		{/if}
	{/await}
{/if}
