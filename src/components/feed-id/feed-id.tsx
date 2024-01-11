import styles from './feed-id.module.css';
import bun from '../../images/logo.svg';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { getIngredientsData } from '../../services/selector';
import {getWsData} from "../../services/selector";


export const FeedId = () => {

    const {feedId} = useParams();
    const {orders} = useSelector(getWsData);
    const elem = orders.orders.find((el: { _id: string | undefined; }) => el._id === feedId);

    const { ingredient } = useSelector(getIngredientsData);
    const priceArr: any[] = [];
    for (let i = 0; i < elem.ingredients.length; i++) {
        let elems = elem.ingredients[i]
        ingredient.map((j: { _id: any; price: any; }) => j._id == elems && priceArr.push(j.price))
    }
    const sumOfNumbers = priceArr.reduce((acc, number) => acc + number, 0);
    const dateOrder = elem.updatedAt.slice(0, -8);

    const Data = new Date();
    const Day = Data.getDate();

    return (
        <>
            <div className={styles.box}>
                <div className={`${styles.number} text text_type_digits-default pt-8`}>#{elem.number}</div>
                <h3 className='text text_type_main-medium mb-3 mt-10'>{elem.name}</h3>
                <p className='text text_type_main-default text_color_inactive mb-15'>{elem.status == 'done'? 'Выполнен': 'Готовться'}</p>
                <p className='text text_type_main-medium mb-6'>Состав:</p>
                <div className={`${styles.ingredient} custom-scroll`}>
                    <div className={styles.item}>
                        <div className={styles.flex}>
                            <div className={styles.img}>
                                <img src={bun} alt="img" />
                            </div>
                            <p className="text text_type_main-default ml-4">Филе Люминесцентного тетраодонтимформа</p>
                        </div>
                        <div className={styles.discription}>
                            <p className='text text_type_digits-default mr-2'>1</p>
                            <p className="text text_type_digits-default mr-2">x</p>
                            <p className="text text_type_digits-default mr-2">400</p>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.flex}>
                            <div className={styles.img}>
                                <img src={bun} alt="img" />
                            </div>
                            <p className="text text_type_main-default ml-4">Филе Люминесцентного тетраодонтимформа</p>
                        </div>
                        <div className={styles.discription}>
                            <p className='text text_type_digits-default mr-2'>1</p>
                            <p className="text text_type_digits-default mr-2">x</p>
                            <p className="text text_type_digits-default mr-2">400</p>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.flex}>
                            <div className={styles.img}>
                                <img src={bun} alt="img" />
                            </div>
                            <p className="text text_type_main-default ml-4">Филе Люминесцентного тетраодонтимформа</p>
                        </div>
                        <div className={styles.discription}>
                            <p className='text text_type_digits-default mr-2'>1</p>
                            <p className="text text_type_digits-default mr-2">x</p>
                            <p className="text text_type_digits-default mr-2">400</p>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.flex}>
                            <div className={styles.img}>
                                <img src={bun} alt="img" />
                            </div>
                            <p className="text text_type_main-default ml-4">Филе Люминесцентного тетраодонтимформа</p>
                        </div>
                        <div className={styles.discription}>
                            <p className='text text_type_digits-default mr-2'>1</p>
                            <p className="text text_type_digits-default mr-2">x</p>
                            <p className="text text_type_digits-default mr-2">400</p>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </div>
                <div className={`${styles.bottom} mt-10 pb-8`}>
                    <p className='text text_type_main-default text_color_inactive'>{dateOrder.slice(8,10) == Day ? 'Сегодня' : (dateOrder.slice(8,10) - Day ) > 1  ? (dateOrder.slice(8,10) - Day) + "дня(-ей) назад" : "Вчера" }, {dateOrder.slice(11)}</p>
                    <div className={styles.total}>
                        <p className='text text_type_digits-default mr-2'>{sumOfNumbers}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        </>
    )
}