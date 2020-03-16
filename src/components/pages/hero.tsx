import React, { useContext, useEffect, useState } from 'react'
import Img from 'gatsby-image'
import heroStyles from './hero.module.scss'
import { useStaticQuery, graphql } from 'gatsby'
import Welcome from './welcome'
import useWindowSize from '../../custom-hooks/useWindowSize'
import ScrollContext from '../../context/scrollContext'
import {
    effects,
    useAnimationManager,
} from '../../custom-hooks/useAnimationManager'

const Hero = () => {
    const scrollY = useContext(ScrollContext)
    const [titleIndex, setTitleIndex] = useState(0)
    const size = useWindowSize()
    const [titles, setTitles] = useState([
        'software developer',
        'devOps engineer',
        'frontend dev',
        'backend dev',
        'quasi-physicist',
        'fiction-writer',
        'frenchie dad',
    ])

    useEffect(() => {
        const timer = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * titles.length)
            setTitleIndex(randomIndex)
        }, 4000)
        return () => {
            clearInterval(timer)
        }
    }, [])

    const data = useStaticQuery(graphql`
        query {
            profile: contentfulAsset(
                id: { eq: "a14cac87-c59e-56fb-9e76-4babb241f423" }
            ) {
                title
                fixed(width: 300) {
                    width
                    height
                    src
                    srcSet
                }
            }
            background: contentfulAsset(
                id: { eq: "1a97992c-e33b-5c36-aff9-6fb72d9947e1" }
            ) {
                title
                fluid {
                    src
                }
            }
        }
    `)

    const isMobile = () => {
        if (size) {
            return size.width <= 500
        }
    }

    const isTablet = () => {
        if (size) {
            return size.width <= 1100
        }
    }

    const animatedElements = {
        runOpeningAnimation: {
            id: '',
            effect: effects.ON_OPEN,
        },
    }

    const animationStates = useAnimationManager(animatedElements, scrollY)

    const getSlidingTitles = () => {
        const slide = isTablet()
            ? {
                  transform: `translateX(calc(-${titleIndex} * 300px))`,
              }
            : {
                  transform: `translateX(calc(-${titleIndex} * 20vw))`,
              }
        return (
            <div style={slide} className={heroStyles.slidingTitles}>
                {titles.map(text => {
                    return (
                        <span className={heroStyles.changelingText} key={`sliding-titles-key-${text}`}>
                            {text}
                        </span>
                    )
                })}
            </div>
        )
    }

    const backgroundStyle = {
        backgroundImage: `url('${data.background.fluid.src}')`,
        backgroundSize: '100%',
    }

    return (
        <section
            id="hero"
            className={heroStyles.heroContainer}
            style={backgroundStyle}
        >
            <Welcome runOpen={animationStates.runOpeningAnimation} />
            <div className={heroStyles.heroContentBox}>
                <div className={heroStyles.heroTextBox}>
                    <div>
                        <h1>
                            Hi There<div className={heroStyles.exclam}>!</div>
                        </h1>
                    </div>
                    <div>
                        <h2>
                            I'm Richard Lenkovits, a...{' '}
                            <div className={heroStyles.changelingTextBox}>
                                {getSlidingTitles()}
                            </div>
                            ,
                        </h2>
                        <h2>ready to get work done for you!</h2>
                    </div>
                </div>
                {/* <div className={heroStyles.heroImageBox}>
                    <Img
                        className={heroStyles.profileImage}
                        fixed={data.profile.fixed}
                    />
                </div> */}
            </div>
        </section>
    )
}

export default Hero
