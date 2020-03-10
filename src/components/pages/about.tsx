import React from 'react'
import aboutStyles from './about.module.scss'

const About = () => (
    <section id="about" className={aboutStyles.aboutContainer}>
        <div className={aboutStyles.aboutHeadline}>
            <h1>Meet The Fixer...</h1>
        </div>
        <div className={aboutStyles.aboutContentBox}>
            <div className={aboutStyles.skillCollections}>
                <p>Javascript, Javascript, Javascript</p>
            </div>
            <div className={aboutStyles.aboutImageBox}>
                <p>image here</p>
            </div>
        </div>
    </section>
)

export default About
