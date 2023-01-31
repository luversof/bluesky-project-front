import { redirect } from '@sveltejs/kit';

import type { PageLoad } from './$types';
export const load: PageLoad = ({ session }) => {
	//export async function load({ params, fetch, session, stuff }) {
	if (session.loginInfo == null) {
		throw redirect(303, '/login');
	}

	return {};
};
