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
const useStorage = (namespace: any) => {
	return {
		async setItem(key: any, value: any) {
			storage.set(`${namespace}:${key}`, value)
		},
		async getItem(key: any) {
			return storage.get(`${namespace}:${key}`)
		},
	}
}

export default defineEventHandler(async () => {
	try {
		const sql = 'SELECT * FROM book ORDER BY id ASC'
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
