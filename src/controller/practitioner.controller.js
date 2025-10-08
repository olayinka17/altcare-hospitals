import { createPractitioner } from "../service/practitioner.service.js";
import { CustomError } from "../utils/CustomError.js";
import { createPractitionerSchema } from "../schema/auth.schema.js";

export const practitioner = async (req, res, next) => {
  try {
    const { value, error } = createPractitionerSchema.validate(req.body);
    if (error) {
      return new next(CustomError(error.details[0].message, 400))
    }

    const { name, email, hospital_id, professional_id, role } = value;

    const practitioner = await createPractitioner(name, email, hospital_id, professional_id, role)

    res.status(201).json({
        status: "success",
        data: {
            practitioner
        }
    })
  } catch (err) {
    console.log(err);
    next(err)
  }
};
