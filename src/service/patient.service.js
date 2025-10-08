import { prisma } from "../utils/prisma.js";
import { CustomError } from "../utils/CustomError.js";

export const createPatient = async (
  email,
  name,
  gender,
  NIN,
  blood_type,
  hospital_id
) => {
  const existingPatient = await prisma.patient.findUnique({
    where: { email },
  });

  if (existingPatient) {
    throw new CustomError("An account with this email exist.", 400);
  }

  const hospitalExists = await prisma.hospital.findUnique({
    where: { id: hospital_id },
  });

  if (!hospitalExists) {
    throw new CustomError("Invalid hospital_id", 400);
  }
  const patient = await prisma.patient.create({
    data: {
      email,
      name,
      gender,
      NIN,
      hospitals: {
        create: [
          {
            hospital: { connect: { id: hospital_id } },
          },
        ],
      },
      Patient_record: {
        create: { blood_type, hospital_id },
      },
    },
    include: {
      hospitals: true,
      Patient_record: true,
    },
  });

  return patient;
};

// export const createPatientRecord = async (
//   blood_type,
//   patient_id,
//   history_category,
//   name,
//   notes,
//   record_date
// ) => {
//   const existingRecord = await prisma.patient_record.findFirst({
//     where: { patient_id },
//   });
//   if (existingRecord) {
//     return new CustomError("Patient record already exist", 400);
//   }

//   const record = await prisma.patient_record.create({
//     data: {
//       blood_type,
//       medical_history: {
//         create: [
//           {
//             category: history_category,
//             name,
//             notes,
//             record_date,
//           },
//         ],
//       },
//     },
//   });

//   return record
// };

export const createMedicalHistory = async (
  category,
  name,
  record_date,
  notes,
  record_id
) => {
  const medicalHistory = await prisma.medical_history.create({
    data: {
      category,
      name,
      notes,
      record_date,
      record: { connect: { id: record_id } },
    },
    include: {
      record: true,
    },
  });

  return medicalHistory;
};

export const createDiagnosis = async (
  practitioner_id,
  record_id,
  description,
  status,
  diagnosed_at
) => {
  const diagnosis = await prisma.diagnosis.create({
    data: {
      description,
      status,
      diagnosed_at,
      record: { connect: { id: record_id } },
      practitioner: { connect: { id: practitioner_id } },
    },
    include: {
      practitioner: true,
      record: true,
    },
  });

  return diagnosis;
};

export const createLabTest = async (
  test_name,
  tested_at,
  doctor_id,
  lab_facility,
  clinical_interpretation,
  record_id,
  result_values
) => {
  const labTest = await prisma.lab_test.create({
    data: {
      test_name,
      tested_at,
      lab_facility,
      clinical_interpretation,
      result_values: {
        create: result_values,
      },
      doctor: { connect: { id: doctor_id } },
      record: { connect: { id: record_id } },
    },
    include: {
      result_values: true,
      doctor: true,
      record: true,
    },
  });

  return labTest;
};

export const createPrescription = async (
  record_id,
  medication_name,
  dosage,
  refills,
  instructions,
  frequency,
  notes,
  status,
  practitioner_id
) => {
  const prescription = await prisma.medication_items.create({
    data: {
      dosage,
      refills,
      instructions,
      frequency,
      status,
      notes,
      medication_name,
      record: { connect: { id: record_id } },
      practitioner: { connect: { id: practitioner_id } },
    },
    include: {
      record: true,
      practitioner: true,
    },
  });

  return prescription;
};

export const getPatientRecords = async (hospital_name, NIN) => {
  const hospitalExists = await prisma.hospital.findUnique({
    where: { slug: hospital_name },
  });

  if (!hospitalExists) {
    throw new CustomError("Invalid Hospital name", 404);
  }

  const patient = await prisma.patient.findFirst({
    where: {
      NIN,
      hospitals: {
        some: { hospital_id: hospitalExists.id },
      },
    },
    select: {
      name: true,
      email: true,
      NIN: true,
      gender: true,
      Patient_record: {
        select: {
          blood_type: true,
          diagnoses: {
            select: {
              diagnosed_at: true,
              description: true,
              status: true,
              practitioner: {
                select: {
                  professional_id: true,
                },
              },
            },
          },
          lab_tests: {
            select: {
              tested_at: true,
              test_name: true,

              lab_facility: true,
              clinical_interpretation: true,
              doctor: {
                select: {
                  professional_id: true,
                },
              },
              result_values: {
                select: {
                  parameter: true,
                  unit: true,
                  reference_range: true,
                },
              },
            },
          },
          medical_history: {
            select: {
              category: true,
              name: true,
              notes: true,
              record_date: true,
            },
          },
          prescription: {
            select: {
              medication_name: true,
              dosage: true,
              refills: true,
              instructions: true,
              frequency: true,
              notes: true,
              status: true,
              practitioner: {
                select: {
                  professional_id: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!patient) {
    throw new CustomError("patient records not found", 404);
  }

  return patient;
};
