import React from 'react';
import styles from './Banner.module.css';

/*the css for the banners has a common .banner class, and specific class names
that are passed in as props for the individual background images
*/

export const Banner = (props) => {

    return (
        <section className={styles.bannerContainer}>
            <div className={`${styles.banner} ${styles[props.leftBanner.class]}`}>
                <div className={styles.names}>
                    <h3>{props.leftBanner.category}</h3>
                    <h2>{props.leftBanner.name}</h2>
                </div>
            </div>
            <div className={`${styles.banner} ${styles[props.rightBanner.class]}`}>
                <div className={styles.names}>
                    <h3>{props.rightBanner.category}</h3>
                    <h2>{props.rightBanner.name}</h2>
                </div>
            </div>
        </section>
    );
};