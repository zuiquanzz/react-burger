import {useState,useEffect} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css'
import Ingredient from "./ingredient/ingredient";
import {useModal} from "../../hooks/use-modal";
import Modal from "../modal/modal";
import IngredientDetails from "../modal/modal-content/ingredient-details/ingredient-details";
import {useDispatch, useSelector} from "react-redux";
import {ADD_INGREDIENT} from "../../services/Ingredients/actions";
import {nanoid} from "@reduxjs/toolkit";
import {getAllIngredients} from "../../services/selectors";

function BurgerIngredients() {

    const {ingredients} = useSelector(getAllIngredients)

    const dispatch = useDispatch();

    const [current, setCurrent] = useState('one');
    const [mains, setMains] = useState([]);
    const [buns, setBuns] = useState([]);
    const [sauces, setSauces] = useState([]);
    // const [counters, setCounters] = useState([])

    const [ingredient, setIngredient] = useState({});

    const {isModalOpen, openModal, closeModal} = useModal();

    function handleModalOpen(ingredient) {
        setIngredient(ingredient);
        dispatch({type: ADD_INGREDIENT, payload: {...ingredient, uniqId: nanoid()}})
        openModal();
    }

    const modalIngredient =
        <Modal modalClose={closeModal}>
            <IngredientDetails ingredient={ingredient}/>
        </Modal>;


    useEffect(() => {
        setMains(ingredients.filter((i) => i.type === 'main'))
        setBuns(ingredients.filter((i) => i.type === 'bun'))
        setSauces(ingredients.filter((i) => i.type === 'sauce'))
        //todo remove counter from ingredient to this
        // setCounters(ingredients.map(ingredient => ({id: ingredient._id, counter: 0})))
    }, [ingredients])

    return (
        <div>
            <h1 className="text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <div className={styles.tabs}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>

            {/*//todo IngredientsList*/}
            <div className={`${styles.table} custom-scroll`}>
                <div>
                    <h2 className="text_type_main-medium">Булки</h2>
                    <ul className={styles.container}>
                        {buns.map((bun) => <Ingredient key={bun._id} ingredient={bun}
                                                       getIngredientData={handleModalOpen}/>)}
                    </ul>
                </div>
                <div>
                    <h1 className="text_type_main-medium">Соусы</h1>
                    <ul className={styles.container}>
                        {sauces.map((sauce) => <Ingredient key={sauce._id} ingredient={sauce}
                                                           getIngredientData={handleModalOpen}/>)}
                    </ul>
                </div>
                <div>
                    <h2 className="text_type_main-medium">Начинки</h2>
                    <ul className={styles.container}>
                        {mains.map((main) => <Ingredient key={main._id} ingredient={main}
                                                         getIngredientData={handleModalOpen}/>)}
                    </ul>
                </div>
            </div>
            {isModalOpen && modalIngredient}
        </div>
    )
}

// BurgerIngredients.propTypes = {
//     ingredients: PropTypes.array.isRequired
// }
export default BurgerIngredients;