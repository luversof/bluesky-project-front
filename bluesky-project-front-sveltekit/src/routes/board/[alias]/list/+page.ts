import type { PageLoad } from './$types';
import { boardArticleClient } from '$lib/board';

export const load: PageLoad = ({ params }) => {
	return boardArticleClient.findByBoardAlias(params.alias);
};
