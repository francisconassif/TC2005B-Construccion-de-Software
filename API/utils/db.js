import pg from "pg"

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: true,
        ca: process.env.CA_DB,
    },
};

export function db_connect(){
    const client = new pg.Client(config);
    client.connect(function (err) {
        if (err)
            throw err;
        client.query("SELECT VERSION()", [], function (err, result) {
            if (err)
                throw err;

            console.log(result.rows[0].version);
            client.end(function (err) {
                if (err)
                    throw err;
            });
        });
    });
    return client;
}