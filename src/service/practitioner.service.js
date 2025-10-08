import {Role} from "@prisma/client"
import { prisma } from "../utils/prisma.js";
import { CustomError } from "../utils/CustomError.js";

// const { Role } = pkg;
export const createPractitioner = async (
  name,
  email,
  hospital_id,
  professional_id,
  role
) => {
  const existingPractitioner = await prisma.practitioner.findFirst({
    where: { OR: [{ email }, { professional_id }] },
  });

  const hospital = await prisma.hospital.findUnique({
    where: { id: hospital_id },
  });

  if (!hospital) {
    throw new CustomError("Hospital not found", 404);
  }

    const normalized = String(role).trim().toLowerCase();
    const allowed = ["doctor", "nurse", "admin", "specialist"];
    if (!allowed.includes(normalized)) {
      throw new CustomError(`Invalid role: ${role}`, 400);
    }

    const roleEnum =
      (Role && Role[normalized]) ??
      (Role && Role[normalized.toUpperCase()]) ??
      normalized;

  const practitionerData = {
    name,
    professional_id,
    hospital_id,
    email,
    role: roleEnum
  };

  let user;
  if (existingPractitioner) {
    user = await prisma.practitioner.update({
      where: { id: existingPractitioner.id },
      data: practitionerData,
    });
  } else {
    user = await prisma.practitioner.create({ data: practitionerData });
  }

  return user;
};
