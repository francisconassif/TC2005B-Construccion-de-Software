import { Router } from "express";
import { getUsers, getUser, postUser, putUser, deleteUser, getUserScore, updateUserScore } from "../controllers/users.controllers.js"

const router = Router()

router.get("/users", getUsers)
router.get("/users/:id", getUser)
router.post("/users", postUser)
router.put("/users/:id", putUser)
router.delete("/users/:id", deleteUser)
router.get("/usuario/:id/score", getUserScore)
router.post("/usuario/:id/score", updateUserScore)

export default router