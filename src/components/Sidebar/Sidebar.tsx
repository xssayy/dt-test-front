"use client";

import { getFilteredRecipes } from "@/api/recipes";
import { IRecipe, IRecipesResponse } from "@/types/Recipe";
import Link from "next/link";
import { useEffect, useState } from "react";

interface SidebarProps {
  categoryName: string;
}

export default function Sidebar({ categoryName }: SidebarProps) {
  const [recipeList, setRecipeList] = useState<IRecipesResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const reqBody = {
      type: "category",
      value: categoryName,
    };
    async function fetchRecipe() {
      try {
        const res = await getFilteredRecipes(reqBody);

        if (!res.meals || res.meals.length === 0) {
          throw new Error("Failed to fetch recipe");
        }

        setRecipeList(res);
      } catch (err) {
        setError("Some error occurred, please try again later!");
        throw err;
      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [categoryName]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!recipeList) {
    return <p>Recipe not found.</p>;
  }

  const meals = recipeList.meals;
  console.log("====================================");
  console.log(meals);
  console.log("====================================");
  return (
    <ul>
      {meals.map((recipe) => {
        return (
          <li key={recipe.idMeal}>
            <Link href={`/?category=${categoryName}`}>{recipe.strMeal}</Link>
          </li>
        );
      })}
    </ul>
  );
}
