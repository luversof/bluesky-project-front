import type { Handle, GetSession } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// console.log(' userInfoResponse start ');
	const userInfoResponse = await fetch(event.url.origin + '/api/user/loginInfo', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Cookie: event.request.headers.get('cookie') || ''
		}
	});

	if (userInfoResponse.status == 200) {
		event.locals.loginInfo = await userInfoResponse.json();
	} else {
		event.locals.loginInfo = null;
	}

	// console.log('event.locals.loginInfo js : ', event.locals.loginInfo);

	const response = await resolve(event);
	return response;
};

export const getSession: GetSession = (event) => {
	return {
		loginInfo: event.locals.loginInfo
	};
};
