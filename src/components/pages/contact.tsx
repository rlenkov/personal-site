import React, { useContext } from 'react'
import ScrollContext from '../../context/scrollContext'
import contactStyles from './contact.module.scss'

const Contact = () => {
    const scrollY = useContext(ScrollContext)

    const boxScrollTransformA = {
        transform: `translateY(${150 - (scrollY / 20)}px)`,
        transition: 'transform 0.5s ease',
    }

    const boxScrollTransformB = {
        transform: `translateY(${100 - (scrollY / 10)}px)`,
        transition: 'transform 0.5s ease',
    }

    return (
        <section id="contact" className={contactStyles.contactContainer}>
            <div className={contactStyles.contactHeadline}>
                <h1>
                    <span className={contactStyles.title}>
                        Find me onl
                        <span className={contactStyles.colored}>ine</span>
                    </span>
                    <div className={contactStyles.decorationBoxLarge} style={boxScrollTransformA}/>
                </h1>
                <div className={contactStyles.decorationBoxSmall} style={boxScrollTransformB}/>
            </div>
            <div className={contactStyles.contactContentBox}>
                <p>Facebook, insta, linkedin</p>
            </div>
        </section>
    )
}

export default Contact
