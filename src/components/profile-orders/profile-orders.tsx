import styles from './profile-orders.module.css';
import { FeedOrdersitem } from '../feed-orders-item/feed-ordersitem';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { connect, disconnect } from "../../services/websocket/actions";
import {getIngredientsData, getWsData} from "../../services/selector";

let accessToken = '';
const accessTokenKey = localStorage.getItem('accessToken');
if (accessTokenKey) {
    accessToken = accessTokenKey.replace(/^.{7}/, '')
}
//todo const
export const urlWebSocket = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;

export const ProfileOrders = () => {

    const dispatch = useDispatch();

    const { orders } = useSelector(getWsData);
    const { ingredient } = useSelector(getIngredientsData)

    useEffect(() => {
        dispatch(connect(urlWebSocket));
        return () => {
            dispatch(disconnect());
        }
    }, [dispatch]);

    // @ts-ignore
    if (ingredient !== [] && orders.success === true) {

        return (
            <>
                <div className={`${styles.box} custom-scroll `}>
                    {orders.orders.map((el: any, index: any) =>
                        <FeedOrdersitem el={el} key={index} />
                    )}
                </div>
            </>
        )
    } else {
        return (
            <>
                <p>Загрузка...</p>
            </>
        )
    }
}