import { createHospital } from "../service/hospital.service.js";
import { createHospitalSchema } from "../schema/auth.schema.js";
import { CustomError } from "../utils/CustomError.js";

export const hospital = async (req, res, next) => {
  try {
    const { value, error } = createHospitalSchema.validate(req.body);
    // console.log(error)

    if (error) {
      return next(new CustomError(error.details[0].message, 400));
    }

    const { name, address } = value;

    const hospital = await createHospital(name, address);

    res.status(201).json({
      status: "success",
      data: {
        hospital,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
