import React, { useContext } from 'react'
import MachineTop from '../../images/machine_top.svg'
import MachineBot from '../../images/machine_bot.svg'
import Portal from '../../images/portal.svg'
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

    const getMovement = (divider, limit) => {
        return (scrollY / divider) < limit ? (scrollY / divider) : limit
    }

    const boxScrollTransformA = {
        transform: `translateY(${getMovement(20, 80)}px)`,
        transition: 'transform 0.5s ease',
    }

    const boxScrollTransformB = {
        transform: `translateY(${getMovement(10, 200)}px)`,
        transition: 'transform 0.5s ease',
    }

    return (
        <section id="work" className={workStyles.workContainer}>
            <div className={workStyles.svgBox}>
                <MachineBot
                    className={workStyles.svgBot}
                    style={boxScrollTransformB}
                />
                <MachineTop
                    className={workStyles.svgTop}
                    style={boxScrollTransformA}
                />
                <Portal
                    className={workStyles.svgPortal}
                    style={boxScrollTransformB}
                />
            </div>
            <div className={workStyles.workContentBox}>
                <div
                    className={
                        animationStates.runHeaderAnimation
                            ? workStyles.textBlockClosed
                            : workStyles.textBlock
                    }
                    id="work-section-animated-text"
                >
                    <h1>The things</h1>
                    <h1>we could</h1>
                    <h1>create..!?</h1>
                </div>
            </div>
        </section>
    )
}

export default Work
