import React from 'react'
import { Link } from 'gatsby'

import * as headerStyles from './header.module.scss'

interface Props {
    siteTitle: string
}

const Header = ({ siteTitle }: Props) => (
    <header className={headerStyles.header}>
        <div className={headerStyles.menuBox}>
            <Link
                to="/#hero"
                activeStyle={{ color: 'red' }}
                partiallyActive={true}
            >
                Home
            </Link>
            <Link
                to="/#work"
                activeStyle={{ color: 'red' }}
                partiallyActive={true}
            >
                Work
            </Link>
            <Link
                to="/#about"
                activeStyle={{ color: 'red' }}
                partiallyActive={true}
            >
                About
            </Link>
            <Link
                to="/#contact"
                activeStyle={{ color: 'red' }}
                partiallyActive={true}
            >
                Contact
            </Link>
        </div>
    </header>
)

export default Header
