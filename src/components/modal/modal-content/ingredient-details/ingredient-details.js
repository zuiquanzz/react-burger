import React from 'react';
import styles from './ingredient-details.module.css';

function IngredientDetails({ingredient}) {

    return (
        <>
            <div className={`${styles.modalHeader} mt-10`}>
                <h5 className={'text text_type_main-large'}>Детали ингредиента</h5>
            </div>
            <div className={styles.img}>
                <img src={ingredient.image} alt={ingredient.name}/>
            </div>
            <div className={`${styles.modalName} text text_type_main-medium mt-4 mb-8`}>{ingredient.name}</div>
            <div className={`${styles.description} mb-15`}>
                <div>
                    <p className={'text text_type_main-default'}>Калории,ккал</p>
                    <span className={'text_type_digits-default'}>{ingredient.calories}</span>
                </div>
                <div>
                    <p className={'text text_type_main-default'}>Белки, г</p>
                    <span className={'text_type_digits-default'}>{ingredient.proteins}</span>
                </div>
                <div>
                    <p className={'text text_type_main-default'}>Жиры, г</p>
                    <span className={'text_type_digits-default'}>{ingredient.fat}</span>
                </div>
                <div>
                    <p className={'text text_type_main-default'}>Углеводы, г</p>
                    <span className={'text_type_digits-default'}>{ingredient.carbohydrates}</span>
                </div>
            </div>
        </>
    )
}

export default IngredientDetails;