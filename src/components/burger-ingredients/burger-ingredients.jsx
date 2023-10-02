import React from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css'
import Ingredient from "../ingredient/ingredient";
import PropTypes from "prop-types";

function BurgerIngredients({ingredients}) {
    const [current, setCurrent] = React.useState('one');
    const [mains, setMains] = React.useState([]);
    const [buns, setBuns] = React.useState([]);
    const [sauces, setSauces] = React.useState([]);

    React.useEffect(() => {
        setMains(ingredients.filter((i) => i.type === 'main'))
        setBuns(ingredients.filter((i) => i.type === 'bun'))
        setSauces(ingredients.filter((i) => i.type === 'sauce'))
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
            <div className={`${styles.table} custom-scroll`}>
                <div>
                    <h2 className="text_type_main-medium">Булки</h2>
                    <ul className={styles.container}>
                        {buns.map((bun) => <Ingredient key={bun._id} ingredient={bun}/>)}
                    </ul>
                </div>
                <div>
                    <h1 className="text_type_main-medium">Соусы</h1>
                    <ul className={styles.container}>
                        {sauces.map((sauce) => <Ingredient key={sauce._id} ingredient={sauce}/>)}
                    </ul>
                </div>
                <div>
                    <h2 className="text_type_main-medium">Начинки</h2>
                    <ul className={styles.container}>
                        {mains.map((main) => <Ingredient key={main._id} ingredient={main}/>)}
                    </ul>
                </div>
            </div>
        </div>
    )
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.array.isRequired
}
export default BurgerIngredients;