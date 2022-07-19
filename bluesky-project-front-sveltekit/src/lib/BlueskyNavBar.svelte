<script context="module">
	/** @type {import('./__types/BlueskyNavBar').Load} */
	export async function load({ params, fetch, session, stuff }) {
		console.log('ASDFAAAAA');
		const url = `/api/user/loginInfo`;
		const response = await fetch(url);

		return {
			status: response.status,
			props: {
				article: response.ok && (await response.json())
			}
		};
	}
</script>

<script lang="ts">
	import {
		Button,
		Collapse,
		Navbar,
		NavbarToggler,
		NavbarBrand,
		Nav,
		NavItem,
		NavLink,
		Dropdown,
		DropdownToggle,
		DropdownMenu,
		DropdownItem
	} from 'sveltestrap';
	import { session } from '$app/stores';

	let isOpen = false;

	function handleUpdate(event: any) {
		isOpen = event.detail.isOpen;
	}

	// async function getUserInfo() {
	// 	return fetch('/api/user/loginInfo', {
	// 		method: 'GET',
	// 		headers: {
	// 			'Content-Type': 'application/json'
	// 			// 'Content-Type': 'application/x-www-form-urlencoded',
	// 		}
	// 	}).then((response) => response.json());
	// }

	//const userInfo = getUserInfo();
	//console.log(userInfo);
</script>

<Navbar color="light" light expand="md">
	<NavbarBrand href="/">Bluesky</NavbarBrand>
	<NavbarToggler on:click={() => (isOpen = !isOpen)} />
	{JSON.stringify($session)}
	<Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
		<Nav navbar>
			<NavItem>
				<NavLink href="/blog">Blog</NavLink>
			</NavItem>
			<NavItem>
				<NavLink href="/bookkeeping">Bookkeeping</NavLink>
			</NavItem>
		</Nav>
		<Nav class="ms-auto" navbar>
			<NavItem>
				<NavLink href="/oauth2/authorization/google">
					<Button outline class="fa-brands fa-google" />
				</NavLink>
			</NavItem>
			<NavItem>
				<NavLink href="/oauth2/authorization/facebook">
					<Button outline class="fa-brands fa-facebook" />
				</NavLink>
			</NavItem>
			<NavItem>
				<NavLink href="/oauth2/authorization/github">
					<Button outline class="fa-brands fa-github" />
				</NavLink>
			</NavItem>
			<NavItem>
				<NavLink href="/oauth2/authorization/battlenet">
					<Button outline class="fa-brands fa-battle-net" />
				</NavLink>
			</NavItem>
		</Nav>
	</Collapse>
</Navbar>
