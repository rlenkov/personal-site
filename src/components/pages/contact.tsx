import React, { useContext } from 'react'
import ScrollContext from '../../context/scrollContext'
import contactStyles from './contact.module.scss'

const Contact = () => {
    const scrollY = useContext(ScrollContext)

    const boxScrollTransformA = {
        transform: `translateY(${100 - scrollY / 20}px)`,
        transition: 'transform 0.5s ease',
    }

    const boxScrollTransformB = {
        transform: `translateY(${100 - scrollY / 10}px)`,
        transition: 'transform 0.5s ease',
    }

    const boxScrollTransformC = {
        transform: `translateY(${100 - scrollY / 5}px)`,
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
                    <div
                        className={contactStyles.decorationBoxLarge}
                        style={boxScrollTransformA}
                    />
                </h1>
                <div
                    className={contactStyles.decorationBoxSmall}
                    style={boxScrollTransformB}
                />
                                <div
                    className={contactStyles.decorationBoxTiny}
                    style={boxScrollTransformC}
                />
            </div>
            <div className={contactStyles.contactContentBox}>
                <p>
                    Let's have a chat on{' '}
                    <a
                        target="_blank"
                        href="www.linkedin.com/in/richard-lenkovits"
                    >
                        LinkedIn
                    </a>
                    {' or '}
                    <a
                        target="_blank"
                        href="https://www.facebook.com/richard.lenkovits"
                    >
                        Facebook
                    </a>
                    .
                </p>
                <p>
                    Check out my blog at {' '}
                    <a target="_blank" href="https://dev.to/pencillr">
                        dev.to
                    </a>
                    {' or simply '}
                    <a href="mailto:richard.lenkovits@gmail.com">
                        write a mail
                    </a>
                    .
                </p>
            </div>
        </section>
    )
}

export default Contact
