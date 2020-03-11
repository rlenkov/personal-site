import React, { useState } from 'react'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import useSkillsData from '../../custom-hooks/useSkillsData'
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

    const payload = useSkillsData()

    // const getSkillBox = skill => {
    //     if (skill) {
    //         return (
    //             <div className={aboutStyles.skillDescribeBox}>
    //                 <p>Skills Here for: {skill}</p>
    //             </div>
    //         )
    //     }
    //     return (
    //         <Img
    //             className={aboutStyles.profileImage}
    //             fixed={data.contentfulAsset.fixed}
    //         />
    //     )
    // }

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
        const skillSpans = payload.allContentfulSkillDescriptions.edges.map(
            skill => {
                return (
                    <div
                        className={aboutStyles.inlineBox}
                        key={`key-skill-tables-${skill.node.title}`}
                    >
                        <div
                            className={aboutStyles.explainerPopup}
                            // style={{
                            //     backgroundImage: `url("${skill.node.image.fixed.src}")`,
                            // }}
                        >
                            {documentToReactComponents(
                                skill.node.description.json
                            )}
                            {/* <Img
                                className={aboutStyles.skillImage}
                                fixed={skills.node.image.fixed.src}
                            /> */}
                        </div>
                        <span
                            className={
                                skill.node.title === skillBox
                                    ? aboutStyles.skillActive
                                    : aboutStyles.skill
                            }
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
            }
        )
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
                    {/* {getSkillBox(skillBox)} */}
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
