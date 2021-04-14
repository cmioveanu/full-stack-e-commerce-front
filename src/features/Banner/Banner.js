import styles from './Banner.module.css';
import { images } from '../../_images/images';


export const Banner = () => {

    return (
        <section className={styles.bannerContainer}>
            <img src={images.banner} alt="Sunglasses on dark background"></img>
            <hgroup>
                <h2>Stylish. Elegant. Unique.</h2>
                <h3>Beautiful eco-friendly accesories</h3>
            </hgroup>
        </section>
    );
};