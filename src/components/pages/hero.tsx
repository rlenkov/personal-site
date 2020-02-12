import React, { useContext } from 'react'
import heroStyles from './hero.module.scss'
import Welcome from './welcome'
import ScrollContext from '../../context/scrollContext'
import {
    effects,
    useAnimationManager,
} from '../../custom-hooks/useAnimationManager'

const Hero = () => {
    const scrollY = useContext(ScrollContext)

    const animatedElements = {
        runOpeningAnimation: {
            id: '',
            effect: effects.ON_OPEN,
        },
    }

    const animationStates = useAnimationManager(animatedElements, scrollY)

    return (
        <section className={heroStyles.heroContainer}>
            <Welcome runOpen={animationStates.runOpeningAnimation} />
            <h1>Hero part</h1>
        </section>
    )
}

export default Hero
