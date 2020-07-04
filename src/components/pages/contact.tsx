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
                        href="https://linkedin.com/in/richard-lenkovits"
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
            <div className={contactStyles.svgBox}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path
                        fill="#131318"
                        fill-opacity="1"
                        d="M0,128L24,117.3C48,107,96,85,144,96C192,107,240,149,288,144C336,139,384,85,432,80C480,75,528,117,576,149.3C624,181,672,203,720,213.3C768,224,816,224,864,218.7C912,213,960,203,1008,186.7C1056,171,1104,149,1152,170.7C1200,192,1248,256,1296,245.3C1344,235,1392,149,1416,106.7L1440,64L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"
                    ></path>
                </svg>
            </div>
        </section>
    )
}

export default Contact
