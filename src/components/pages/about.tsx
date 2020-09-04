import React, { useState, useContext } from 'react'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import ScrollContext from '../../context/scrollContext'
import {
    effects,
    useAnimationManager,
} from '../../custom-hooks/useAnimationManager'
import useSkillsData from '../../custom-hooks/useSkillsData'
import aboutStyles from './about.module.scss'

const About = () => {
    const [skillBox, setSkillBox] = useState(null)
    const scrollY = useContext(ScrollContext)
    const data = useStaticQuery(graphql`
        query {
            contentfulAsset(
                id: { eq: "a14cac87-c59e-56fb-9e76-4babb241f423" }
            ) {
                title
                fixed(width: 400, quality: 100) {
                    width
                    height
                    src
                    srcSet
                }
            }
        }
    `)
    const animatedElements = {
        runHeaderAnimation: {
            id: 'about',
            effect: effects.ON_LOW_REACHED,
        },
        runSkillsAnimation: {
            id: 'about-section-animated-skills',
            effect: effects.ON_LOW_REACHED,
        },
    }

    const animationStates = useAnimationManager(animatedElements, scrollY)

    const payload = useSkillsData()

    const getMobileSkillPopup = title => {
        let popup = <div className={aboutStyles.mobileSkillBoxEmpty}></div>
        if (title === null) {
            return popup
        }
        payload.allContentfulSkillDescriptions.edges.forEach(skill => {
            if (title === skill.node.title) {
                popup = (
                    <div
                        className={aboutStyles.mobileSkillBox}
                        style={{
                            backgroundImage: `url("${skill.node.image.fixed.src}")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                        }}
                        onClick={() => {
                            setSkillBox(null)
                        }}
                    >
                        {documentToReactComponents(skill.node.description.json)}
                        <a className={aboutStyles.close} />
                    </div>
                )
            }
        })
        return popup
    }

    const getSkillsBox = () => {
        const skillSpans = payload.allContentfulSkillDescriptions.edges
            .sort((a, b) => (a.node.order >= b.node.order ? 1 : -1))
            .map(skill => {
                return (
                    <div
                        className={aboutStyles.inlineBox}
                        key={`key-skill-tables-${skill.node.title}`}
                    >
                        <div
                            className={aboutStyles.explainerPopup}
                            style={{
                                backgroundImage: `url("${skill.node.image.fixed.src}")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                            }}
                            onClick={() => {
                                setSkillBox(null)
                            }}
                        >
                            {documentToReactComponents(
                                skill.node.description.json
                            )}
                        </div>
                        <span
                            className={aboutStyles.skill}
                            onClick={() => {
                                if (skill.node.title === skillBox) {
                                    setSkillBox(null)
                                } else {
                                    setSkillBox(skill.node.title)
                                }
                            }}
                        >
                            {skill.node.title.toUpperCase()}
                        </span>
                        <span className={aboutStyles.separator}>|</span>
                    </div>
                )
            })
        return (
            <h3
                id="about-section-animated-skills"
                className={
                    animationStates.runSkillsAnimation
                        ? aboutStyles.hiddenSkills
                        : aboutStyles.showSkills
                }
            >
                {skillSpans}
            </h3>
        )
    }

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
                    {getMobileSkillPopup(skillBox)}
                    {getSkillsBox()}
                    <div className={aboutStyles.cvBox}>
                        <h4>
                            Prefer the hard facts?{' '}
                            <a
                                href="https://drive.google.com/file/d/1yKaSVCXftVjEYkOog9r9CK6ym5JwCPO_/view?usp=sharing"
                                download
                                target="_blank"
                            >
                                Get my CV!
                            </a>
                        </h4>
                    </div>
                </div>
                <div className={aboutStyles.aboutImageBox}>
                    <Img
                        className={aboutStyles.profileImage}
                        fixed={data.contentfulAsset.fixed}
                        imgStyle={{
                            zIndex: 0,
                            borderRadius: '10px',
                            maxWidth: '80vw',
                            filter:
                                'brightness(160%) contrast(90%) saturate(120%)',
                        }}
                    />
                </div>
            </div>
        </section>
    )
}

export default About
