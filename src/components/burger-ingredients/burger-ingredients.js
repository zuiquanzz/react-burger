import React from 'react';
import {Tab,CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {burgerData} from '../../utils/data.js'
function BurgerIngredients() {
    const [current, setCurrent] = React.useState('one');

    const [state, setState] = React.useState({
        isLoading: false,
        hasError: false,
        data: []
    });

    React.useEffect(() => {
        getIngredients()
    }, [])

    const getIngredients = () => {
        setState({...state, hasError: false, isLoading: true});
        fetch('https://norma.nomoreparties.space/api/ingredients')
            .then(res => res.json())
            .then(data => setState({...state, data, isLoading: false}))
            .catch(e => {
                setState({...state, hasError: true, isLoading: false});
            });
    };

    const {data, isLoading, hasError} = state;

    const mains = burgerData.filter((ingredient) => ingredient.type === 'main');
    const buns = burgerData.filter((ingredient) => ingredient.type === 'bun');
    const sauces = burgerData.filter((ingredient) => ingredient.type === 'sauce');

    return (
        <div>
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
                <ol>
                    {buns.map((bun,id) => <li>
                        <img src={bun.image} alt={bun.id}></img>
                        <p className="text text_type_digits-default">{bun.price} <CurrencyIcon/> </p>
                        <p> {bun.name}</p>
                    </li>)}
                </ol>
                {/*<card>*/}
                {/*    */}
                {/*</card>*/}
                {/*<div>*/}
                {/*    {isLoading && 'Загрузка...'}*/}
                {/*    {hasError && 'Произошла ошибка'}*/}
                {/*    {!isLoading &&*/}
                {/*    !hasError &&*/}
                {/*    data.length &&*/}
                {/*    data.map((bun, index) => <card>*/}
                {/*        <p> {bun.name}</p>*/}
                {/*        <img src={bun.image} alt={bun.id}></img>*/}
                {/*    </card>)}*/}
                {/*</div>*/}
            </div>}
            {(current === 'two') &&
            <div>
                <h2>Соусы</h2>
                <ol>
                    {sauces.map((sauce,id) => <li>
                        <img src={sauce.image} alt={sauce.id}></img>
                        <p className="text text_type_digits-default">{sauce.price} <CurrencyIcon/> </p>
                        <p> {sauce.name}</p>
                    </li>)}
                </ol>
            </div>}
            {(current === 'three') &&
            <div>
                <h2>Начинки</h2>
                <ol id="table">
                    {mains.map((main,id) => <li>
                        <img src={main.image} alt={main.id}></img>
                        <p className="text text_type_digits-default">{main.price} <CurrencyIcon/> </p>
                        <p> {main.name}</p>
                    </li>)}
                </ol>
            </div>}
        </div>
    )
}

export default BurgerIngredients;