import React, {FC} from 'react';
import styles from './modal-overlay.module.css';

interface IModalOverlayProps {
    modalClose: () => void;
}

const ModalOverlay: FC<IModalOverlayProps> = ({modalClose}) => {

    return (
        <div className={styles.pop} onClick={modalClose}>
        </div>
    )
}

export default ModalOverlay;