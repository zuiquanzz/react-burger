import styles from "./feed.module.css";
import { FeedOrders } from '../../components/feed-orders/feed-orders';
import { FeedList } from '../../components/feed-list/feed-list';
import Typography from '@ya.praktikum/react-developer-burger-ui-components'
import Box from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from "../../types/types";
import { useSelector } from "react-redux";
import { store } from "../../services/store";
import {connect, disconnect} from "../../services/websocket/actions";
import { useEffect } from 'react';
import {socketMiddleware} from '../../services/websocket/middleware';
import {getWsData} from "../../services/selector";

export const urlWebSocket = 'wss://norma.nomoreparties.space/orders/all';

export const Feed = () => {
    const dispatch = useDispatch();

    const {status, orders} = useSelector(getWsData);

    useEffect(() => {
        dispatch(connect(urlWebSocket));
        return()=>{
            dispatch(disconnect());
        }
    }, [dispatch]);

    if (orders.success === true) {
        return (
            <>
                <div className={styles.container}>
                    <h1 className="text text_type_main-large mb-5 mt-10">Лента заказов</h1>
                    <div className={styles.box}>
                        <div className={styles.left}>{<FeedOrders/>}</div>
                        <div className={styles.left}>{<FeedList/>}</div>
                    </div>
                </div>
            </>
        )
    } else {
        return ( <p>ЗАгрузка</p>)
    }
}