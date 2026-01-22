import { PEXELS_API_KEY } from "@/config/env";

export async function fetchMealImage(mealName: string) {
  const response = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(mealName)}`,
    {
      headers: { Authorization: PEXELS_API_KEY! },
      cache: "no-store",
    }
  );

  if (!response.ok) return null;

  const data = await response.json();

  if (!data.photos?.length) return null;

  // TODO: The repsonse object returns an array of images. Consider randomizing image selection to prevent duplicates be selected
  return data.photos[0].src.large;
}
