import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { ScrollProvider } from '../context/scrollContext'
import useScroll from '../custom-hooks/useScroll'
import useWindowSize from '../custom-hooks/useWindowSize'

import Header from './header'
import Footer from './footer'
import VerticalMenu from './addons/VerticalMenu'
import './layout.css'

interface Props {
    children?: any
}

const Layout = ({ children }: Props) => {
    const { scrollY } = useScroll()
    const size = useWindowSize()
    const [localElements, setLocalElements] = useState(null)
    const [localPage, setLocalPage] = useState('hero')
    const [isPageDark, setIsPageDark] = useState(true)

    const pageSetter = page => {
        if (!page) {
            return
        }
        const pages = ['hero', 'work', 'about', 'contact']
        if (localPage !== page && pages.includes(page)) {
            setLocalPage(page)
        }
    }

    const isClient = typeof window === 'object' && typeof document === 'object'
    useEffect(() => {
        if (!isClient) {
            return false
        }
        let pointHeight = 50
        if (size.height) {
            pointHeight = size.height / 2
        }
        const element = document.elementsFromPoint(0, pointHeight)

        setLocalElements(element)
    }, [scrollY])

    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `)

    const getColorFromElements = elements => {
        let color = null
        const isClient =
            typeof window === 'object' && typeof document === 'object'
        if (elements && isClient) {
            elements.forEach(element => {
                const possibleColor = document.defaultView.getComputedStyle(
                    element,
                    null
                )['background-color']
                if (possibleColor !== 'rgba(0, 0, 0, 0)') {
                    color = possibleColor
                }
            })
            return color
        }
    }

    const isDark = color => {
        let r
        let g
        let b
        if (!color) {
            return true
        }
        // Check the format of the color, HEX or RGB?
        if (color.match(/^rgb/)) {
            // If HEX --> store the red, green, blue values in separate variables
            color = color.match(
                /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
            )

            r = color[1]
            g = color[2]
            b = color[3]
        } else {
            // If RGB --> Convert it to HEX: http://gist.github.com/983661
            color = +(
                '0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&')
            )

            r = color >> 16
            g = (color >> 8) & 255
            b = color & 255
        }
        // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
        const hsp = Math.sqrt(
            0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b)
        )
        // Using the HSP value, determine whether the color is light or dark
        if (hsp > 127.5) {
            // console.log('light')
            return false
        }
        // console.log('dark')
        return true
    }

    useEffect(() => {
        if (localElements) {
            localElements.forEach(element => {
                pageSetter(element.id)
            })
            const lightState = isDark(getColorFromElements(localElements))
            if (lightState !== isPageDark) {
                setIsPageDark(lightState)
            }
        }
    }, [localElements])

    return (
        <React.Fragment>
            <Header siteTitle={data.site.siteMetadata.title} />
            <ScrollProvider value={scrollY}>
                <VerticalMenu
                    setPage={pageSetter}
                    page={localPage}
                    isDark={isPageDark}
                />
                <main>{children}</main>
            </ScrollProvider>
            <Footer />
        </React.Fragment>
    )
}

export default Layout
