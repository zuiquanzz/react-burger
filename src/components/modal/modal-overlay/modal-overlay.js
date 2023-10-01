import React from 'react';
import styles from './modal-overlay.module.css';

function ModalOverlay({modalClose}){

    return(
        <div className={styles.pop} onClick={modalClose}>
            {/*<div className={styles.modal}>*/}
            {/**/}
            {/*</div>*/}
        </div>
    )
}

export default ModalOverlay;