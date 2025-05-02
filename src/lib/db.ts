import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, {
	host: process.env.POSTGRES_HOST,
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DATABASE,
});

export default sql;
