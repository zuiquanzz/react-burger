import styles from './feed-orders.module.css';
import { FeedOrdersItem } from '../feed-orders-item/feed-orders-item';
import { useSelector } from '../../types/types'
import { Key } from 'react';
import {getWsData} from "../../services/selector";

export const FeedOrders = () => {

    // @ts-ignore
    const {orders} = useSelector(getWsData);
    console.log(orders)

    return (
        <>
            <div className={`${styles.box} custom-scroll `}>
                {orders?.orders.map((el: any, index: Key | null | undefined) =>
                    <FeedOrdersItem el={el} key = {index}/>
                )}
            </div>
        </>
    )
}