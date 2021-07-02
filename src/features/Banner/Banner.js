import styles from './Banner.module.css';
import { images } from '../../_images/images';
import { Link } from "react-router-dom";


export const Banner = () => {

    return (
        <main className={styles.bannerContainer}>
            <img src={images.banner} alt="Sunglasses on dark background"></img>
            <hgroup>
                <h2>Stylish. Elegant. Unique.</h2>
                <h3>Beautiful eco-friendly accesories</h3>
                <h4><button><Link to="/products">See our products</Link></button></h4>
            </hgroup>
        </main>
    );
};