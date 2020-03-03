import React, { useContext, useEffect, useState } from 'react'
import Img from 'gatsby-image'
import heroStyles from './hero.module.scss'
import { useStaticQuery, graphql } from 'gatsby'
import Welcome from './welcome'
import ScrollContext from '../../context/scrollContext'
import {
    effects,
    useAnimationManager,
} from '../../custom-hooks/useAnimationManager'

const Hero = () => {
    const scrollY = useContext(ScrollContext)
    const [titleIndex, setTitleIndex] = useState(0)
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
            contentfulAsset(
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
        }
    `)
    const animatedElements = {
        runOpeningAnimation: {
            id: '',
            effect: effects.ON_OPEN,
        },
    }

    const animationStates = useAnimationManager(animatedElements, scrollY)

    const getSlidingTitles = () => {
        const slide = {
            transform: `translateX(calc(-${titleIndex} * 400px))`,
        }
        return (
            <div style={slide} className={heroStyles.slidingTitles}>
                {titles.map(text => {
                    return (
                        <span className={heroStyles.changelingText}>
                            {text}
                        </span>
                    )
                })}
            </div>
        )
    }

    return (
        <section id="hero" className={heroStyles.heroContainer}>
            <Welcome runOpen={animationStates.runOpeningAnimation} />
            <div className={heroStyles.heroContentBox}>
                <div className={heroStyles.heroTextBox}>
                    <h1>Hi There<div className={heroStyles.exclam}>!</div></h1>
                    <h2>
                        I'm Richard a{' '}
                        <div className={heroStyles.changelingTextBox}>
                            {getSlidingTitles()}
                        </div>
                        ,
                    </h2>
                    <h2>ready to get job done for you!</h2>
                </div>
                <div className={heroStyles.heroImageBox}>
                    <Img
                        className={heroStyles.profileImage}
                        fixed={data.contentfulAsset.fixed}
                    />
                </div>
            </div>
        </section>
    )
}

export default Hero
