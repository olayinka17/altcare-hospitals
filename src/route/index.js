import express from "express"
import hospitalRoute from "./hospital.route.js"
import PractitionerRoute from "./practitoner.route.js"
import patientRoute from "./patient.route.js"

const Router = express.Router()

Router.use('/hospitals', hospitalRoute)
Router.use("/practitioners", PractitionerRoute)
Router.use("/patients", patientRoute)

export default Router