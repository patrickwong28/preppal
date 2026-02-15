import connectToDatabase from "@/lib/mongodb";
import { Recipe } from "@/models/recipe.model";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    await connectToDatabase();

    const recipes = await Recipe.find({ clerkUserId: userId }).sort({
      createdAt: -1,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Successfully retrieved recipes",
        data: recipes,
      },
      { status: 200 },
    );
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
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    await connectToDatabase();

    const { meal } = await req.json();
    const newRecipe = await Recipe.create({
      ...meal,
      clerkUserId: userId,
    });

    return NextResponse.json(
      { success: true, message: "Successfully Saved Recipe" },
      { status: 201 },
    );
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
