import React from 'react'
import footerStyles from './footer.module.scss'

const Footer = props => (
    <footer className={footerStyles.footer}>
        <div className={footerStyles.footerBox}>
            <p>Richard Lenkovits</p>
            <p>Copyright 2020</p>
        </div>
    </footer>
)

export default Footer
