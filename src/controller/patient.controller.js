import {
  createPatient,
  createMedicalHistory,
  createDiagnosis,
  createLabTest,
  createPrescription,
  getPatientRecords,
} from "../service/patient.service.js";
import { CustomError } from "../utils/CustomError.js";
import {
  createPatientSchema,
  medicalHistorySchema,
  diagnosisSchema,
  labTestSchema,
  prescriptionSchema,
  externalParamsSchema,
} from "../schema/auth.schema.js";

export const patient = async (req, res, next) => {
  try {
    const { value, error } = createPatientSchema.validate(req.body);
    if (error) {
      return next(new CustomError(error.details[0].message, 400));
    }

    const { email, name, gender, NIN, blood_type, hospital_id } = value;

    const patient = await createPatient(
      email,
      name,
      gender,
      NIN,
      blood_type,
      hospital_id
    );

    res.status(201).json({
      status: "sucess",
      data: {
        patient,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const history = async (req, res, next) => {
  try {
    const { value, error } = medicalHistorySchema.validate(req.body);
    if (error) {
      return next(new CustomError(error.details[0].message, 400));
    }

    const { category, name, record_date, notes, record_id } = value;

    const history = await createMedicalHistory(
      category,
      name,
      record_date,
      notes,
      record_id
    );

    res.status(201).json({
      status: "success",
      data: {
        history,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const diagnoses = async (req, res, next) => {
  try {
    const { value, error } = diagnosisSchema.validate(req.body);
    if (error) {
      return next(new CustomError(error.details[0].message, 400));
    }

    const { practitioner_id, record_id, description, status, diagnosed_at } =
      value;

    const diagnosis = await createDiagnosis(
      practitioner_id,
      record_id,
      description,
      status,
      diagnosed_at
    );

    res.status(201).json({
      status: "success",
      data: {
        diagnosis,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const labTest = async (req, res, next) => {
  try {
    const { value, error } = labTestSchema.validate(req.body);

    if (error) {
      return next(new CustomError(error.details[0].message, 400));
    }

    const {
      test_name,
      tested_at,
      doctor_id,
      lab_facility,
      clinical_interpretation,
      record_id,
      result_values, // an array of result value
    } = value;

    const labTest = await createLabTest(
      test_name,
      tested_at,
      doctor_id,
      lab_facility,
      clinical_interpretation,
      record_id,
      result_values
    );

    res.status(201).json({
      status: "success",
      data: {
        labTest,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const prescription = async (req, res, next) => {
  try {
    const { value, error } = prescriptionSchema.validate(req.body);

    if (error) {
      return next(new CustomError(error.details[0].message, 400));
    }

    const {
      record_id,
      medication_name,
      dosage,
      refills,
      instructions,
      frequency,
      notes,
      status,
      practitioner_id,
    } = value;

    const prescription = await createPrescription(
      record_id,
      medication_name,
      dosage,
      refills,
      instructions,
      frequency,
      notes,
      status,
      practitioner_id
    );

    res.status(201).json({
      status: "success",
      data: {
        prescription,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getPatient = async (req, res, next) => {
  try {
    const {value, error} = externalParamsSchema.validate(req.params)

    if(error) {
        return next(new CustomError(error.details[0].message, 400))
    }


    const { hospitalName, nin } = value;

    

    const patient = await getPatientRecords(hospitalName, nin);

    res.status(200).json({
      status: "success",
      data: {
        patient,
      },
    });
  } catch (err) {
    next(err);
  }
};
