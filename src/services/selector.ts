import {store} from "./store";
import {IingredientKey} from "../../types/types";

type RootState = ReturnType<typeof store.getState>;

export const getBurgerData = (store:RootState) => {
    // @ts-ignore
    return store.ingredients.burgerData<IingredientKey>;
};