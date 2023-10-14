import React from 'react';
import styles from './order-details.module.css';
import doneIcon from '../../../../images/done.svg'
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {GET_ORDER_FAILURE, GET_ORDER_REQUEST, GET_ORDER_SUCCESS} from "../../../../services/Orders/actions";

function OrderDetails() {

    const {burgerData} = useSelector(state => state.ingredients);

    const {order, isLoading, error} = useSelector(state => state.orders)

    const dispatch = useDispatch();

    React.useEffect(() => {
        getOrder()
        console.log(order)
    }, [dispatch])

    const getOrder = () => {
        // setState({...state, hasError: false, isLoading: true});
        // console.log(burgerData)
        dispatch({type: GET_ORDER_REQUEST})
        fetch('https://norma.nomoreparties.space/api/orders', {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify({
                "ingredients": burgerData
            })
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`))
            .then(data => {
                    // setState({...state, data: data, isLoading: false})
                    // setOrder(data.order.number);
                    // console.log("state", state)
                    // setIngredients(data.data)
                    // console.log("data app", data.order.number)
                    dispatch({type: GET_ORDER_SUCCESS, payload: data});
                }
            )
            .catch(e => {
                // setState({...state, hasError: true, isLoading: false});
                dispatch({type: GET_ORDER_FAILURE})
                console.error(e)
            });
    };

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