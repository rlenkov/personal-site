import React from 'react'
import contactStyles from './contact.module.scss'

const Contact = () => (
    <section id="contact" className={contactStyles.contactContainer}>
        <div className={contactStyles.contactHeadline}>
            <h1>Find me online!</h1>
        </div>
        <div className={contactStyles.contactContentBox}>
            <p>Facebook, insta, linkedin</p>
        </div>
    </section>
)

export default Contact
