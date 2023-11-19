import {store} from "./store";

type RootState = ReturnType<typeof store.getState>;

export const getBurgerData = (store: RootState) => {
    // @ts-ignore
    return store.ingredients.burgerData;
};

export const getIngredientsData = (store: RootState) => {
    // @ts-ignore
    return store.ingredients.ingredients;
};