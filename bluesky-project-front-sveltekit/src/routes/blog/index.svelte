<script type="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { blogViewUrl } from '$lib/blog';

	export const load: Load = async ({ fetch }) => {
		const response = await fetch('/api/blog/userBlogList', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		});
		const userBlogList = await response.json();

		if (userBlogList.length > 0) {
			// 첫번째 blog로 무조건 이동
			return {
				status: 303,
				redirect: blogViewUrl.list(userBlogList[0].blogId)
			};
		}

		// 블로그 생성 메뉴로 이동
		return {
			status: 303,
			redirect: blogViewUrl.create()
		};
	};
</script>
