import styles from './feed-orders-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useMatch , useLocation } from 'react-router-dom';
import {Iingredient, useSelector} from '../../types/types';
import {getIngredientsData} from "../../services/selector";


export const FeedOrdersItem = ({el}:any): JSX.Element => {

    const ingredient: Iingredient[] = useSelector(getIngredientsData)
    // const ingredient  = useSelector(getIngrediensSelector);
    const imageArr:string[] = [];
    const priceArr:number[] = []

    for (let i = 0; i < el.ingredients.length; i++) {
        let elem = el.ingredients[i]
        // @ts-ignore
        ingredient.map(j => j._id == elem && imageArr.push(j.image_mobile))
    }
    for (let i = 0; i < el.ingredients.length; i++) {
        let elem = el.ingredients[i]
        // @ts-ignore
        ingredient.map((j: { _id: any; price: number; }) => j._id == elem && priceArr.push(j.price))
    }
    const sumOfNumbers = priceArr.reduce((acc, number) => acc + number, 0);
    const dateOrder = el.updatedAt.slice(0, -8);

    const Data = new Date();
    const Day = Data.getDate();

    const location = useLocation();
    const orderNumber = el.number;


    return (
        <>
            <Link to={orderNumber.toString()}
                  state={{ background: location }} className={`${styles.box} p-6 mb-4`}>
                <div className={styles.top}>
                    <p className="text text_type_digits-default">#{el.number}</p>
                    <p className='text text_type_main-default text_color_inactive'>{dateOrder.slice(8,10) == Day ? 'Сегодня' : (dateOrder.slice(8,10) - Day ) > 1  ? (dateOrder.slice(8,10) - Day) + "Дня(-ей) назад" : "Вчера" }, {dateOrder.slice(11)}</p>
                </div>
                <div className='text text_type_main-medium mt-6'>{el.name}</div>
                <div className={`${styles.box_ingredient} mt-6`}>
                    <div className={`${styles.ingredient}`}>
                        {imageArr.map((item, index) => index < 5 &&
                            <div className={styles.img} key={index}>
                                <img src={item} alt="img" />
                            </div>
                        )}
                        {imageArr.length > 5 && <div className={styles.img} key='6'>
                            <img src={imageArr[5]} alt="img" />
                            <div>+{imageArr.length - 4}</div>
                        </div>}

                    </div>
                    <div className={styles.price}>
                        <p className='text text_type_digits-default mr-2'>{sumOfNumbers}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </Link>
        </>
    )
}