import {useDispatch, useSelector} from "react-redux";
import {getAllIngredients} from "../../services/selectors";
import {useEffect} from "react";
import {getIngredients} from "../../services/ingredients/actions";
import mainPageStyles from "./main-page.module.css"
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";

export const MainPage = () => {
    const dispatch = useDispatch();

    const {
        ingredients,
        isLoading,
        error,
    } = useSelector(getAllIngredients)

    useEffect(() => {
        dispatch(getIngredients())
    }, [dispatch])

    return (
        <>
            <DndProvider backend={HTML5Backend}>
                {!isLoading && !error && ingredients.length &&
                    <main className={mainPageStyles.main}>
                        <div className={'mr-10'}>
                            <BurgerIngredients/>
                        </div>
                        <BurgerConstructor/>
                    </main>
                }
                {isLoading &&
                    <>
                        <p>Загрузка..</p>
                    </>}
            </DndProvider>
        </>
    );
}