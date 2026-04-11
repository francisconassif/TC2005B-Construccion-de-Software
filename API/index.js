import "dotenv/config"
import express from "express"
import cors from "cors"
import indexRoutes from "./routes/index.routes.js"
import { db_connect } from "./utils/db.js"
import loginRoutes from "./routes/login.routes.js"
import usersRoutes from "./routes/users.routes.js"
 
const app = express()

app.use(cors())
app.use(express.json())
app.use(indexRoutes)

app.use(loginRoutes)
app.use(usersRoutes)

// app.use()

app.listen(5000, () => console.log("http://localhost:5000"))
