import { db_connect } from "../utils/db.js"
import { getSalt, hash } from "../utils/hash.js"

export const getUsers = async (req, res) => {
    const sql = db_connect()
    const text = "select * from users"
    const result = await sql.query(text)
    console.log(result.rows)
    res.json(result.rows)
}
export const getUser = async (req, res)=>{
    const sql = db_connect();
    const { id } = req.params;
    const text = "select * from users where id = $1";
    const result = await sql.query(text, [id]);
    if(result.rows.length === 0){
        return res.status(404).json({ message: "usuario no existe" });
    }
    res.json(result.rows[0]);
}
export const postUser = async (req, res)=>{
    const sql = db_connect()
    const {name, username, password, points} = req.body
    const salt = getSalt(process.env.SALT_SIZE)
    const hashed = hash(password, salt)
    const salted_hashed = salt + hashed
    const text = "insert into users(name, username, password, points) values ($1, $2, $3, $4)"
    const values = [name, username, salted_hashed, points]
    const result = await sql.query(text, values)
    
    res.json(result.rows[0]);
}
export const putUser = async (req, res)=>{
    const sql = db_connect()
    const { id } = req.params;
    const { name, username, points } = req.body

    const text = "update users set name = $1, username = $2, points = $3 where id = $4 returning id, name, username, points";
    const values = [name, username, points, id]

    const result = await sql.query(text, values)

    res.json(result.rows[0]);
}
export const deleteUser = async (req, res)=>{
    const sql = db_connect()
    const { id } = req.params

    const text = "delete from users where id = $1 returning id";
    const result = await sql.query(text, [id])

    res.json(result.rows[0])
}