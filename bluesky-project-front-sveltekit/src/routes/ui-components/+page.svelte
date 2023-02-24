<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
</script>

컴포넌트 테스트

<div>
	<h1>Button</h1>

	<Button style="primary">primary</Button>
	<Button style="success">success</Button>
	<Button style="error">error</Button>
	<Button style="warning">warning</Button>
	<Button style="info">info</Button>
	<Button style="dark">dark</Button>
	<Button style="light">light</Button>
</div>

<div>
	<h1>Input</h1>
	<Input type="text" placeholder="placeholder" />
</div>

<div>
	<h1>pagination</h1>
</div>
