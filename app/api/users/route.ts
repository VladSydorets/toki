import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/(auth)/AuthOptions";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Not authorized." }, { status: 401 });
  }

  if (!id) {
    return NextResponse.json({ erro: "User ID is required." }, { status: 400 });
  }

  try {
    const user = await prisma.user.delete({
      where: { id: id },
    });

    return NextResponse.json(
      { message: `User #${user.id} has been deleted successfully.` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting the user:", error);
    return NextResponse.json(
      { error: "Failed to delete the user" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const { firstName, lastName, email } = await req.json();

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Not authorized." }, { status: 401 });
  }

  try {
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        firstName,
        lastName,
        email,
      },
    });

    revalidatePath("/settings");

    return NextResponse.json(
      { message: `User #${user.id} has been updated successfully.` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating the user:", error);
    return NextResponse.json(
      { error: "Failed to update the user" },
      { status: 500 }
    );
  }
}
