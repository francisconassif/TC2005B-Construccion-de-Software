import "dotenv/config"
import express from "express"
import cors from "cors"
import indexRoutes from "./routes/index.routes.js"
import loginRoutes from "./routes/login.routes.js"
import usersRoutes from "./routes/users.routes.js"
import { ensureDatabaseSchema } from "./utils/db.js"
 
const app = express()

app.use(cors())
app.use(express.json())
app.use(indexRoutes)

app.use(loginRoutes)
app.use(usersRoutes)

app.use((req, res) => {
	res.status(404).json({ message: "Not found" })
})

app.use((err, req, res, next) => {
	console.error("Unhandled error:", err)
	res.status(err.status || 500).json({
		message: err.message || "Server error"
	})
})

ensureDatabaseSchema()
	.then(() => {
		app.listen(5000, () => console.log("http://localhost:5000"))
	})
	.catch((err) => {
		console.error("database error", err)
		process.exit(1)
	})
