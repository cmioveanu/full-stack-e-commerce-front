import styles from './Products.module.css';
import { images } from '../../_images/images';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { IndividualProduct } from './IndividualProduct';
import { toggleOpen } from './ProductsSlice';

export const Products = () => {
    const [products, setProducts] = useState([]);
    const [showIndividual, setShowIndividual] = useState(false);
    const [individualProduct, setIndividualProduct] = useState(null);
    const dispatch = useDispatch();


    //get the products list from the database
    useEffect(() => {
        const productsList = async () => {
            try {
                const productsList = await fetch('api/products');
                const jsonproductsList = await productsList.json();
                setProducts(jsonproductsList);
            }
            catch (err) {
                console.error('Unable to get products list', err);
            }
        }

        productsList();
    }, [])


    //toggle individual product modal and pass it the clicked product
    const toggleIndividual = (currentProduct) => {
        showIndividual ? setShowIndividual(false) : setShowIndividual(true);
        if (currentProduct) {
            setIndividualProduct(currentProduct);
        }

        dispatch(toggleOpen());
    }


    return (
        <main className={styles.productsContainer}>
            <h2>Our Products:</h2>
            <div data-testid="product" className={styles.products}>
                {
                    products.map(product => (
                        <div className={styles.individualProduct} key={product.id}>
                            <div onClick={() => toggleIndividual(product)}>
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
                showIndividual ? <IndividualProduct product={individualProduct} toggle={toggleIndividual} /> : null
            }

        </main >
    );
};