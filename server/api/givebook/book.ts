import pg from 'pg'

const { Client } = pg

const client = new Client({
	user: 'postgres',
	host: 'localhost',
	database: 'library',
	password: 'root',
	port: 5432,
})
client.connect(err => {
	if (err) {
		console.error('Error connecting to the database', err.stack)
	}
})
export default defineEventHandler(async () => {
	try {
		const sql = 'SELECT * FROM givebook ORDER BY id ASC'
		const result = await client.query(sql)
		const dataStorage = useStorage('data')
		await dataStorage.setItem('data', result.rows)

		return {
			data: result.rows,
		}
	} catch (error) {
		console.error('Error executing query', error)
		return {
			error: error,
		}
	}
})
