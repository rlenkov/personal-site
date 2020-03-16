import React, { useEffect, useState } from 'react'
import Illustration from '../../assets/undraw_investment.svg'
import welcomeStyles from './welcome.module.scss'

interface Props {
    runOpen?: boolean
}

const Welcome = ({ runOpen }: Props) => {
    const [showed, setShowed] = useState(false)

    useEffect(() => {
        const isClient =
            typeof window === 'object' && typeof document === 'object'
        if (isClient) {
            document.body.style.overflow = 'hidden'
            document.body.style.height = '100vh'
        }
        const timer = setTimeout(() => {
            setShowed(true)
            document.body.style.overflow = 'visible'
            document.body.style.height = 'unset'
        }, 3000)
        return () => {
            clearTimeout(timer)
        }
    }, [runOpen])

    const getStateOfComponent = () => {
        if (showed) {
            return welcomeStyles.welcomeContainerGone
        }
        if (runOpen) {
            return welcomeStyles.welcomeContainerSlide
        }
        return welcomeStyles.welcomeContainer
    }

    return (
        <section className={getStateOfComponent()}>
            <div className={runOpen ? welcomeStyles.svgBox : welcomeStyles.svgBoxGone}>
                <Illustration className={welcomeStyles.svgComponent} />
            </div>
            <div
                className={
                    runOpen
                        ? welcomeStyles.welcomeMessageBox
                        : welcomeStyles.welcomeMessageBoxGone
                }
            >
                <h1>Need a solution</h1>
                <h1>from development</h1>
                <h1>to delivery?</h1>
            </div>
        </section>
    )
}

export default Welcome
