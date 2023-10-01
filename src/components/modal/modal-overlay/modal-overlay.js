import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from "prop-types";

function ModalOverlay({modalClose}){

    return(
        <div className={styles.pop} onClick={modalClose}>
        </div>
    )
}

ModalOverlay.propTypes = {
    modalClose: PropTypes.func.isRequired
}
export default ModalOverlay;