import React, { useContext } from 'react'
import ScrollContext from '../../context/scrollContext'
import {
    effects,
    useAnimationManager,
} from '../../custom-hooks/useAnimationManager'
import * as workStyles from './work.module.scss'

const Work = () => {
    const scrollY = useContext(ScrollContext)
    const animatedElements = {
        runHeaderAnimation: {
            id: 'work-section-animated-text',
            effect: effects.ON_TOP_REACHED,
        },
    }

    const animationStates = useAnimationManager(animatedElements, scrollY)

    const boxScrollTransformA = {
        transform: `translateY(-${scrollY / 10}px)`,
        transition: 'transform 0.5s ease',
    }

    const boxScrollTransformB = {
        transform: `translateY(-${scrollY / 12}px)`,
        transition: 'transform 0.5s ease',
    }

    const boxScrollTransformC = {
        transform: `translateY(-${scrollY / 5}px)`,
        transition: 'transform 0.5s ease',
    }
    const boxScrollTransformD = {
        transform: `translateY(-${scrollY / 15}px)`,
        transition: 'transform 0.5s ease',
    }

    return (
        <section id="work" className={workStyles.workContainer}>
            <div className={workStyles.workContentBox}>
                <div
                    className={workStyles.decorationBoxMedium}
                    style={boxScrollTransformD}
                />
                <div
                    className={workStyles.decorationBoxLittle}
                    style={boxScrollTransformC}
                />
                <div
                    className={
                        animationStates.runHeaderAnimation
                            ? workStyles.textBlockClosed
                            : workStyles.textBlock
                    }
                    id="work-section-animated-text"
                >
                    <div
                        className={workStyles.decorationBoxLarge}
                        style={boxScrollTransformA}
                    />
                    <div
                        className={workStyles.decorationBoxSmall}
                        style={boxScrollTransformB}
                    />
                    <div
                        className={workStyles.decorationBoxTiny}
                        style={boxScrollTransformC}
                    />
                    <div
                        className={workStyles.decorationBoxMiny}
                        style={boxScrollTransformC}
                    />
                    <h1>The things</h1>
                    <h1>we could</h1>
                    <h1>create..!?</h1>
                    <div className={workStyles.description}>
                        <p>
                            How many developers does it take to change a light
                            bulb?
                        </p>
                        <strong>front-end + back-end + dev-ops = 3?</strong>
                        <p>Think again.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Work
