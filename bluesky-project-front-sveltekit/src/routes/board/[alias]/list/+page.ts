import type { PageLoad } from './$types';
import { boardArticleClient } from '$lib/board';

export const load: PageLoad = ({ params, url }) => {
	let page = Number(url.searchParams.get('page'));
	return boardArticleClient.findByBoardAlias(params.alias, page == 0 ? 0 : page - 1);
};
