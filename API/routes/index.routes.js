import { Router } from "express"
import {getAPI, postAPI, getPolo, getPing, getABC} from "../controllers/index.controllers.js"

const router = Router()

router.get("/", getAPI)
router.post("/", postAPI)
router.get("/marco", getPolo)
router.get("/ping", getPing)
router.get("/a/b/c", getABC)

export default router