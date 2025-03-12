import prisma from "./db";

export async function getAllUsers() {
  return await prisma.user.findMany();
}
