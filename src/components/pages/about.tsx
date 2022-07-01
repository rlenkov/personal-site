import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
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

    const data = useStaticQuery(graphql`
        query {
            imageSharp(fluid: { originalName: { eq: "profile-picture.jpg" } }) {
                gatsbyImageData(quality: 100)
            }
        }
    `)

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
            <div className={aboutStyles.waveContainer}>
                <svg
                    id="wave"
                    style={{ transform: `rotate(180deg)`, transition: `0.3s` }}
                    viewBox="0 0 1440 270"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        style={{ transform: 'translate(0, 0px)', opacity: '1' }}
                        fill="#131318"
                        d="M0,135L24,121.5C48,108,96,81,144,85.5C192,90,240,126,288,117C336,108,384,54,432,54C480,54,528,108,576,112.5C624,117,672,72,720,63C768,54,816,81,864,94.5C912,108,960,108,1008,126C1056,144,1104,180,1152,189C1200,198,1248,180,1296,162C1344,144,1392,126,1440,103.5C1488,81,1536,54,1584,72C1632,90,1680,153,1728,153C1776,153,1824,90,1872,67.5C1920,45,1968,63,2016,81C2064,99,2112,117,2160,108C2208,99,2256,63,2304,72C2352,81,2400,135,2448,166.5C2496,198,2544,207,2592,193.5C2640,180,2688,144,2736,126C2784,108,2832,108,2880,112.5C2928,117,2976,126,3024,121.5C3072,117,3120,99,3168,112.5C3216,126,3264,171,3312,198C3360,225,3408,234,3432,238.5L3456,243L3456,270L3432,270C3408,270,3360,270,3312,270C3264,270,3216,270,3168,270C3120,270,3072,270,3024,270C2976,270,2928,270,2880,270C2832,270,2784,270,2736,270C2688,270,2640,270,2592,270C2544,270,2496,270,2448,270C2400,270,2352,270,2304,270C2256,270,2208,270,2160,270C2112,270,2064,270,2016,270C1968,270,1920,270,1872,270C1824,270,1776,270,1728,270C1680,270,1632,270,1584,270C1536,270,1488,270,1440,270C1392,270,1344,270,1296,270C1248,270,1200,270,1152,270C1104,270,1056,270,1008,270C960,270,912,270,864,270C816,270,768,270,720,270C672,270,624,270,576,270C528,270,480,270,432,270C384,270,336,270,288,270C240,270,192,270,144,270C96,270,48,270,24,270L0,270Z"
                    ></path>
                </svg>
            </div>
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
            <div className={aboutStyles.aboutDescriptionBox}>
                <div
                    className={
                        animationStates.runHeaderAnimation
                            ? aboutStyles.aboutDescriptionRevealed
                            : aboutStyles.aboutDescription
                    }
                >
                    <h1>Meet The Fixer...</h1>
                    <GatsbyImage
                        image={data.imageSharp.gatsbyImageData}
                        alt="any"
                        className={aboutStyles.profilePic}
                    />
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
