import { IRecipesResponse } from "@/types/Recipe";
import RecipeCard from "../RecipeCard/RecipeCard";
import styles from "./FilteredRecipesList.module.css";
import { getFilteredRecipes } from "@/api/recipes";

interface FilteredRecipesListProps {
  type: string;
  value: string;
}

export default async function FilteredRecipesList({
  type,
  value,
}: FilteredRecipesListProps) {
  console.log(type, value);

  const recipes: IRecipesResponse = await getFilteredRecipes({
    type,
    value,
  });

  const meals = recipes.meals;

  if (!recipes || meals.length === 0) {
    return <p className="text-center text-gray-500">No recipes found.</p>;
  }

  return (
    <div className={styles.recipesList}>
      {meals.map((recipe) => (
        <RecipeCard recipe={recipe} key={recipe.idMeal} />
      ))}
    </div>
  );
}
