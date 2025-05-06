import { IFilteredMealResponse, IRecipesResponse } from "@/types/Recipe";
import axios from "axios";
axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_URL}`;

export const getAllRecipes = async () => {
  const response = await axios.get(`/api/recipes`);
  return response.data.data;
};

export const getRecipeById = async (id: string) => {
  const response = await axios.get(`/api/recipes/${id}`);
  return response.data.data;
};

interface FilterParams {
  type: string;
  value: string;
}

export const getFilteredRecipes = async ({ type, value }: FilterParams) => {
  const response = await axios.get(`/api/recipes/filter`, {
    params: {
      [type]: value,
    },
  });
  return response.data.data;
};
