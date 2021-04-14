import styles from './Products.module.css';
import { images } from '../../_images/images';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { IndividualProduct } from './IndividualProduct';


export const Products = () => {
    const [products, setProducts] = useState([]);
    const [showIndividual, setShowIndividual] = useState(false);
    const [individualProduct, setIndividualProduct] = useState(null);
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


    //toggle individual product modal and pass it the clicked product
    const toggleIndividual = (currentProduct) => {
        showIndividual ? setShowIndividual(false) : setShowIndividual(true);
        if (currentProduct) {
            setIndividualProduct(currentProduct);
        }
    }


    return (
        <section className={styles.productsContainer}>
            <h2>Our Products:</h2>
            <div data-testid="product" className={styles.products}>
                {
                    products.map(product => (
                        <div className={styles.individualProduct} key={product.id} onClick={() => toggleIndividual(product)}>
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

            {
                showIndividual ? <IndividualProduct product={individualProduct} toggle={toggleIndividual}/> : null
            }

        </section >
    );
};