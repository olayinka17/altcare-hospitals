-- CreateEnum
CREATE TYPE "Diagnosis_status" AS ENUM ('active', 'cleared', 'monitoring');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('chronic_conditions', 'family_history', 'allergies', 'past_surgeries');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('active', 'inactive', 'cancelled', 'need_refills');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('female', 'male');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('patient', 'doctor', 'nurse', 'specialist', 'admin');

-- CreateTable
CREATE TABLE "Hospital" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hospital_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hospital_patient" (
    "hospital_id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Hospital_patient_pkey" PRIMARY KEY ("hospital_id","patient_id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "NIN" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Practitioner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "professional_id" TEXT NOT NULL,
    "hospital_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "Practitioner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient_practitioner" (
    "patient_id" TEXT NOT NULL,
    "practititoner_id" TEXT NOT NULL,
    "assigned_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_practitioner_pkey" PRIMARY KEY ("patient_id","practititoner_id")
);

-- CreateTable
CREATE TABLE "Patient_records" (
    "id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "hospital_id" TEXT NOT NULL,
    "blood_type" TEXT NOT NULL,

    CONSTRAINT "Patient_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medication_items" (
    "id" TEXT NOT NULL,
    "record_id" TEXT NOT NULL,
    "medication_name" TEXT NOT NULL,
    "dosage" TEXT NOT NULL,
    "refills" INTEGER NOT NULL,
    "instructions" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "notes" TEXT,
    "status" "Status" NOT NULL,

    CONSTRAINT "Medication_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diagnosis" (
    "id" TEXT NOT NULL,
    "record_id" TEXT NOT NULL,
    "practitioner_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "diagnosed_at" TIMESTAMP(3) NOT NULL,
    "status" "Diagnosis_status" NOT NULL DEFAULT 'active',

    CONSTRAINT "Diagnosis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lab_test" (
    "id" TEXT NOT NULL,
    "record_id" TEXT NOT NULL,
    "test_name" TEXT NOT NULL,
    "tested_at" TEXT NOT NULL,
    "ordering_doctor" TEXT NOT NULL,
    "lab_facility" TEXT NOT NULL,
    "clinical_interpretation" TEXT NOT NULL,

    CONSTRAINT "Lab_test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Result_value" (
    "id" TEXT NOT NULL,
    "lab_test_id" TEXT NOT NULL,
    "parameter" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "reference_range" TEXT NOT NULL,

    CONSTRAINT "Result_value_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medical_history" (
    "id" TEXT NOT NULL,
    "record_id" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "name" TEXT NOT NULL,
    "notes" TEXT,
    "record_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Medical_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "Patient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_records_patient_id_key" ON "Patient_records"("patient_id");

-- AddForeignKey
ALTER TABLE "Hospital_patient" ADD CONSTRAINT "Hospital_patient_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hospital_patient" ADD CONSTRAINT "Hospital_patient_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Practitioner" ADD CONSTRAINT "Practitioner_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient_practitioner" ADD CONSTRAINT "Patient_practitioner_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient_practitioner" ADD CONSTRAINT "Patient_practitioner_practititoner_id_fkey" FOREIGN KEY ("practititoner_id") REFERENCES "Practitioner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient_records" ADD CONSTRAINT "Patient_records_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medication_items" ADD CONSTRAINT "Medication_items_record_id_fkey" FOREIGN KEY ("record_id") REFERENCES "Patient_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diagnosis" ADD CONSTRAINT "Diagnosis_record_id_fkey" FOREIGN KEY ("record_id") REFERENCES "Patient_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diagnosis" ADD CONSTRAINT "Diagnosis_practitioner_id_fkey" FOREIGN KEY ("practitioner_id") REFERENCES "Practitioner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lab_test" ADD CONSTRAINT "Lab_test_ordering_doctor_fkey" FOREIGN KEY ("ordering_doctor") REFERENCES "Practitioner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lab_test" ADD CONSTRAINT "Lab_test_record_id_fkey" FOREIGN KEY ("record_id") REFERENCES "Patient_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result_value" ADD CONSTRAINT "Result_value_lab_test_id_fkey" FOREIGN KEY ("lab_test_id") REFERENCES "Lab_test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medical_history" ADD CONSTRAINT "Medical_history_record_id_fkey" FOREIGN KEY ("record_id") REFERENCES "Patient_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
