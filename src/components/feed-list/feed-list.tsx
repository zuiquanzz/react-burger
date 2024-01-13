import styles from './feed-list.module.css';
import {useSelector} from '../../types/types';
import {getWsData} from "../../services/selector";


export const FeedList = () => {
    const {orders} = useSelector(getWsData);
    const doneOrder = orders?.orders.filter((elem: { status: string; }) => {
        return elem.status == 'done'
    })
    const pendingOrder = orders?.orders.filter((elem: { status: string; }) => {
        return elem.status == 'pending'
    })

    return (
        <>
            <div className={styles.box}>
                <div className={styles.ready_noready}>
                    <h3 className='text text_type_main-medium'>Готовы:</h3>
                    <div className={styles.ready}>
                        {doneOrder?.map((el, index) =>
                            <p key={index} className={`${styles.doneNumber} text text_type_digits-default mb-2 mr-2`}>{el.number}</p>
                        )}
                    </div>

                    <h3 className='text text_type_main-medium'>В работе:</h3>
                    <div className={styles.ready}>
                        {pendingOrder?.map((el, index) =>
                            <p key={index} className='text text_type_digits-default mb-2 mr-2'>{el.number}</p>
                        )}
                    </div>
                </div>
                <div className={styles.readyall}>
                    <h3 className='text text_type_main-medium mt-6'> Выполнено за все время: </h3>
                    <p className='text text_type_digits-medium'>{orders?.total}</p>
                </div>
                <div className={styles.readyall}>
                    <h3 className='text text_type_main-medium mt-6'>Выполнено за сегодня: </h3>
                    <p className='text text_type_digits-medium'>{orders?.totalToday}</p>
                </div>
            </div>
        </>
    )
}