import React, { useEffect } from 'react'
import { navigate } from 'gatsby'

const NotFoundPage = () => {
    useEffect(() => {
        navigate('/')
    }, [])

    return (
        <div>
            <p>Redirecting...</p>
        </div>
    )
}

export default NotFoundPage
