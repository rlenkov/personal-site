import React, { useState } from 'react'
import Img from 'gatsby-image'
import Carousel from 'react-multi-carousel'
import styles from './carousel.module.scss'
import 'react-multi-carousel/lib/styles.css'

export const CustomDot = ({
    index,
    onClick,
    active,
    carouselState: { currentSlide },
    isInverted,
}) => {
    const activeStyle = isInverted
        ? styles.activeButtonInverted
        : styles.activeButton
    const passiveStyle = isInverted
        ? styles.inactiveButtonInverted
        : styles.inactiveButton
    return (
        <span
            onClick={e => {
                onClick()
                e.preventDefault()
            }}
            className={active ? activeStyle : passiveStyle}
        ></span>
    )
}

export const CustomLeftArrow = ({ isMouseOver, onClick }) => {
    return (
        <i
            onClick={() => onClick()}
            className={
                isMouseOver
                    ? styles.customLeftArrow
                    : styles.customLeftArrowHidden
            }
        />
    )
}
export const CustomRightArrow = ({ isMouseOver, onClick }) => {
    return (
        <i
            className={
                isMouseOver
                    ? styles.customRightArrow
                    : styles.customRightArrowHidden
            }
            onClick={() => onClick()}
        />
    )
}

export const CustomCarousel = props => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: props.itemsOnLargeDesktop || 1,
            partialVisibilityGutter: props.partialVisibilityGutter || 0,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: props.itemsOnDesktop || 1,
            partialVisibilityGutter: props.partialVisibilityGutter || 0,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: props.itemsOnTablet || 1,
            partialVisibilityGutter: props.partialVisibilityGutter || 0,
        },
        mobile: {
            breakpoint: { max: 664, min: 0 },
            items: props.itemsOnMobile || 1,
            partialVisibilityGutter: props.partialVisibilityGutter || 0,
        },
    }

    return (
        <div className={props.carouselContainer || styles.carouselContainer}>
            <Carousel
                responsive={responsive}
                swipeable
                draggable
                keyBoardControl
                showDots
                renderDotsOutside
                customDot={<CustomDot isInverted={props.isInverted} />}
                customLeftArrow={<CustomLeftArrow isMouseOver={props.isMouseOver} />}
                customRightArrow={<CustomRightArrow isMouseOver={props.isMouseOver} />}
                containerClass={props.containerClass || styles.containerClass}
                itemClass={props.itemClass || styles.itemClass}
                sliderClass={props.sliderClass || styles.sliderClass}
                minimumTouchDrag={10}
                autoPlay={props.autoPlay}
                autoPlaySpeed={props.autoPlaySpeed}
                infinite={props.infinite}
            >
                {props.children}
            </Carousel>
        </div>
    )
}

CustomCarousel.defaultProps = {
    isInverted: false,
    isMouseOver: true,
    autoPlay: false,
    autoPlaySpeed: 0,
    infinite: false,
}

export default CustomCarousel
