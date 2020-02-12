import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { ScrollProvider } from '../context/scrollContext'
import useScroll from '../custom-hooks/useScroll'

import Header from './header'
import Footer from './footer'
import './layout.css'

interface Props {
    children?: any
}

const Layout = ({ children }: Props) => {
    const { scrollX, scrollY, scrollDirection } = useScroll()
    const [localElements, setLocalElements] = useState(null)

    const isClient = typeof window === 'object' && typeof document === 'object'
    useEffect(() => {
        if (!isClient) {
            return false
        }

        const element = document.elementsFromPoint(0, 50)

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

    return (
        <React.Fragment>
            <Header siteTitle={data.site.siteMetadata.title} />
            <ScrollProvider value={scrollY}>
                <main>{children}</main>
            </ScrollProvider>
            <Footer />
        </React.Fragment>
    )
}

export default Layout
