import React, {useEffect, useMemo, useRef} from 'react';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import {DELETE_INGREDIENT, SORT_STUFF} from "../../../services/Ingredients/actions";
import styles from "./burger-stuff.module.css"
import {useDrag, useDrop} from "react-dnd";

function BurgerStuff({ingredient, index}) {

    const currentUniqId = ingredient.uniqId;

    const dispatch = useDispatch()

    function onDelete(uniqId) {
        dispatch({type: DELETE_INGREDIENT, payload: uniqId})
    }

    const dndRef = useRef(null);

    const [, drop] = useDrop({
            accept: 'stuff',
            // hover: (item, monitor) => {
            //     const dragFrom = item;
            //     const dragTo = index;
            //     dispatch({
            //         type: SORT_STUFF,
            //         ingredient,
            //         index
            //     });
            // }
        }
    )


    const [isDragging, drag] = useDrag({
        type: 'stuff',
        item: () => {
            return {currentUniqId, index}
        },
        collect: monitor =>
            monitor.isDragging()
    })

    // const opacity = useMemo(() => {
    //     return isDragging ? 0 : 1
    // }, [isDragging]);

    const opacity = isDragging ? 0 : 1

    // useEffect(() => {
        drag(drop(dndRef))
    // }, [isDragging, drag, drop])

    return (
        <div ref={dndRef} className={styles.card} style={{opacity}} >
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