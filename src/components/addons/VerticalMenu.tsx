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
        <div className={styles.menuBox}>
            <div className={styles.menuOptionsBox}>
                <div
                    className={getStyleFor('hero')}
                    onClick={() => {
                        props.setPage('hero')
                        navigate('/#hero')
                    }}
                />
                <div
                    className={getStyleFor('work')}
                    style={{ top: '20px' }}
                    onClick={() => {
                        props.setPage('work')
                        navigate('/#work')
                    }}
                />
                <div
                    className={getStyleFor('portfolio')}
                    style={{ top: '40px' }}
                    onClick={() => {
                        props.setPage('portfolio')
                        navigate('/#portfolio')
                    }}
                />
                <div
                    className={getStyleFor('about')}
                    style={{ top: '60px' }}
                    onClick={() => {
                        props.setPage('about')
                        navigate('/#about')
                    }}
                />
                <div
                    className={getStyleFor('contact')}
                    style={{ top: '80px' }}
                    onClick={() => {
                        props.setPage('contact')
                        navigate('/#contact')
                    }}
                />
            </div>
        </div>
    )
}

export default VerticalMenu
