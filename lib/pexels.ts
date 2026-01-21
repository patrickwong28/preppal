import { PEXELS_API_KEY } from "@/config/env";

export async function fetchMealImage(mealName: string) {
  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${mealName}`,
    {
      headers: { Authorization: PEXELS_API_KEY! },
      cache: "no-store",
    },
  );

  if (!res.ok) return null;

  const data = await res.json();

  if (!data.photos?.length) return null;

  return data.photos[0].src.medium;
}
