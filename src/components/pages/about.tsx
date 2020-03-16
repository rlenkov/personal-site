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
                    <div className={aboutStyles.cvBox}>
                        <h4>
                            Prefer the hard facts?{' '}
                            <a
                                href="https://drive.google.com/file/d/1VLTfF0y5x_gcZlmuUZQmPynqMh07YUZK/view?usp=sharing"
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
                        imgStyle={{ zIndex: 0 }}
                    />
                </div>
            </div>
        </section>
    )
}

export default About
