import styles from './feed-id.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {Iingredient, TOrderData, useSelector} from '../../types/types';
import {getIngredientsData} from '../../services/selector';
import {Loader} from "../../utils/loader/loader";
import {getAuthOrder} from "../../utils/api";

export const FeedId = () => {
    const [order, setOrder] = useState<TOrderData | null>(null)
    const ingredients: Iingredient[] = useSelector(getIngredientsData);

    const feedId = useParams().feedId;
    const orderId = useParams().orderId;

    const Data = new Date();
    const Day = Data.getDate();

    useEffect(() => {
        getAuthOrder(feedId ? feedId : orderId ? orderId : '')
            .then((res) => {
                setOrder(res.orders[0]);
            });
    });

    if (!order) {
        return (
            <>
                <Loader size='large'/>
            </>
        )
    } else {


        const priceArr: number[] = [];
        for (let i = 0; i < order.ingredients.length; i++) {
            let elems = order.ingredients[i]
            ingredients.map(j => j._id == elems && priceArr.push(j.price))
        }
        const sum = priceArr.reduce((acc, number) => acc + number, 0);
        const dateOrder = order.updatedAt.slice(0, -8);

        const duplicates = order.ingredients.filter((number, index, numbers) => {
            return numbers.indexOf(number) !== index;
        });


        const resObject = order.ingredients.reduce((acc: Record<string, number>, i) => {
            if (acc.hasOwnProperty(i)) {
                acc[i] += 1;
            } else {
                acc[i] = 1;
            }
            return acc;
        }, {})

        const ordersObject: Array<any>[] = Object.entries(resObject);

        for (let i = 0; i < ordersObject.length; i++) {
            let elems = ordersObject[i]
            ingredients.map(j => j._id == elems[0] && elems.push(j.price))
        }
        for (let i = 0; i < ordersObject.length; i++) {
            let elems = ordersObject[i]
            ingredients.map(j => j._id == elems[0] && elems.push(j.image_mobile))
        }
        for (let i = 0; i < ordersObject.length; i++) {
            let elems = ordersObject[i]
            ingredients.map(j => j._id == elems[0] && elems.push(j.name))
        }

        return (
            <>
                <div className={styles.box}>
                    <div className={`${styles.number} text text_type_digits-default pt-8`}>#{order.number}</div>
                    <h3 className='text text_type_main-medium mb-3 mt-10'>{order.name}</h3>
                    <p className='text text_type_main-default text_color_inactive mb-15'>{order.status === 'done' ? 'Выполнен' : 'Готовиться'}</p>
                    <p className='text text_type_main-medium mb-6'>Состав:</p>
                    <div className={`${styles.ingredient} custom-scroll`}>
                        {ordersObject.map((item, index) =>
                            <div className={styles.item} key={index}>
                                <div className={styles.flex}>
                                    <div className={styles.img}>
                                        <img src={item[3]} alt="img"/>
                                    </div>
                                    <p className="text text_type_main-default ml-4">{item[4]}</p>
                                </div>
                                <div className={styles.discription}>
                                    <p className='text text_type_digits-default mr-2'>{item[1]}</p>
                                    <p className="text text_type_digits-default mr-2">x</p>
                                    <p className="text text_type_digits-default mr-2">{item[2] * item[1]}</p>
                                    <CurrencyIcon type="primary"/>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={`${styles.bottom} mt-10 pb-8`}>
                        <p className='text text_type_main-default text_color_inactive'>{Number(dateOrder.slice(8, 10)) == Day ? 'Сегодня' : (Number(dateOrder.slice(8, 10)) - Day) > 1 ? (Number(dateOrder.slice(8, 10)) - Day) + "дня(-ей) назад" : "Вчера"}, {dateOrder.slice(11)}</p>
                        <div className={styles.total}>
                            <p className='text text_type_digits-default mr-2'>{sum}</p>
                            <CurrencyIcon type="primary"/>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}