import type { Blog } from '$lib/types';

export function isUserBlog(blogList: Array<Blog>, blogId: string): boolean {
	if (blogList == null || blogId == null) {
		return false;
	}

	for (const blog of blogList) {
		if (blogId == blog.blogId) {
			return true;
		}
	}
	return false;
}
