import React, { useState } from 'react'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from 'gatsby'
import aboutStyles from './about.module.scss'

const About = () => {
    const [skillBox, setSkillBox] = useState(null)
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

    const getSkillBox = skill => {
        if (skill) {
            return (
                <div className={aboutStyles.skillDescribeBox}>
                    <p>Skills Here for: {skill}</p>
                </div>
            )
        }
        return (
            <Img
                className={aboutStyles.profileImage}
                fixed={data.contentfulAsset.fixed}
            />
        )
    }

    const getSkillsBox = () => {
        const skills = [
            'JAVASCRIPT',
            'HTML',
            'CSS',
            'SASS',
            'REACT',
            'AWS',
            'JAVA',
            'GROOVY',
            'PYTHON',
            'PERL',
        ]
        const skillSpans = skills.map(skill => {
            return (
                <React.Fragment key={`key-skill-tables-${skill}`}>
                    <span
                        className={
                            skill === skillBox
                                ? aboutStyles.skillActive
                                : aboutStyles.skill
                        }
                        onClick={() => {
                            if (skill === skillBox) {
                                setSkillBox(null)
                            } else {
                                setSkillBox(skill)
                            }
                        }}
                    >
                        {skill}
                    </span>
                    <span className={aboutStyles.separator}>|</span>
                </React.Fragment>
            )
        })
        return <h3>{skillSpans}</h3>
    }
    return (
        <section id="about" className={aboutStyles.aboutContainer}>
            <div className={aboutStyles.aboutHeadline}>
                <h1>Meet The Fixer...</h1>
            </div>
            <div className={aboutStyles.aboutContentBox}>
                <div className={aboutStyles.skillCollections}>
                    <h4>skills</h4>
                    {getSkillsBox()}
                </div>
                <div className={aboutStyles.aboutImageBox}>
                    {getSkillBox(skillBox)}
                </div>
            </div>
        </section>
    )
}

export default About
