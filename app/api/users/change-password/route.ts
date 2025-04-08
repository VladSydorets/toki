import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/(auth)/AuthOptions";

export async function POST(req: NextRequest) {
  const { currentPassword, newPassword } = await req.json();

  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const userPassword = await prisma.user.findUnique({
    where: { id: userId },
    select: { password: true },
  });

  if (!userPassword) return new Response("Unauthorized", { status: 401 });

  const isValid = await bcrypt.compare(
    currentPassword,
    userPassword.password || ""
  );
  if (!isValid)
    return new Response("Incorrect password was entered", { status: 400 });

  const hashedNewPassword = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedNewPassword },
  });

  return NextResponse.json({ message: "Password updated" }, { status: 200 });
}
