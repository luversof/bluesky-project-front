/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
import type { LoginInfo } from '$lib/types';
declare global {
	namespace App {
		interface Locals {
			loginInfo: LoginInfo | null;
		}

		// interface Stuff {}
	}
}
