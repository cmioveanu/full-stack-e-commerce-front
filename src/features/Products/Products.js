import styles from './Products.module.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { addToCart } from '../Cart/CartSlice';


export const Products = () => {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();


    //get the products list from the database
    useEffect(() => {
        const productsList = async () => {
            const productsList = await fetch('/api/products');
            const jsonproductsList = await productsList.json();

            setProducts(jsonproductsList);
        }

        productsList();
    }, [])


    return (
        <section className={styles.bestsellers}>
            {
                products.map(product => (
                    <div className={styles.product} key={product.id}>
                        <img src={"/_images/" + product.img_thumb_path} alt={product.name} />
                        <h2>{product.name}</h2>
                        <p>£{product.unit_price}</p>
                        <button onClick={() => dispatch(addToCart(product))}>Add to cart</button>
                    </div>
                ))
            }
        </section >
    );
};