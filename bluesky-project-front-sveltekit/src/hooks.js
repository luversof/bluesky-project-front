/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
	// console.log(' userInfoResponse start ');
	const userInfoResponse = await fetch(event.url.origin + '/api/user/loginInfo', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Cookie: event.request.headers.get('cookie')
		}
	});

	if (userInfoResponse.status == 200) {
		event.locals.loginInfo = await userInfoResponse.json();
	} else {
		event.locals.loginInfo = 'NOT_LOGIN USER';
	}

	console.log('event.locals.loginInfo : ', event.locals.loginInfo);

	const response = await resolve(event);
	return response;
};
/** @type {import('@sveltejs/kit').GetSession} */
export const getSession = async (event) => {
	return {
		userInfo: event.locals.loginInfo
	};
};
