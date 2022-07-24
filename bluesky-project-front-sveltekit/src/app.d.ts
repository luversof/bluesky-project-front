/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

import type { LonginInfo } from '$lib/types';

declare namespace App {
	interface Locals {
		loginInfo?: LonginInfo;
	}
	// interface Platform {}
	interface Session {
		loginInfo?: LonginInfo;
	}
	// interface Stuff {}
}
