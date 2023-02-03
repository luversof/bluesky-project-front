import type { LayoutLoad } from './$types';
import { getLoginInfo } from '$lib/loginInfo';

export const ssr = false;

export const load: LayoutLoad = async () => {
	return {
		// session: getLoginInfo()
	};
};
