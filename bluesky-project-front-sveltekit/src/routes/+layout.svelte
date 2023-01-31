<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';

	export let data;

	console.log('layout data :  ', data);
</script>

레이아웃
<a href="/">루트 페이지 이동</a>
<a href="/login">로그인 페이지 이동</a>

<slot />
