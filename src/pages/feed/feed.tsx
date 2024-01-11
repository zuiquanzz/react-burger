import styles from "./feed.module.css";
import { FeedOrders } from '../../components/feed-orders/feed-orders';
import { FeedList } from '../../components/feed-list/feed-list';
import Typography from '@ya.praktikum/react-developer-burger-ui-components'
import Box from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { store } from "../../services/store";
import {connect} from "../../services/websocket/actions";
import { useEffect } from 'react';
import {socketMiddleware} from '../../services/websocket/middleware';

export const urlWebSocket = 'wss://norma.nomoreparties.space/orders/all';

export const Feed = () => {
    // const dispatch = useDispatch();

    // @ts-ignore
    // const {status, orders} = useSelector(store => store.wsReducer);

    // useEffect(() => {
    //     dispatch(connect(urlWebSocket));
    // }, []);


    return (
        <>
            <div className={styles.container} >
                <h1 className="text text_type_main-large mb-5 mt-10">Лента заказов</h1>
                <div className={styles.box}>
                    <div className={styles.left}>{<FeedOrders />}</div>
                    <div className={styles.left}>{<FeedList />}</div>
                </div>
            </div>
        </>
    )
}