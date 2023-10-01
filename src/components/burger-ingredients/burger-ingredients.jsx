import React from 'react';
import {CurrencyIcon, Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css'
import Ingredient from "../ingredient/ingredient";

function BurgerIngredients() {
    const [current, setCurrent] = React.useState('one');
    const [mains, setMains] = React.useState([]);
    const [buns, setBuns] = React.useState([]);
    const [sauces, setSauces] = React.useState([]);

    const [state, setState] = React.useState({
        isLoading: false,
        hasError: false,
        data: {}
    });

    React.useEffect(() => {
        getIngredients()
    }, [])
    //todo try-catch && move to app
    const getIngredients = () => {
        setState({...state, hasError: false, isLoading: true});
        fetch('https://norma.nomoreparties.space/api/ingredients')
            .then(res => res.json())
            .then(data => {
                    setState({...state, data, isLoading: false})
                    setMains(data.data.filter((i) => i.type === 'main'))
                    setBuns(data.data.filter((i) => i.type === 'bun'))
                    setSauces(data.data.filter((i) => i.type === 'sauce'))
                }
            )
            .catch(e => {
                setState({...state, hasError: true, isLoading: false});
            });
    };

    return (
        <div>
            <h1 className="text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <div style={{display: 'flex'}}>
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
                        {buns.map((bun, id) =>  <Ingredient key={id} ingredient={bun}/>)}
                    </ul>
                </div>
                <div>
                    <h1 className="text_type_main-medium">Соусы</h1>
                    <ul className={styles.container}>
                        {sauces.map((sauce, id) => <Ingredient key={id} ingredient={sauce}/>)}
                    </ul>
                </div>
                <div>
                    <h2 className="text_type_main-medium">Начинки</h2>
                    <ul className={styles.container}>
                        {mains.map((main, id) => <Ingredient key={id} ingredient={main}/>)}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default BurgerIngredients;