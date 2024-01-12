import styles from './profile-orders.module.css';
import {FeedOrdersItem} from '../feed-orders-item/feed-orders-item';
import {useDispatch, useSelector} from "../../types/types";
import {useEffect} from 'react';
import {connect, disconnect} from "../../services/websocket/actions";
import {getWsData} from "../../services/selector";
import {Loader} from "../../utils/loader/loader";

let accessToken = '';
const accessTokenKey = localStorage.getItem('accessToken');
if (accessTokenKey) {
    accessToken = accessTokenKey.replace(/^.{7}/, '')
}
export const urlWebSocket = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;

export const ProfileOrders = () => {

    const dispatch = useDispatch();

    const {orders} = useSelector(getWsData);

    useEffect(() => {
        dispatch(connect(urlWebSocket));
        return () => {
            dispatch(disconnect());
        }
    }, [dispatch]);


    if (orders.success === true) {

        return (
            <>
                <div className={`${styles.box} custom-scroll `}>
                    {orders.orders.map((el: any, index: any) =>
                        <FeedOrdersItem el={el} key={index}/>
                    )}
                </div>
            </>
        )
    } else {
        return (
            <>
                <Loader size='large'/>
            </>
        )
    }
}