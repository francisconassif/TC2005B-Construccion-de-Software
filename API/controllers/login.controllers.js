import { db_connect } from "../utils/db.js";
import { hash } from "../utils/hash.js"

export const login = async (req, res)=>{
    const sql = db_connect()
    
    const {username, password} = req.body;
    const text = "select * from users where username=$1"
    const values = [username]
    const result = await sql.query(text,values)
    const user = result.rows[0]

    if(!user){
        return res.status(404).json({isLogin:false, user:null, message:"Usuario no encontrado"})
    }

    if(user.password === password){
        return res.status(200).json({isLogin:true, user})
    }

    return res.status(401).json({isLogin:false, user:null, message:"Credenciales incorrectas"})
}