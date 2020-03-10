import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby'

import styles from './verticalMenu.module.scss'

const VerticalMenu = props => {
    const getStyleFor = page => {
        if (page === props.page) {
            return styles.clickStickActive
        }
        return styles.clickStick
    }

    return (
        <div className={props.isDark ? styles.menuBox : styles.menuBoxLight}>
            <div className={styles.menuOptionsBox}>
                <div
                    className={getStyleFor('hero')}
                    onClick={() => {
                        props.setPage('hero')
                        navigate('/#hero')
                    }}
                >
                    <span>hero</span>
                </div>
                <div
                    className={getStyleFor('work')}
                    style={{ top: '40px' }}
                    onClick={() => {
                        props.setPage('work')
                        navigate('/#work')
                    }}
                >
                    <span>work</span>
                </div>
                <div
                    className={getStyleFor('about')}
                    style={{ top: '80px' }}
                    onClick={() => {
                        props.setPage('about')
                        navigate('/#about')
                    }}
                >
                    <span>about</span>
                </div>
                <div
                    className={getStyleFor('contact')}
                    style={{ top: '120px' }}
                    onClick={() => {
                        props.setPage('contact')
                        navigate('/#contact')
                    }}
                >
                    <span>contact</span>
                </div>
            </div>
        </div>
    )
}

export default VerticalMenu
