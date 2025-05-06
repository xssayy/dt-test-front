import { IRecipe } from "@/types/Recipe";
import Image from "next/image";
import styles from "./RecipeCard.module.css";
import Link from "next/link";

interface RecipeCardProps {
  recipe: IRecipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`recipe/${recipe.idMeal}`} className={styles.recipeCard}>
      <div>
        <Image
          alt="Meal Image"
          src={recipe.strMealThumb}
          width={100}
          height={100}
          className={styles.recipeImage}
        />
      </div>
      <ul className={styles.infoList}>
        <li>
          <p>Name: {recipe.strMeal}</p>
        </li>
      </ul>
    </Link>
  );
}
