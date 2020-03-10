import React from 'react'
import Maps from './addons/Maps'
import useMetaData from '../custom-hooks/useMetaData'
import footerStyles from './footer.module.scss'

const Footer = props => {
    const meta = useMetaData()
    return (
        <footer className={footerStyles.footer}>
            <div className={footerStyles.mapBox}>
                <Maps
                    apiKey={meta.site.siteMetadata.mapsKey}
                    lat={47.497865}
                    lng={19.053597}
                />
            </div>
            <div className={footerStyles.footerBox}>
                <p>Richard Lenkovits</p>
                <p>Copyright 2020</p>
            </div>
        </footer>
    )
}

export default Footer
