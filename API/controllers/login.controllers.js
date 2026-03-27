import { db_connect } from "../utils/db.js";
import { hash } from "../"

export const login = async (req, res)=>{
    const sql = db_connect()
    
    const {username, password} = req.body;
    const text = "select * from users where username=$1"
    const values = [username]
    const result = await sql.query(text,values)
    console.log(result.rows[0])
    if(result.rows[0].password === password){
        res.status(200).json({isLogin:true, user:result.rows[0]})
    }
    else{
        res.status(404).json({isLogin:false, user:{}})
    }
    
    res.send("post login");
}