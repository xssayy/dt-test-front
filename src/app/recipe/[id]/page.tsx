"use client";

import { getRecipeById } from "@/api/recipes";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./recipeInfoPage.module.css";
import { IRecipe } from "@/types/Recipe";
import Link from "next/link";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function RecipeDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [recipe, setRecipe] = useState<IRecipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const res = await getRecipeById(id);
        if (!res.meals || res.meals.length === 0) {
          throw new Error("Failed to fetch recipe");
        }
        setRecipe(res.meals[0]);
      } catch (err) {
        setError("Some error occurred, please try again later!");
        throw err;
      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!recipe) {
    return <p>Recipe not found.</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.recipeContainer}>
        <div>
          <Image
            alt="Meal Image"
            src={recipe.strMealThumb}
            width={300}
            height={300}
            className={styles.recipeImage}
          />
        </div>
        <ul className={styles.infoList}>
          <li>
            <p>{recipe.strMeal}</p>
          </li>
          <li>
            <Link href={`/?country=${recipe.strArea}`}>
              <p>Country: {recipe.strArea}</p>
            </Link>
          </li>
          <li>
            <p>Instructions: {recipe.strInstructions}</p>
          </li>
        </ul>
        <ul className={styles.ingridientsList}>
          {Array.from({ length: 20 }, (_, i) => {
            const ingredient =
              recipe[`strIngredient${i + 1}` as keyof typeof recipe];
            const measure = recipe[`strMeasure${i + 1}` as keyof typeof recipe];

            if (ingredient && ingredient.trim()) {
              return (
                <li key={i}>
                  <Link href={`/?ingredient=${ingredient}`}>
                    {ingredient} : {measure}
                  </Link>
                </li>
              );
            }

            return null;
          })}
        </ul>
      </div>
      <Sidebar categoryName={recipe.strCategory} />
    </div>
  );
}
