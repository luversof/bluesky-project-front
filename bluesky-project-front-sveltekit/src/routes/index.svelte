<script>
	$: userInfo = fetch('/api/user/loginInfo', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
			// 'Content-Type': 'application/x-www-form-urlencoded',
		}
	}).then((response) => response.json());

	import { Button } from 'sveltestrap';
</script>

{#await userInfo}
	<p>...Loading</p>
{:then userInfo}
	id : {userInfo.id}<br />
	name : {userInfo.name}
{:catch error}
	<p>오류가 발생했습니다.</p>
{/await}

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Button>test</Button>
