import type { PageLoad } from './$types';
import { page } from '$app/stores';
import { boardArticleClient } from '$lib/board';

export const load: PageLoad = async ({ params }) => {
	return await boardArticleClient.findByBoardAlias(params.alias);
};
