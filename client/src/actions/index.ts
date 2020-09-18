import type {ActionTypeFetchCategories} from "./creator-fetch-categories";
import {ActionTypeFetchCategoriesFulfilled} from "./creator-fetch-categories-fulfilled";

export type ActionTypes = ActionTypeFetchCategories | ActionTypeFetchCategoriesFulfilled;