import express from "express"
import {practitioner} from "../controller/practitioner.controller.js"

const Router = express.Router()

Router.post('/register', practitioner)

export default Router