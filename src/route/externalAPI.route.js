import express from "express"
import {getPatient} from "../controller/patient.controller.js"

const Router = express.Router()

Router.get("/hospitals/:hospitalName/patients/:nin", getPatient)

export default Router