import React, { useContext, useEffect, useState } from 'react'
import * as heroStyles from './hero.module.scss'
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
        'jenkins specialist',
        'devOps engineer',
        'frontend dev',
        'backend dev',
        'quasi-physicist',
        'fiction-writer',
        'frenchie dad',
        'tech-blogger',
    ])

    useEffect(() => {
        const timer = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * titles.length)
            if (titleIndex === randomIndex) {
                const retry = Math.floor(Math.random() * titles.length)
                setTitleIndex(retry)
            } else {
                setTitleIndex(randomIndex)
            }
        }, 3000)
        return () => {
            clearInterval(timer)
        }
    }, [])

    const data = useStaticQuery(graphql`
        query {
            fallbackImage: file(
                relativePath: { eq: "_assetbox/video_fallback.png" }
            ) {
                childImageSharp {
                    fluid(quality: 100) {
                        src
                    }
                }
            }
            videoBackground: file(
                relativePath: { eq: "_assetbox/profile_video.mp4" }
            ) {
                publicURL
            }
        }
    `)

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
                {titles.map((text) => {
                    return (
                        <span
                            className={heroStyles.changelingText}
                            key={`sliding-titles-key-${text}`}
                        >
                            {text}
                        </span>
                    )
                })}
            </div>
        )
    }

    const backgroundStyle = {
        backgroundImage: `url('${data.fallbackImage.childImageSharp.fluid.src}')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right',
    }

    return (
        <section
            id="hero"
            className={heroStyles.heroContainer}
            style={backgroundStyle}
        >
            <Welcome runOpen={animationStates.runOpeningAnimation} />
            <div className={heroStyles.videoContainer}>
                <video autoPlay muted loop playsInline>
                    <source
                        src={data.videoBackground.publicURL}
                        type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
                    />
                </video>
            </div>
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
            </div>
        </section>
    )
}

export default Hero
