import React, {useEffect, useMemo, useRef} from 'react';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch} from "react-redux";
import {DELETE_INGREDIENT, SORT_STUFF} from "../../../services/ingredients/actions";
import styles from "./burger-stuff.module.css"
import {useDrag, useDrop} from "react-dnd";
import {IingredientKey} from "../../../types/types";
import {Identifier} from 'dnd-core';

interface IBurgerStuff {
    ingredient: IingredientKey;
    index: number;
}

const BurgerStuff = ({ingredient, index}: IBurgerStuff) => {

    const dispatch = useDispatch()
    const id = ingredient.uniqId;


    function onDelete() {
        dispatch({type: DELETE_INGREDIENT, payload: id})
    }

    type TDragObject = {
        id: string;
        index: number;
    }
    type TDragCollectedProps = {
        isDragging: boolean;
    }

    type TDropCollectedProps = {
        handlerId: Identifier | null;
    }

    const dndRef = useRef<HTMLDivElement | null>(null);

    const [{handlerId}, drop] = useDrop<TDragObject, unknown, TDropCollectedProps>({
        accept: 'stuff',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!dndRef.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            if (dragIndex === hoverIndex) {
                return
            }

            const hoverBoundingRect = dndRef.current?.getBoundingClientRect()

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            const clientOffset = monitor.getClientOffset()

            const hoverClientY = clientOffset!.y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            dispatch({
                type: SORT_STUFF,
                dragIndex,
                hoverIndex
            });
            item.index = hoverIndex
        },
    })

    const [{isDragging}, drag] = useDrag<TDragObject, unknown, TDragCollectedProps>({
        type: 'stuff',
        item: () => {
            return {id, index}
        },
        collect: (monitor) => (
            {isDragging: monitor.isDragging()}
        )

    })

    const opacity = useMemo(() => {
        return isDragging ? 0 : 1
    }, [isDragging]);

    useEffect(() => {
        drag(drop(dndRef));
    }, [isDragging, drag, drop])

    return (
        <div className={styles.card} key={ingredient.uniqId} style={{opacity}} ref={dndRef} data-handler-id={handlerId}>
            <DragIcon type="primary"/>
            <ConstructorElement
                text={ingredient.name}
                thumbnail={ingredient.image}
                price={ingredient.price}
                isLocked={false}
                handleClose={onDelete}
            />
        </div>
    )
}

export default BurgerStuff;