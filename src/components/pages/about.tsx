import React from 'react'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from 'gatsby'
import aboutStyles from './about.module.scss'

const About = () => {
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
                    <span className={aboutStyles.skill}>{skill}</span>
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
                    <Img
                        className={aboutStyles.profileImage}
                        fixed={data.contentfulAsset.fixed}
                    />
                </div>
            </div>
        </section>
    )
}

export default About
