import express from "express"
import {patient, history, labTest, diagnoses, prescription} from "../controller/patient.controller.js"

const Router = express.Router()

Router.post('/register', patient)
Router.post("/history", history)
Router.post("/lab-test", labTest)
Router.post("/diagnosis", diagnoses)
Router.post("/prescription", prescription)

export default Router