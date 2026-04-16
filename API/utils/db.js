import pg from "pg"

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 5432),
    database: process.env.DB_NAME,
    ssl: process.env.DB_SSL === "true" ? {
        rejectUnauthorized: false,
        ca: process.env.CA_DB,
    } : false,
};

export const db = new pg.Pool(config)

export function db_connect(){
    return db
}