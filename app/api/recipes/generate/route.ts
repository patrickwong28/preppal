import { fetchMealImage } from "@/lib/pexels";
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
- Keep descriptions under 250 characters.
- Output each meal as an independent JSON object wrapped between <MEAL> and </MEAL>.
- Do NOT wrap meals in an array.
- Do NOT output a top-level JSON object.

For each meal, provide:
- name: Name of the meal.
- description: A breief, clear overview of the meal.
- calories: An estimated number of calories per serving (integer).
- recipe: An array of strings where each string is a single ingredient with a standard measurement.

Output format for EACH meal:
<Meal>
{
  "name": string,
  "description": string,
  "calories": number,
  "recipe": string[]
}
</Meal>
`;

export async function POST(req: NextRequest) {
  const client = new OpenAI();

  try {
    const data = await req.json();
    const ingredients: string[] = data.ingredients;
    const userPrompt = `Ingredients provided by the user: ${ingredients.join(
      ", ",
    )}`;

    const stream = await client.responses.create({
      model: "gpt-5-nano",
      stream: true,
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

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        let buffer = "";

        for await (const event of stream) {
          if (event.type === "response.output_text.delta") {
            buffer += event.delta;

            while (buffer.includes("</MEAL>")) {
              const openTag = "<MEAL>";
              const closeTag = "</MEAL>";

              // TODO: consider changing the name of variables for meal and mealJSON
              const startIndex = buffer.indexOf(openTag) + openTag.length;
              const endIndex = buffer.indexOf(closeTag);
              const meal = buffer.substring(startIndex, endIndex);
              const mealJSON = JSON.parse(meal);
              const imageURL = await fetchMealImage(mealJSON.name);
              const mealWithImage = { ...mealJSON, image: imageURL };

              buffer = buffer.substring(endIndex + closeTag.length);
              controller.enqueue(encoder.encode(JSON.stringify(mealWithImage)));
            }
          }
        }
        controller.close();
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
      status: 201,
    });
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
