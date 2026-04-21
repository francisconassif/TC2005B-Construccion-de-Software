import pg from "pg"

const dbHost = process.env.DB_HOST ?? "localhost"
const localHosts = new Set(["localhost", "127.0.0.1", "::1"])
const envSsl = process.env.DB_SSL

const shouldUseSSL = envSsl
    ? envSsl === "true"
    : !localHosts.has(dbHost)

const sslConfig = shouldUseSSL
    ? {
        rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === "true",
        ...(process.env.CA_DB ? { ca: process.env.CA_DB } : {}),
    }
    : false

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: dbHost,
    port: Number(process.env.DB_PORT ?? 5432),
    database: process.env.DB_NAME,
    ssl: sslConfig,
};

export const db = new pg.Pool(config)

export function db_connect(){
    return db
}

export async function ensureDatabaseSchema() {
    const sql = db_connect()

    await sql.query(`
        ALTER TABLE usuarios
        ADD COLUMN IF NOT EXISTS max_score INTEGER NOT NULL DEFAULT 0
    `)

    await sql.query(`
        UPDATE usuarios
        SET max_score = GREATEST(COALESCE(max_score, 0), COALESCE(points, 0))
    `)
}