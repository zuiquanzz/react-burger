import React, {FC, ReactNode, useEffect} from 'react';
import {createPortal} from 'react-dom';
import ModalOverlay from './modal-overlay/modal-overlay';
import styles from './modal.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById("modal-root") as HTMLDivElement;

interface IModalProps {
    children: ReactNode;
    modalClose: () => void;
}

const Modal: FC<IModalProps> = ({children, modalClose}) => {
    useEffect(() => {
        function escapeClose(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                modalClose();
            }
        }

        document.addEventListener('keydown', escapeClose);
        return () => {
            document.removeEventListener('keydown', escapeClose);
        }

    }, [])

    return createPortal((
        <>
            <ModalOverlay modalClose={modalClose}/>
            <div className={styles.modal}>
                <div className={styles.close} onClick={modalClose}>
                    <CloseIcon type="primary"/>
                </div>
                {children}
            </div>
        </>

    ), modalRoot)
}

export default Modal;