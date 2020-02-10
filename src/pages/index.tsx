import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Hero from '../components/pages/hero'
import Work from '../components/pages/work'
import Portfolio from '../components/pages/portfolio'
import About from '../components/pages/about'
import Contact from '../components/pages/contact'

const IndexPage = () => (
    <Layout>
        <SEO title="Home" />
        <Hero />
        <Work />
        <Portfolio />
        <About />
        <Contact />
    </Layout>
)

export default IndexPage
