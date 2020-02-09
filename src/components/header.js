import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import headerStyles from './header.module.scss'

const Header = ({ siteTitle }) => (
    <header className={headerStyles.header}>
        <div className={headerStyles.menuBox}>
            <strong>One</strong>
            <strong>Two</strong>
            <strong>Three</strong>
        </div>
    </header>
)

Header.propTypes = {
    siteTitle: PropTypes.string,
}

Header.defaultProps = {
    siteTitle: ``,
}

export default Header
