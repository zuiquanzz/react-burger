import React, {useEffect, useMemo, useRef} from 'react';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import {DELETE_INGREDIENT, SORT_STUFF} from "../../../services/Ingredients/actions";
import styles from "./burger-stuff.module.css"
import {useDrag, useDrop} from "react-dnd";

function BurgerStuff({ingredient, index}) {

    const dispatch = useDispatch()

    function onDelete(uniqId) {
        dispatch({type: DELETE_INGREDIENT, payload: uniqId})
    }

    const dndRef = useRef(null);
    const [{handlerId}, drop] = useDrop({
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

            const hoverClientY = clientOffset.y - hoverBoundingRect.top

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


    // const [, drop] = useDrop({
    //         accept: 'stuff',
    //         // hover: (item, monitor) => {
    //         //     const dragFrom = item;
    //         //     const dragTo = index;
    //         //     dispatch({
    //         //         type: SORT_STUFF,
    //         //         ingredient,
    //         //         index
    //         //     });
    //         // }
    //     }
    // )

    const id = ingredient.uniqId;
    const [{isDragging}, drag] = useDrag({
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

    // const opacity = isDragging ? 0 : 1;

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
                handleClose={() => onDelete(ingredient.uniqId)}
            />
        </div>
    )
}

//todo
BurgerStuff.propTypes = {
    ingredient: PropTypes.object.isRequired,
}

export default BurgerStuff;