import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { ScrollProvider } from '../context/scrollContext'
import useScroll from '../custom-hooks/useScroll'

import Header from './header'
import Footer from './footer'
import VerticalMenu from './addons/VerticalMenu'
import './layout.css'

interface Props {
    children?: any
}

const Layout = ({ children }: Props) => {
    const { scrollY } = useScroll()
    const [localElements, setLocalElements] = useState(null)
    const [localPage, setLocalPage] = useState('hero')

    const pageSetter = page => {
        if (!page) {
            return
        }
        const pages = ['hero', 'work', 'portfolio', 'about', 'contact']
        if (localPage !== page && pages.includes(page)) {
            setLocalPage(page)
        }
    }

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

    if (localElements) {
        localElements.forEach(element => {
            pageSetter(element.id)
        })
    }

    return (
        <React.Fragment>
            <Header siteTitle={data.site.siteMetadata.title} />
            <ScrollProvider value={scrollY}>
                <VerticalMenu setPage={pageSetter} page={localPage} />
                <main>{children}</main>
            </ScrollProvider>
            <Footer />
        </React.Fragment>
    )
}

export default Layout
