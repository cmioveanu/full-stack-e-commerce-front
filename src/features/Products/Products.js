import styles from './Products.module.css';
import { images } from '../../_images/images';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';


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
        <section className={styles.productsContainer}>
            <h2>Our Products:</h2>
            <div className={styles.products}>
                {
                    products.map(product => (
                        <div className={styles.individualProduct} key={product.id}>
                            <div>
                                <img
                                    src={images[`img${product.id}`]}
                                    alt={product.name}
                                />
                                <h3>{product.name}</h3>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section >
    );
};