import { prisma } from "../utils/prisma.js";
import { CustomError } from "../utils/CustomError.js";
import slugify from "slugify"

export const createHospital = async (name, address) => {

  const existingHospital = await prisma.hospital.findFirst({
    where: { name },
  });
  if (existingHospital) {
    throw new CustomError("Invalid credentials", 409)
  }

  const slug = slugify(name, { lower: true, strict: true });
  const hospital = await prisma.hospital.create({
    data: { name, address, slug },
  });

  return hospital
};


