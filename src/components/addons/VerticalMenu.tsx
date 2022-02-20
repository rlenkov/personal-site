import React, { useState, useEffect, useContext } from 'react'
import smoothScroll from 'smoothscroll-polyfill'
import ScrollContext from '../../context/scrollContext'
import * as styles from './verticalMenu.module.scss'

const VerticalMenu = props => {
    const scrollY = useContext(ScrollContext)
    useEffect(() => {
        smoothScroll.polyfill()
    }, [])

    const getStyleFor = page => {
        if (page === props.page) {
            return styles.clickStickActive
        }
        return styles.clickStick
    }

    const getElementPixelLocation = elementId => {
        const isClient =
            typeof window === 'object' && typeof document === 'object'
        if (isClient) {
            const element = document.getElementById(elementId)
            if (element) {
                return element.getBoundingClientRect().top + scrollY
            }
        }
        return null
    }

    const navigateToPage = pageId => {
        const location = getElementPixelLocation(pageId)
        const isClient =
            typeof window === 'object' && typeof document === 'object'
        if (isClient && location !== null) {
            window.scroll({
                top: location,
                left: 0,
                behavior: 'smooth',
            })
        }
    }

    return (
        <div className={props.isDark ? styles.menuBox : styles.menuBoxLight}>
            <nav className={styles.menuOptionsBox}>
                <div
                    className={getStyleFor('hero')}
                    onClick={() => {
                        navigateToPage('hero')
                    }}
                >
                    <span>home</span>
                </div>
                <div
                    className={getStyleFor('work')}
                    style={{ top: '40px' }}
                    onClick={() => {
                        navigateToPage('work')
                    }}
                >
                    <span>work</span>
                </div>
                <div
                    className={getStyleFor('about')}
                    style={{ top: '80px' }}
                    onClick={() => {
                        navigateToPage('about')
                    }}
                >
                    <span>about</span>
                </div>
                <div
                    className={getStyleFor('contact')}
                    style={{ top: '120px' }}
                    onClick={() => {
                        navigateToPage('contact')
                    }}
                >
                    <span>contact</span>
                </div>
            </nav>
        </div>
    )
}

export default VerticalMenu
