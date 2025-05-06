import FilteredRecipesList from "@/components/FilteredRecipesList/FilteredRecipesList";
import RecipesList from "@/components/RecepiesList/RecipesList";

interface Props {
  searchParams: {
    category?: string;
    country?: string;
    ingredient?: string;
  };
}

export default function HomePage({ searchParams }: Props) {
  const entries = Object.entries(searchParams).filter(([_, value]) => !!value);
  const type = entries.length > 0 ? entries[0][0] : null;
  const value = entries.length > 0 ? entries[0][1] : null;

  return (
    <div>
      <h1>
        {type && value ? `Recipe List for ${type}: ${value}` : "Recipe List"}
      </h1>

      {type && value ? (
        <FilteredRecipesList type={type} value={value} />
      ) : (
        <RecipesList />
      )}
    </div>
  );
}
