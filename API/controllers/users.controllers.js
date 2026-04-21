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

    if(!name || !username || !password){
        return res.status(400).json({message: "Please fill name, email and password"})
    }

    const checkText = "select id from usuarios where lower(correo) = lower($1)"
    const checkResult = await sql.query(checkText, [username])

    if(checkResult.rows.length > 0){
        return res.status(409).json({message: "There is already a user with this email"})
    }

    const salt = getSalt(Number(process.env.SALT_SIZE ?? 8))
    const hashed = hash(password, salt)
    const salted_hashed = salt + hashed
    const text = "insert into usuarios(nombre, correo, password, points, max_score) values ($1, $2, $3, $4, $5) returning id, nombre, correo, points, max_score"
    const values = [name, username, salted_hashed, points ?? 0, 0]
    const result = await sql.query(text, values)
    
    res.status(201).json(result.rows[0]);
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

export const getUserScore = async (req, res) => {
    const sql = db_connect()
    const { id } = req.params

    const text = "select id, nombre as nome, max_score from usuarios where id = $1"
    const result = await sql.query(text, [id])

    if (result.rows.length === 0) {
        return res.status(404).json({ message: "user doesn't exist" })
    }

    const user = result.rows[0]
    return res.json({ id: user.id, nome: user.nome, recorde: user.max_score ?? 0 })
}

export const updateUserScore = async (req, res) => {
    const sql = db_connect()
    const { id } = req.params
    const { novoRecorde } = req.body

    const parsedScore = Number(novoRecorde)
    if (!Number.isInteger(parsedScore) || parsedScore < 0) {
        return res.status(400).json({ message: "score lower than 0" })
    }

    const text = `
        update usuarios
        set max_score = GREATEST(COALESCE(max_score, 0), $1)
        where id = $2
        returning id, nombre as nome, max_score
    `
    const result = await sql.query(text, [parsedScore, id])

    if (result.rows.length === 0) {
        return res.status(404).json({ message: "user not found" })
    }

    const user = result.rows[0]
    return res.json({
        id: user.id,
        nome: user.nome,
        recorde: user.max_score ?? 0,
        message: "max score updated"
    })
}