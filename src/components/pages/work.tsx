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
        runHeaderAnimation1: {
            id: 'work-section-animated-text-1',
            effect: effects.ON_TOP_REACHED,
        },
        runHeaderAnimation2: {
            id: 'work-section-animated-text-2',
            effect: effects.ON_TOP_REACHED,
        },
        runHeaderAnimation3: {
            id: 'work-section-animated-text-3',
            effect: effects.ON_TOP_REACHED,
        },
        runHeaderAnimation4: {
            id: 'work-section-animated-text-4',
            effect: effects.ON_TOP_REACHED,
        },
    }

    const animationStates = useAnimationManager(animatedElements, scrollY)

    const getMovement = (divider, limit) => {
        return scrollY / divider < limit ? scrollY / divider : limit
    }

    const boxScrollTransformA = {
        transform: `translateY(${getMovement(15, 200)}px)`,
        transition: 'transform 0.5s ease-out',
    }

    const boxScrollTransformB = {
        transform: `translateY(${getMovement(8, 250)}px)`,
        transition: 'transform 0.5s ease-out',
    }

    const boxScrollTransformC = {
        transform: `translateY(${getMovement(
            15,
            200
        )}px) translateX(${getMovement(2, 500)}px)`,
        transition: 'transform 0.5s ease-out',
    }

    const boxScrollTransformD = {
        transform: `translateY(${getMovement(
            8,
            250
        )}px) translateX(${getMovement(2, 500)}px)`,
        transition: 'transform 0.7s ease-out',
    }

    const boxScrollTransformE = {
        transform: `translateY(${getMovement(
            1,
            300
        )}px) translateX(${getMovement(10, 200)}px)`,
        transition: 'transform 0.7s ease-out',
    }

    return (
        <section id="work" className={workStyles.workContainer}>
            <div className={workStyles.svgBox}>
                <Portal
                    className={workStyles.svgPortal}
                    style={boxScrollTransformB}
                />
                <MachineBot
                    className={workStyles.svgBot}
                    style={boxScrollTransformB}
                />
                <MachineTop
                    className={workStyles.svgTop}
                    style={boxScrollTransformA}
                />
            </div>
            <div className={workStyles.workContentBox}>
                <div
                    className={[
                        workStyles.textBlockEdit,
                        workStyles.blockA,
                    ].join(' ')}
                    id="work-section-animated-text-1"
                    style={boxScrollTransformC}
                >
                    <h1>Need frontend?</h1>
                </div>
                <div
                    className={[
                        workStyles.textBlockEdit,
                        workStyles.blockB,
                    ].join(' ')}
                    id="work-section-animated-text-2"
                    style={boxScrollTransformD}
                >
                    <h1>Backend?</h1>
                </div>
                <div
                    className={[
                        workStyles.textBlockEdit,
                        workStyles.blockC,
                    ].join(' ')}
                    id="work-section-animated-text-3"
                    style={boxScrollTransformE}
                >
                    <h1>or DevOps?</h1>
                </div>
                <div
                    className={[
                        workStyles.textBlockEdit,
                        workStyles.blockD,
                    ].join(' ')}
                    id="work-section-animated-text-4"
                    style={boxScrollTransformB}
                >
                    <h1>Imagination's the limit!</h1>
                </div>
            </div>
        </section>
    )
}

export default Work
