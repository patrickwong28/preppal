import connectToDatabase from "@/lib/mongodb";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    console.log("UserId", userId);

    await connectToDatabase();

    const body = await req.json();
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Recipe Save Failed",
        error: error instanceof Error ? error.message : "Unknown",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Recipe Save Failed",
        error: error instanceof Error ? error.message : "Unknown",
      },
      { status: 500 },
    );
  }
}
