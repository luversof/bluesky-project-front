/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET() {
	return {
		status: 303,
		headers: {
			location: `list`
		}
	};
}
