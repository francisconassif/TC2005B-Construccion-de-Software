import { db_connect } from "../utils/db.js";
import { hash } from "../utils/hash.js"

export const login = async (req, res)=>{
    try {
        const sql = db_connect()
        const {username, password} = req.body;

        if(!username || !password){
            return res.status(400).json({isLogin:false, user:null, message:"You need to fill email and password"})
        }

        const text = "select * from usuarios where correo = $1"
        const values = [username]
        const result = await sql.query(text,values)
        const user = result.rows[0]

        if(!user){
            return res.status(404).json({isLogin:false, user:null, message:"User not found"})
        }

        const saltSize = Number(process.env.SALT_SIZE ?? 8)
        const salt = user.password.slice(0, saltSize)
        const expectedHash = salt + hash(password, salt)

        if(user.password === expectedHash){
            const { password, ...safeUser } = user
            return res.status(200).json({isLogin:true, user:safeUser})
        }

        return res.status(401).json({isLogin:false, user:null, message:"Wrong user or password"})
    } catch (error) {
        console.error("Login error:", error)
        return res.status(500).json({isLogin:false, user:null, message:"Internal error"})
    }
}