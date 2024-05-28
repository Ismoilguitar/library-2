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

const storage = new Map()
const useStorage = namespace => {
	return {
		async setItem(key, value) {
			storage.set(`${namespace}:${key}`, value)
		},
		async getItem(key) {
			return storage.get(`${namespace}:${key}`)
		},
	}
}

export default defineEventHandler(async event => {
	try {
		const { id } = event.context.params
		const sql = 'SELECT * FROM book WHERE id = $1'
		const result = await client.query(sql, [id])
		const dataStorage = useStorage('data')
		await dataStorage.setItem('data', result.rows)

		if (result.rows.length === 0) {
			return { error: 'Book not found' }
		}
		return {
			data: result.rows[0],
		}
	} catch (error) {
		console.error('Error executing query', error)
		return { error: 'Internal server error' }
	}
})
