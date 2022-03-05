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

    const slideBoxNumber = 11

    const skills = [
        'java',
        'groovy',
        'perl',
        'jenkins',
        'kubernetes',
        'javascript',
        'python',
        'html',
        'react',
        'css',
        'sass',
        'aws',
        'erlang',
        'flask',
        'bazel',
        'bash',
        'vim',
        'postgreSQL',
        'firebase',
        'google cloud',
        'wordpress',
        'django',
    ]

    const dynamicHorisontalSlideValue = (boxId, maxTransition) => {
        const isClient =
            typeof document === 'object' && typeof window === 'object'
        if (isClient) {
            const slidetextBox = document.getElementById(boxId)
            const slideTextBoxRect =
                slidetextBox && slidetextBox.getBoundingClientRect()
            if (slideTextBoxRect) {
                const isTopReached =
                    slideTextBoxRect.top - slideTextBoxRect.height < 0
                const isBotReached =
                    slideTextBoxRect && slideTextBoxRect.top < 0
                let transition = 0
                // We start transition when the box top is reached
                if (isTopReached && !isBotReached) {
                    transition = Math.abs(
                        slideTextBoxRect.top - slideTextBoxRect.height
                    )
                    const nonZeroTransition = transition === 0 ? 1 : transition
                    const ratio = nonZeroTransition / slideTextBoxRect.height
                    transition = ratio * maxTransition
                    // after the box bottom we keep the max value
                } else if (isTopReached && isBotReached) {
                    transition = maxTransition
                }
                return transition
            }
        }
        return 0
    }

    const getFlowBoxSize = (flowBoxId) => {
        const defaultSize = 2000
        const isClient =
            typeof document === 'object' && typeof window === 'object'
        if (isClient) {
            const flowBox = document.getElementById(flowBoxId)
            const flowBoxRect = flowBox && flowBox.getBoundingClientRect()
            return flowBoxRect ? flowBoxRect.width : defaultSize
        }
        return defaultSize
    }

    const horisontalSlideTransition = (divider, maxNum, boxId) => {
        const flowBoxSize = getFlowBoxSize(boxId)
        // The step ratio is based on the list length
        const baseTransitionRatio = Math.round(skills.length / 1.2)
        // The maximum transition is a part of the slide box length
        let maxTransition = flowBoxSize / baseTransitionRatio
        // We set offset based on order. Offset increases until the half of the boxes
        const increaseLimit = Math.round(maxNum / 2)
        let offset = flowBoxSize / baseTransitionRatio
        if (divider < increaseLimit) {
            offset = (flowBoxSize / baseTransitionRatio) * divider
        } else if (divider > increaseLimit) {
            offset = (flowBoxSize / baseTransitionRatio) * (maxNum - divider)
        }
        // Calculate transition
        const slideQuanta = dynamicHorisontalSlideValue(
            'backgroundText',
            maxTransition
        )
        const slideTransition = {
            transform: `translatex(-${offset + slideQuanta}px)`,
            transition: `transform ${0.8 + divider / maxNum}s ease-out`,
        }
        return slideTransition
    }

    const animationStates = useAnimationManager(animatedElements, scrollY)

    return (
        <section id="about" className={aboutStyles.aboutContainer}>
            <div id="backgroundText" className={aboutStyles.backgroundTextBox}>
                {[...Array(slideBoxNumber).keys()].map((num) => (
                    <div className={aboutStyles.floatingBox}>
                        <div
                            id={`flowBox_${num}`}
                            className={aboutStyles.overflowBox}
                            style={horisontalSlideTransition(
                                num,
                                slideBoxNumber,
                                `flowBox_${num}`
                            )}
                        >
                            {skills.map((skill) => (
                                <span>{skill}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div
                className={
                    animationStates.runHeaderAnimation
                        ? aboutStyles.aboutHeadlineClosed
                        : aboutStyles.aboutHeadline
                }
            >
                <h1>Meet The Fixer...</h1>
            </div>
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
        </section>
    )
}

export default About
