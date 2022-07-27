/**
 * 메뉴 구성을 위한 class
 */
export class Menu {
	name: string;
	pathPatterns: RegExp[];
	constructor(name: string, pathPatterns: RegExp[]) {
		this.name = name;
		this.pathPatterns = pathPatterns;
	}
}

export const rootMenuList: Menu[] = [
	new Menu('blog', [/\/blog/, /\/blog\.*/]),
	new Menu('bookkeeping', [/\/bookkeeping/, /\/bookkeeping\/.*/])
];

export const blogMenuList: Menu[] = [
	new Menu('list', [/\/blog\/[[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}\/list/]),
	new Menu('write', [/\/blog\/[[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}\/write/])
];

export function getCurrentMenu(menuList: Menu[], path: string): Menu | null {
	for (const menu of menuList) {
		for (const pathPattern of menu.pathPatterns) {
			if (pathPattern.test(path)) {
				return menu;
			}
		}
	}
	return null;
}

export function getCurrentRootMenu(path: string): Menu | null {
	return getCurrentMenu(rootMenuList, path);
}

export function getCurrentBlogMenu(path: string): Menu | null {
	return getCurrentMenu(blogMenuList, path);
}
