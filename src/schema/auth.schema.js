import Joi from "joi";

export const createHospitalSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  address: Joi.string().min(5).max(200).required(),
});

export const createPatientSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  NIN: Joi.string().pattern(/^\d{11}$/),
  gender: Joi.string().valid("male", "female", "other"),
  blood_type: Joi.string().required(),
  hospital_id: Joi.string().guid().required(),
});

export const createPractitionerSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(2).max(100).required(),
  role: Joi.string().valid("doctor", "nurse", "admin", "specialist"),
  hospital_id: Joi.string().guid().required(),
  professional_id: Joi.string().min(5).max(50).required(),
});

export const labTestSchema = Joi.object({
  record_id: Joi.string().guid().required(),
  test_name: Joi.string().min(5).max(50).required(),
  tested_at: Joi.date(),
  doctor_id: Joi.string().guid().required(),
  lab_facility: Joi.string().min(5).max(50).required(),
  clinical_interpretation: Joi.string().min(4).max(500).required(),
  result_values: Joi.array().items(
    Joi.object({
      parameter: Joi.string().min(2).max(100),
      result: Joi.string().min(3).max(100).required(),
      unit: Joi.string().optional().allow(""),
      reference_range: Joi.string().optional().allow(""),
    })
      .min(1)
      .required()
  ),
});

export const diagnosisSchema = Joi.object({
  record_id: Joi.string().guid().required(),
  practitioner_id: Joi.string().guid().required(),
  description: Joi.string().min(5).max(100).required(),
  diagnosed_at: Joi.date().required(),
  status: Joi.string().valid("active", "cleared", "monitoring").required(),
});

export const medicalHistorySchema = Joi.object({
  category: Joi.string()
    .valid(
      "chronic_conditions",
      "family_history",
      "allergies",
      "past_surgeries"
    )
    .required(),
  name: Joi.string().min(2).max(50).required(),
  record_id: Joi.string().guid().required(),
  notes: Joi.string().min(3).max(200),
  record_date: Joi.date().less("now"),
});

export const prescriptionSchema = Joi.object({
  record_id: Joi.string().guid().required(),
  practitioner_id: Joi.string().guid().required(),
  medication_name: Joi.string().min(2).max(50),
  dosage: Joi.string().min(5).max(50),
  refills: Joi.number().min(1).max(400),
  instructions: Joi.string().min(5).max(100).required(),
  frequency: Joi.string().min(1).max(50),
  notes: Joi.string().min(5).max(200),
  status: Joi.string().valid("active", "inactive", "cancelled", "need_refills"),
});

export const externalParamsSchema = Joi.object({
  hospitalName: Joi.string().required(),
  nin: Joi.string().pattern(/^\d{11}$/),
})