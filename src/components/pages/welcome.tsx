import React, { useEffect, useState } from 'react'
import welcomeStyles from './welcome.module.scss'

interface Props {
    runOpen?: boolean
}

const Welcome = ({ runOpen }: Props) => {
    const [showed, setShowed] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowed(true)
        }, 4000)
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
