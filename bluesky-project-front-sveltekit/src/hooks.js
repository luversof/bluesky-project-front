export const handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	return response;
};
export const getSession = (event) => {
	return {
		user: { id: 'AA', name: 'nameAA' }
	};
};
