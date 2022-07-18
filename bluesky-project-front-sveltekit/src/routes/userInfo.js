export const userInfo = async () => {
	return fetch('/api/user/loginInfo', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((response) => response.json());
};
