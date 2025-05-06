import { IRecipesResponse } from "@/types/Recipe";
import RecipeCard from "../RecipeCard/RecipeCard";
import styles from "./RecipesList.module.css";
import { getAllRecipes } from "@/api/recipes";

export default async function RecipesList() {
  const recipes: IRecipesResponse = await getAllRecipes();
  const meals = recipes.meals;

  if (!recipes || meals.length === 0) {
    return <p className="text-center text-gray-500">No recipes found.</p>;
  }
  return (
    <div className={styles.recipesList}>
      {meals.map((recipe) => {
        return <RecipeCard recipe={recipe} key={recipe.idMeal} />;
      })}
    </div>
  );
}
