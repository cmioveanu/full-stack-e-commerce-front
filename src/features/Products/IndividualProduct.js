import styles from './IndividualProduct.module.css';
import { images } from '../../_images/images';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { toggleOpen } from './ProductsSlice';
import { addToCart } from '../Cart/CartSlice';


export const IndividualProduct = (props) => {
    const [details, setDetails] = useState({});
    const dispatch = useDispatch();
    const product = props.product;


    //get details for the product
    useEffect(() => {
        const getProducts = async () => {
            const type = product.type === 'sunglasses' ? 'sunglasses' : 'watches';

            const details = await fetch('api/products/' + type + '/' + product.id);
            const jsonDetails = await details.json();

            setDetails(jsonDetails);
        }

        getProducts();
    }, [product.id, product.type]);


    //disable background scroll when modal is open and add margin
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = '14px';

        //remove styles and toggle back to false
        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.marginRight = 'unset';
            dispatch(toggleOpen());
        }
    }, [dispatch]);


    return (
        <section className={styles.container}>
            <div className={styles.innerContainer}>
                <div>
                    <img src={images[`white${product.id}`]} alt={product.name} />
                </div>
                <div>
                    <button
                        className={styles.goBack}
                        onClick={props.toggle}
                    >{"<< go back"}</button>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>

                    <button onClick={() => dispatch(addToCart(product))}>Add to cart</button>

                    <h3>Specifications:</h3>

                    {
                        //if sunglasses, render the first table, otherwise render the second table
                        product.type === 'sunglasses' ?
                            <table>
                                <tbody>
                                    <tr><td>colour:</td><td>{details.sunglasses_colour}</td></tr>
                                    <tr><td>polarised:</td><td>{details.polarised ? 'yes' : 'no'}</td></tr>
                                    <tr><td>UV protection:</td><td>{details.protection}</td></tr>
                                    <tr><td>anti-glare:</td><td>{details.anti_glare ? 'yes' : 'no'}</td></tr>
                                    <tr><td>anti-reflective:</td><td>{details.anti_reflective ? 'yes' : 'no'}</td></tr>
                                    <tr><td>frame material:</td><td>{details.frame_material}</td></tr>
                                    <tr><td>lens material:</td><td>{details.lens_material}</td></tr>
                                    <tr><td>lens height:</td><td>{details.lens_height}</td></tr>
                                    <tr><td>lens width:</td><td>{details.lens_width}</td></tr>
                                    <tr><td>frame width:</td><td>{details.frame_width}</td></tr>
                                    <tr><td>leg length:</td><td>{details.leg_length}</td></tr>
                                </tbody>
                            </table>
                            :
                            <table>
                                <tbody>
                                    <tr><td>colour:</td><td>{details.watches_colour}</td></tr>
                                    <tr><td>movement:</td><td>{details.movement}</td></tr>
                                    <tr><td>stopwatch:</td><td>{details.stopwatch ? 'yes' : 'no'}</td></tr>
                                    <tr><td>waterproof:</td><td>{details.waterproof}</td></tr>
                                    <tr><td>date:</td><td>{details.date ? 'yes' : 'no'}</td></tr>
                                    <tr><td>dial diameter:</td><td>{details.dial_diameter}</td></tr>
                                    <tr><td>dial material:</td><td>{details.dial_material}</td></tr>
                                    <tr><td>band material:</td><td>{details.band_material}</td></tr>
                                    <tr><td>band width:</td><td>{details.band_width}</td></tr>
                                    <tr><td>band links:</td><td>{details.band_links}</td></tr>
                                    <tr><td>clasp type:</td><td>{details.clasp_type}</td></tr>
                                </tbody>
                            </table>
                    }


                </div>
            </div>
        </section>
    );
}