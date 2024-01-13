import {useEffect, useMemo, useState} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css'
import Ingredient from "./ingredient/ingredient";
import {useSelector} from "../../types/types";
import {useInView} from "react-intersection-observer";
import {Iingredient} from "../../types/types";
import {getIngredientsData} from "../../services/selectors";

function BurgerIngredients() {
    const ingredients: Iingredient[] = useSelector(getIngredientsData)


    const [currentTab, setCurrentTab] = useState('bun');

    const [mains, setMains] = useState<Iingredient[]>([]);
    const [buns, setBuns] = useState<Iingredient[]>([]);
    const [sauces, setSauces] = useState<Iingredient[]>([]);

    const [bunRef, bunInView] = useInView({threshold: 0.1});
    const [sauceRef, sauceNnView] = useInView({threshold: 0.1});
    const [mainRef, mainInView] = useInView({threshold: 0.1});

    useMemo(() => {
        setBuns(ingredients.filter(i => i.type === 'bun'))
        setSauces(ingredients.filter(i => i.type === 'sauce'))
        setMains(ingredients.filter(i => i.type === 'main'))
    }, [ingredients])

    useEffect(() => {
        bunInView ? setCurrentTab('bun') : sauceNnView ? setCurrentTab('sauce') : setCurrentTab('main')
    }, [bunInView, sauceNnView, mainInView])

    const onChangeTab = (tab: string) => {
        setCurrentTab(tab);
        const element = document.getElementById(tab);
        if (element) element.scrollIntoView({behavior: 'smooth'})
    }

    return (
        <div>
            <h1 className="text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <div className={styles.tabs}>
                <Tab value="bun" active={currentTab === 'bun'} onClick={onChangeTab}>
                    Булки
                </Tab>
                <Tab value="sauce" active={currentTab === 'sauce'} onClick={onChangeTab}>
                    Соусы

                </Tab>
                <Tab value="main" active={currentTab === 'main'} onClick={onChangeTab}>
                    Начинки
                </Tab>
            </div>

            <div className={`${styles.table} custom-scroll`}>
                <div>
                    <h2 id='bun' className="text_type_main-medium" ref={bunRef}>Булки</h2>
                    <ul className={styles.container}>
                        {buns.map((bun) => <Ingredient key={bun._id} ingredient={bun}/>)}
                    </ul>
                </div>
                <div>
                    <h2 id='sauce' className="text_type_main-medium" ref={sauceRef}>Соусы</h2>
                    <ul className={styles.container}>
                        {sauces.map((sauce) => <Ingredient key={sauce._id} ingredient={sauce}/>)}
                    </ul>
                </div>
                <div>
                    <h2 id='main' className="text_type_main-medium" ref={mainRef}>Начинки</h2>
                    <ul className={styles.container}>
                        {mains.map((main) => <Ingredient key={main._id} ingredient={main}/>)}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default BurgerIngredients;