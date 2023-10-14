import React from 'react';
import styles from './order-details.module.css';
import doneIcon from '../../../../images/done.svg'
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {GET_ORDER_FAILURE, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, getOrder} from "../../../../services/Orders/actions";
import {orderApi} from "../../../../utils/api";
import {getAllIngredients, getOrders} from "../../../../services/selectors";

function OrderDetails() {

    const {burgerData} = useSelector(getAllIngredients);

    const {order, isLoading, error} = useSelector(getOrders)

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getOrder(burgerData))
        // console.log(order)
    }, [dispatch])

    // const getOrder = () => {
    //     // setState({...state, hasError: false, isLoading: true});
    //     // console.log(burgerData)
    // };

    return (
        <>
            {!isLoading && !error && order &&
            <div className={`${styles.price} mt-30 mb-8 text text_type_digits-large`}>{order.order.number}</div>
            }
            <div className={`${styles.description} text text_type_main-medium`}>идентификатор заказа</div>
            <div className={styles.icon}>
                <img className={styles.icon} src={doneIcon} alt={'done'}/>
            </div>
            {/*<p className={`${styles.text} mb-2 text text_type_main-default`}>{order.name}</p>*/}
            <p className={`${styles.text} mb-2 text text_type_main-default`}>Ваш начали готовить</p>
            <p className={`${styles.text} mb-30 text text_type_main-default text_color_inactive`}>Дождитесь готовности
                на орбитальной станции</p>
        </>
    )
}

export default OrderDetails;