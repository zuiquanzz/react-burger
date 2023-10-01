import React from 'react';
import {Tab, CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css'

function BurgerIngredients() {
    const [current, setCurrent] = React.useState('one');
    const [mains,setMains] = React.useState([]);
    const [buns,setBuns] = React.useState([]);
    const [sauces,setSauces] = React.useState([]);




    const [state, setState] = React.useState({
        isLoading: false,
        hasError: false,
        data: {}
    });

    React.useEffect(() => {
        getIngredients()
        // const {data, isLoading, hasError} = state;
        // console.log("bur", data)
        // console.log(state.data)
        // setMains(burgerData.filter((ingredient) => ingredient.type === 'main'))
        // setBuns(burgerData.filter((ingredient) => ingredient.type === 'bun'));
        // setSauces(burgerData.filter((ingredient) => ingredient.type === 'sauce'));
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

    // const {data, isLoading, hasError} = state;
    // const burs = data.json()
    // const parse = JSON.parse(data);

    // console.log("bur", data)
    // console.log(mains)
    // const success = state.data.success;
    // const burgers = state.data.data;

    // console.log("success", success);
    // console.log("bur",burgers);
    // const mains = burgerData.filter((ingredient) => ingredient.type === 'main');
    // setMains(state.data.filter((ingredient) => ingredient.type === 'main'))
    // setBuns(burgerData.filter((ingredient) => ingredient.type === 'bun'));
    // const sauces = burgerData.filter((ingredient) => ingredient.type === 'sauce');
    // setSauces(burgerData.filter((ingredient) => ingredient.type === 'sauce'));

    return (
        <div>
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
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
            {(current === 'one') &&
            <div>
                <h2>Булки</h2>
                <ul className={styles.container}>
                    {buns.map((bun,id) => <li className={styles.card}>
                        <img src={bun.image} alt={bun.id}></img>
                        <p className="text text_type_digits-default">{bun.price} <CurrencyIcon/> </p>
                        <p> {bun.name}</p>
                    </li>)}
                </ul>
            </div>}
            {(current === 'two') &&
            <div>
                <h2>Соусы</h2>
                <ul className={styles.container}>
                    {sauces.map((sauce,id) => <li>
                        <img src={sauce.image} alt={sauce.id}></img>
                        <p className="text text_type_digits-default">{sauce.price} <CurrencyIcon/> </p>
                        <p> {sauce.name}</p>
                    </li>)}
                </ul>
            </div>}
            {(current === 'three') &&
            <div>
                <h2>Начинки</h2>
                <ul className={styles.container}>
                    {mains.map((main,id) => <li>
                        {/*<Counter count={1}/>*/}
                        <img src={main.image} alt={main.id}></img>
                        <p className="text text_type_digits-default">{main.price} <CurrencyIcon/> </p>
                        <p> {main.name}</p>
                    </li>)}
                </ul>
            </div>}
        </div>
    )
}

export default BurgerIngredients;