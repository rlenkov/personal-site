import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Carousel from '../addons/carousel'
import useWindowSize from '../../custom-hooks/useWindowSize'
import useMouseOver from '../../custom-hooks/useMouseOver'
import workStyles from './work.module.scss'

const Work = () => {
    const size = useWindowSize()
    const isMouseOver = useMouseOver('work-carousel-box')
    const vwTOpx = value => {
        const result = (size.width * value) / 100
        return result
    }

    const data = useStaticQuery(graphql`
        query {
            allContentfulWorkAspects {
                edges {
                    node {
                        title
                        description {
                            json
                        }
                        order
                        image {
                            fixed(width: 300) {
                                width
                                height
                                src
                                srcSet
                            }
                        }
                    }
                }
            }
        }
    `)

    const getScrollBoxes = () => {
        return data.allContentfulWorkAspects.edges
            .sort((a, b) => (a.node.order >= b.node.order ? 1 : -1))
            .map(element => {
                return (
                    <div className={workStyles.stepBox} draggable={false}>
                        <h3>{element.node.title}</h3>
                        <div className={workStyles.carouselMedia}>
                            <Img
                                className={workStyles.carouselImage}
                                fixed={element.node.image.fixed}
                                draggable={false}
                            />
                            <div className={workStyles.carouselText}>
                                {documentToReactComponents(
                                    element.node.description.json
                                )}
                            </div>
                        </div>
                    </div>
                )
            })
    }
    return (
        <section id="work" className={workStyles.workContainer}>
            <div className={workStyles.workContentBox}>
                <div
                    className={workStyles.carouselBlock}
                    id="work-carousel-box"
                >
                    <Carousel
                        // autoPlay
                        // autoPlaySpeed={2000}
                        isMouseOver={isMouseOver}
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
                    <div className={workStyles.decorationBoxLarge} />
                    <div className={workStyles.decorationBoxSmall} />
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
            <div className={workStyles.hiddenOutline}>
                <h1 unselectable="on">The things</h1>
                <h1 unselectable="on">we could</h1>
                <h1 unselectable="on">create..!?</h1>
            </div>
        </section>
    )
}

export default Work
