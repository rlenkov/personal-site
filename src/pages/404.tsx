import React from 'react'
import { navigate } from 'gatsby'

const NotFoundPage = () => {
    navigate('/')
    return (
        <div>
            <p>Redirecting...</p>
        </div>
    )
}

export default NotFoundPage
