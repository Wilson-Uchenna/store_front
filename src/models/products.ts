import  Client  from "../database.js";


export type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM products'

            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not get products. Error: ${err}`)
        }
    }

    async show(id: string): Promise<Product> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM products WHERE id=($1)'

            const result = await conn.query(sql, [id])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`)
        }
    }

    async create(p: Product): Promise<Product> {
        try {
            const conn = await Client.connect()
            const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *'

            const result = await conn.query(sql, [p.name, p.price, p.category])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not add new product ${p.name}. Error: ${err}`)
        }
    }
}