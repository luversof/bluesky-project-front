<script context="module">
	/** @type {import('./__types/index').Load} */
	export async function load({ params, fetch, session, stuff }) {
		const response = await fetch('/api/blog/userBlogList', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		});
		const userBlogList = await response.json();

		if (userBlogList.length > 0) {
			// 첫번째 blog로 무조건 이동시킴
			const blog = userBlogList[0];
			return {
				status: 303,
				redirect: '/blog/' + blog.blogId + '/list'
			};
		}

		// 블로그 생성 메뉴로 이동?
		return {
			status: 303,
			redirect: `/blog/create`
		};
	}
</script>

<script>
	import { session } from '$app/stores';
</script>

blog 테스트 {JSON.stringify($session)}
