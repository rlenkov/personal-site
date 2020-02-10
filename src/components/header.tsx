import React from 'react'

import headerStyles from './header.module.scss'

interface Props {
    siteTitle: string
}

const Header = ({ siteTitle }: Props) => (
    <header className={headerStyles.header}>
        <div className={headerStyles.menuBox}>
            <strong>One</strong>
            <strong>Two</strong>
            <strong>Three</strong>
        </div>
    </header>
)

export default Header
