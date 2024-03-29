import React, {useEffect} from 'react';
import styles from './order-details.module.css';
import doneIcon from '../../../../images/done.svg'
import {useDispatch, useSelector} from "../../../../types/types";
import {getOrders} from "../../../../services/selectors";
import {CLEAR_STUFF} from "../../../../services/ingredients/actions";


function OrderDetails() {

    const {order, isLoading, error} = useSelector(getOrders)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: CLEAR_STUFF})
    }, [dispatch])

    return (
        <>
            {!isLoading && !error && order !== null &&
                <div className={`${styles.price} mt-30 mb-8 text text_type_digits-large`} data-testid='order-number'>{order.order.number}</div>
            }
            {isLoading && <p className={`${styles.description} text text_type_main-medium`}>Загрузка...</p>}
            <div className={`${styles.description} text text_type_main-medium`}>идентификатор заказа</div>
            <div className={styles.icon}>
                <img className={styles.icon} src={doneIcon} alt={'done'}/>
            </div>
            <p className={`${styles.text} mb-2 text text_type_main-default`}>Ваш заказ начали готовить</p>
            <p className={`${styles.text} mb-30 text text_type_main-default text_color_inactive`}>Дождитесь готовности
                на орбитальной станции</p>
        </>
    )
}

export default OrderDetails;