import styles from './feed-orders.module.css';
import {FeedOrdersItem} from '../feed-orders-item/feed-orders-item';
import {useSelector} from '../../types/types'
import {getWsData} from "../../services/selectors";

export const FeedOrders = () => {

    const {orders} = useSelector(getWsData);

    return (
        <>
            <div className={`${styles.box} custom-scroll `}>
                {orders?.orders.map((el, index) =>
                    <FeedOrdersItem el={el} key = {index}/>
                )}
            </div>
        </>
    )
}