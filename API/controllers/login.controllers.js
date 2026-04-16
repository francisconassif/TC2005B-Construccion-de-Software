import { db_connect } from "../utils/db.js";
import { hash } from "../utils/hash.js"

export const login = async (req, res)=>{
    const sql = db_connect()
    
    const {username, password} = req.body;
    const text = "select * from usuarios where correo = $1"
    const values = [username]
    const result = await sql.query(text,values)
    const user = result.rows[0]

    if(!user){
        return res.status(404).json({isLogin:false, user:null, message:"Usuario no encontrado"})
    }

    const saltSize = Number(process.env.SALT_SIZE ?? 8)
    const salt = user.password.slice(0, saltSize)
    const expectedHash = salt + hash(password, salt)

    if(user.password === expectedHash){
        const { password, ...safeUser } = user
        return res.status(200).json({isLogin:true, user:safeUser})
    }

    return res.status(401).json({isLogin:false, user:null, message:"Credenciales incorrectas"})
}