import React from 'react'
import Carousel from '../addons/carousel'
import useWindowSize from '../../custom-hooks/useWindowSize'
import workStyles from './work.module.scss'

const Work = () => {
    const size = useWindowSize()
    const vwTOpx = value => {
        const result = (size.width * value) / 100
        return result
    }

    const getScrollBoxes = () => {
        return [1, 2, 3, 4, 5, 6].map(item => {
            return (
                <div className={workStyles.stepBox} draggable={false}>
                    <p>{`item: ${item}`}</p>
                </div>
            )
        })
    }
    return (
        <section id="work" className={workStyles.workContainer}>
            <div className={workStyles.workContentBox}>
                <div className={workStyles.carouselBlock}>
                    <Carousel
                        // autoPlay
                        // autoPlaySpeed={2000}
                        infinite
                        carouselContainer={workStyles.carouselContainer}
                        containerClass={workStyles.containerClass}
                        itemClass={workStyles.itemClass}
                        sliderClass={workStyles.sliderClass}
                    >
                        {getScrollBoxes()}
                    </Carousel>
                </div>
                <div className={workStyles.textBlock}>
                    <h1>The things</h1>
                    <h1>we could</h1>
                    <h1>create..!?</h1>
                    <div className={workStyles.description}>
                        <p>Get a developer who can do it all.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Work
