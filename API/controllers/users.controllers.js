import { db_connect } from "../utils/db.js"
import { getSalt, hash } from "../utils/hash.js"

export const getUsers = async (req, res) => {
    const sql = db_connect()
    const text = "select * from usuarios"
    const result = await sql.query(text)
    console.log(result.rows)
    res.json(result.rows)
}
export const getUser = async (req, res)=>{
    const sql = db_connect();
    const { id } = req.params;
    const text = "select * from usuarios where id = $1";
    const result = await sql.query(text, [id]);
    if(result.rows.length === 0){
        return res.status(404).json({ message: "usuario no existe" });
    }
    res.json(result.rows[0]);
}
export const postUser = async (req, res)=>{
    const sql = db_connect()
    const {name, username, password, points} = req.body
    const salt = getSalt(Number(process.env.SALT_SIZE ?? 8))
    const hashed = hash(password, salt)
    const salted_hashed = salt + hashed
    const text = "insert into usuarios(nombre, correo, password, points) values ($1, $2, $3, $4) returning id, nombre, correo, points"
    const values = [name, username, salted_hashed, points ?? 0]
    const result = await sql.query(text, values)
    
    res.json(result.rows[0]);
}
export const putUser = async (req, res)=>{
    const sql = db_connect()
    const { id } = req.params;
    const { name, username, points } = req.body

    const text = "update usuarios set nombre = $1, correo = $2, points = $3 where id = $4 returning id, nombre, correo, points";
    const values = [name, username, points ?? 0, id]

    const result = await sql.query(text, values)

    res.json(result.rows[0]);
}
export const deleteUser = async (req, res)=>{
    const sql = db_connect()
    const { id } = req.params

    const text = "delete from usuarios where id = $1 returning id";
    const result = await sql.query(text, [id])

    res.json(result.rows[0])
}