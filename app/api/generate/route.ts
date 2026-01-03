import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `
Provide 10 meals. Do not create duplicated meals in the list.

Here's the information I want you to provide for each of the meals:

Meal Name: Name of the meal.
Description: A brief and descriptive overview of the meal.
Number of Calories: The number of calories for one serving.
Recipe: Provide an accurate recipe containing a list of ingredients that's required to recreate the meal, including standard and accurate measurements.

Return the information in the following JSON format where "meals" is an array of objects and "recipe" is an array of strings containing the ingredients with its associated measurement:
{
  "meals": [
    {
      "title": string,
      "calories": number,
      "description": string,
      "recipe": string[],
    }
  ]
}
`;

export async function POST(req: NextRequest) {
  const client = new OpenAI();

  try {
    const data = await req.json();
    const ingredients: string[] = data.ingredients;

    const response = await client.responses.create({
      model: "gpt-5-nano",
      text: {
        format: {
          type: "json_schema",
          name: "meals",
          strict: true,
          schema: {
            type: "object",
            required: ["title", "calories", "description", "recipe"],
            additonalProperties: false,
            properties: {
              title: {
                type: "string",
              },
              calories: {
                type: "number",
              },
              description: {
                type: "string",
              },
              recipe: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      input: [
        {
          role: "developer",
          content: systemPrompt,
        },
        {
          role: "user",
          content: "ingredients from user input goes here",
        },
      ],
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Recipe Creaton Failed",
      error: error instanceof Error ? error.message : "Unknown",
    });
  }
}
