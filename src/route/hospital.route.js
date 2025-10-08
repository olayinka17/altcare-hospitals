import express  from "express"
import {hospital} from "../controller/hospital.controller.js"

const Router = express.Router()

Router.post("/register", hospital)

export default Router