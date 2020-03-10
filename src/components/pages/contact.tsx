import React from 'react'
import contactStyles from './contact.module.scss'

const Contact = () => (
    <section id="contact" className={contactStyles.contactContainer}>
        <div className={contactStyles.contactHeadline}>
            <h1>
                <span className={contactStyles.title}>
                    Find me onl
                    <span className={contactStyles.colored}>ine</span>
                </span>
                <div className={contactStyles.decorationBoxLarge} />
            </h1>
            <div className={contactStyles.decorationBoxSmall} />
        </div>
        <div className={contactStyles.contactContentBox}>
            <p>Facebook, insta, linkedin</p>
        </div>
    </section>
)

export default Contact
