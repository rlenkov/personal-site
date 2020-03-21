import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Carousel from '../addons/carousel'
import ScrollContext from '../../context/scrollContext'
import {
    effects,
    useAnimationManager,
} from '../../custom-hooks/useAnimationManager'
import useWindowSize from '../../custom-hooks/useWindowSize'
import useMouseOver from '../../custom-hooks/useMouseOver'
import workStyles from './work.module.scss'

const Work = props => {
    const size = useWindowSize()
    const isMouseOver = useMouseOver('work-carousel-box')
    const scrollY = useContext(ScrollContext)
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

    const animatedElements = {
        runHeaderAnimation: {
            id: 'work-section-animated-text',
            effect: effects.ON_TOP_REACHED,
        },
    }

    const animationStates = useAnimationManager(animatedElements, scrollY)

    const isTablet = () => {
        if (size) {
            return size.width <= 1300
        }
    }

    const isSmallWidth = () => {
        if (size) {
            return size.width <= 1700
        }
    }

    const isPhone = () => {
        if (size) {
            return size.width <= 600
        }
    }

    const getScrollBoxes = () => {
        let imageStyle = isSmallWidth()
            ? { width: '150px', height: '150px', objectFit: 'cover' }
            : {}
        imageStyle = isTablet()
            ? { width: '200px', height: '200px', objectFit: 'cover' }
            : imageStyle
        imageStyle = isPhone()
            ? {
                  width: '300px',
                  height: '300px',
                  objectFit: 'cover',
                  margin: 'auto',
              }
            : imageStyle
        return data.allContentfulWorkAspects.edges
            .sort((a, b) => (a.node.order >= b.node.order ? 1 : -1))
            .map(element => {
                return (
                    <div
                        className={workStyles.stepBox}
                        draggable={false}
                        key={`aspect-key-${element.node.title}`}
                    >
                        <h3>{element.node.title}</h3>
                        <div className={workStyles.carouselMedia}>
                            <Img
                                className={workStyles.carouselImage}
                                fixed={element.node.image.fixed}
                                draggable={false}
                                style={imageStyle}
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
    const boxScrollTransformE = {
        transform: `translateY(-${100 - (scrollY / 15)}px)`,
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
            <div className={workStyles.hiddenOutline} style={boxScrollTransformE}>
                <h1 unselectable="on">The things</h1>
                <h1 unselectable="on">we could</h1>
                <h1 unselectable="on">create..!?</h1>
            </div>
        </section>
    )
}

export default Work
