import React, { useState, useContext } from 'react'
import useMetaData from '../../custom-hooks/useMetaData'
import ScrollContext from '../../context/scrollContext'
import {
    effects,
    useAnimationManager,
} from '../../custom-hooks/useAnimationManager'
import * as aboutStyles from './about.module.scss'

const About = () => {
    const meta = useMetaData()
    const scrollY = useContext(ScrollContext)
    const animatedElements = {
        runHeaderAnimation: {
            id: 'about',
            effect: effects.ON_LOW_REACHED,
        },
    }

    const animationStates = useAnimationManager(animatedElements, scrollY)

    return (
        <section id="about" className={aboutStyles.aboutContainer}>
            <div
                className={
                    animationStates.runHeaderAnimation
                        ? aboutStyles.aboutHeadlineClosed
                        : aboutStyles.aboutHeadline
                }
            >
                <h1>Meet The Fixer...</h1>
            </div>
            <div className={aboutStyles.aboutContentBox}>
                <div className={aboutStyles.skillCollections}>
                    <h4>skills</h4>
                    <div className={aboutStyles.cvBox}>
                        <h4>
                            Prefer the hard facts?{' '}
                            <a
                                href={meta.site.siteMetadata.cvLink}
                                download
                                target="_blank"
                            >
                                Get my CV!
                            </a>
                        </h4>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
