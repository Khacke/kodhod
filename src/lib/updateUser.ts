const getManagementApiToken = async () => {
	const response = await fetch(`${process.env.AUTH0_DOMAIN}/oauth/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Cache-Control': 'no-cache',
		},
		body: new URLSearchParams({
			client_id: process.env.AUTH0_CLIENT_ID!,
			client_secret: process.env.AUTH0_CLIENT_SECRET!,
			audience: process.env.AUTH0_MANAGEMENT_API_AUDIENCE!,
			grant_type: 'client_credentials',
		}),
	});

	if (!response.ok) {
		throw new Error('Failed to retrieve Management API token');
	}

	const { access_token } = await response.json();
	return access_token;
};

const getUsername = async (userId: string, token: string) => {
	const response = await fetch(`${process.env.AUTH0_MANAGEMENT_API_AUDIENCE}users/${userId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		console.error(await response.text());
		throw new Error('Failed to retrieve user info');
	}

	const user = await response.json();

	return user.nickname || user.name;
};

export async function getUserById(userId: string) {
	const token = await getManagementApiToken();
	const username = await getUsername(userId, token);
	return username;
}
