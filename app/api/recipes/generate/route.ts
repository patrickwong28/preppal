import { fetchMealImage } from "@/lib/pexels";
import { Meal } from "@/utils/types";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `
You are generating meal ideas based on ingredients provided by the user.

Rules:
- Generate exactly 10 meals.
- All meals must be unique in name and concept.
- Each meal must include all user-provided ingredients.
- You may add additional common ingredients if necessary for a complete recipe and to provide diversity to the list of meals.
- Do not include cooking steps or instructions.
- Do not include markdown, commentary, or explanations.
- Return valid JSON only.
- Keep descriptions under 250 characters.

For each meal, provide:
- name: Name of the meal.
- description: A breief, clear overview of the meal.
- calories: An estimated number of calories per serving (integer).
- recipe: An array of strings where each string is a single ingredient with a standard measurement.

Output format:
{
  "meals": [
    {
      "name": string,
      "description": string,
      "calories": number,
      "recipe": string[]
    }
  ]
}
`;

export async function POST(req: NextRequest) {
  const client = new OpenAI();

  try {
    const data = await req.json();
    const ingredients: string[] = data.ingredients;
    const userPrompt = `Ingredients provided by the user: ${ingredients.join(
      ", ",
    )}`;

    const response = await client.responses.create({
      model: "gpt-5-nano",
      text: {
        format: {
          type: "json_schema",
          name: "meals",
          strict: true,
          schema: {
            type: "object",
            required: ["meals"],
            additionalProperties: false,
            properties: {
              meals: {
                type: "array",
                minItems: 10,
                maxItems: 10,
                items: {
                  type: "object",
                  required: ["name", "calories", "description", "recipe"],
                  additionalProperties: false,
                  properties: {
                    name: {
                      type: "string",
                    },
                    description: {
                      type: "string",
                    },
                    calories: {
                      type: "number",
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
          content: userPrompt,
        },
      ],
    });

    const responseJSON = JSON.parse(response.output_text);
    const mealsWithImages = await Promise.all(
      responseJSON.meals.map(async (meal: Meal) => {
        const imageURL = await fetchMealImage(meal.name);

        if (imageURL) return { ...meal, image: imageURL };
      }),
    );

    return NextResponse.json(
      {
        success: true,
        message: "Recipe Creation Successful",
        data: mealsWithImages,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Recipe Creaton Failed",
        error: error instanceof Error ? error.message : "Unknown",
      },
      { status: 500 },
    );
  }
}
