import React from 'react'
import Maps from './addons/Maps'
import useMetaData from '../custom-hooks/useMetaData'
import * as footerStyles from './footer.module.scss'

const Footer = () => {
    const meta = useMetaData()
    const currentYear = new Date().getFullYear()
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
                <p>{`Copyright ${currentYear}`}</p>
            </div>
        </footer>
    )
}

export default Footer
