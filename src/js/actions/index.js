import { ADD_ARTICLE } from "../constants/action-types";
import { CURR_CATEGORIES } from "../constants/action-types";

export const addArticle = article => ({ type: ADD_ARTICLE, payload: article });
export const currCategories = categories => ({ type: CURR_CATEGORIES, payload: categories });
