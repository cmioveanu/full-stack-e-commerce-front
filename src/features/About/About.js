import styles from './About.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { toggleOpen } from '../Products/ProductsSlice';


export const About = () => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();


    const openModal = () => {
        setShowModal(true);

        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = '14px';
        dispatch(toggleOpen());
    }

    const closeModal = () => {
        setShowModal(false);

        document.body.style.overflow = 'unset';
        document.body.style.marginRight = 'unset';
        dispatch(toggleOpen());
    }


    return (
        <section className={styles.about} id="about">
            <h2>About us</h2>
            <p className={styles.introPara}>The Wooden Shop is where you can choose high 
            quality, hand crafted timepieces from some of the top bamboo and wood watches 
            brands in the world.</p>
            <button className={styles.readMore} onClick={openModal}>Read more</button>


            {   //show more details in the modal window
                !showModal ? null :
                    <div className={styles.modal}>
                        <div className={styles.innerContainer}>
                            <button
                                className={styles.goBack}
                                onClick={closeModal}>{"<< go back"}</button>

                            <section>
                                <h2>Why choose The Wooden Shop?</h2>
                                <p>The Wooden Watch Shop offers eco-friendly wooden watches with stylish,
                            modern, yet affordable designs. Unique timepieces that are hand crafted from natural wood.</p>
                                <p>We have a variety of natural woods such as bamboo, maple, red sandalwood, zebrawood and beech.</p>
                                <p>All watches are fitted with premium quality Japanese quartz movements and have scratchproof hardlex
                            glass to cover the dial, which keep the watches looking in top condition. </p>
                                <p>We also pride ourselves on having the highest standard of customer service,
                                giving you peace of mind that we value all our customers and will go the extra
                            mile to make sure your shopping experience with us is a happy one!</p>
                            </section>

                            <section>
                                <h2>What about skin allergies?</h2>
                                <p>All watches are hypoallergenic and are made from 100% natural wood with stainless steel clasps.
                            No toxic chemicals are used to treat the wood, in order to maintain our pledge to be as eco-friendly as possible.</p>
                                <p>However, there is also a small possibility that some people may have an allergic reaction to the wood or metal clasps.
                             After wearing your watch for a few weeks, it is recommended that you check your skin for any discomfort, rash, or itch. </p>
                                <p>In the very rare case that you experience an allergic reaction, please stop wearing the watch immediately and ask for
                             medical advice from your doctor. We cannot offer refunds on watches based on allergies.</p>
                                <p>Disclaimer: Wooden Watch Shop cannot guarantee against allergic reactions. We are not responsible for allergies,
                             injuries, or medical expenses as a result of wearing the wooden watches.</p>
                            </section>
                            <section>
                                <h2>Will my watch fit?</h2>
                                <p>Yes, all Wooden Watch Shop watches are sized to wrist watch standards.
                            You can reduce the band length by removing links (tools are provided in the package).</p>
                                <p>A number of watches also contain extra links to expand the band length if needed.</p>
                                <p>If you think you may need the watch to fit a larger than standard wrist, please contact us and we can arrange for extra links to be provided.</p>
                            </section>

                            <section>
                                <h2>Can I replace the battery?</h2>
                                <p>All watches are either quartz battery powered or automatic self winding. For battery operated watches, if you wish to
                             replace the battery yourself there is easy access to the battery by removing the backplate.</p>
                                <p>Alternatively most jewelry or watch shops will provide a battery replacement service.</p>
                                <p>Batteries should last a number of years before needing to be changed, but this will vary from watch to watch.
                            (Please note batteries are not included in the warranty)</p>
                            </section>

                            <section>
                                <h2> How do I care for the watch?</h2>
                                <p>Mix two tsps each of olive oil and lemon juice, and apply to a soft cotton cloth. Apply to the wood.</p>
                                <p> If at any time your watch looks lighter or starts to change in appearance, we recommend that you apply
                             a natural coating such as beeswax, lip balm, butcher block oil or walnut oil. </p>
                                <p>Regular application can help to protect it against damage and improve the durability of the wood
                            and help maintain the moisture balance to prevent drying or cracking.</p>
                            </section>

                            <button
                                className={`${styles.goBack} ${styles.secondGoBack}`}
                                onClick={closeModal}>{"<< go back"}</button>
                        </div>
                    </div>
            }
        </section >
    );
};