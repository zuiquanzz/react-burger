import React from 'react';
import styles from './order-details.module.css';
import doneIcon from '../../../../images/done.svg'


//todo style
function OrderDetails({orderPrice}) {

    return (
        <>
            <div>{orderPrice}</div>
            <div>идентификатор заказа</div>
            <div>
                <img src={doneIcon} alt={'done'}/>
            </div>
            <p className="mb-2 text text_type_main-default">Ваш заказ начали готовить</p>
            <p className="mb-30 text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </>
    )
}

export default OrderDetails;