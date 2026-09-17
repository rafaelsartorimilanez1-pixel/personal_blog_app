import pkg from 'pg';

import 'dotenv/config'

const {Pool} = pkg;

console.log(process.env.DATABASE_URL)

export const pool = new Pool ({
    connectionString: process.env.DATABASE_URL
})