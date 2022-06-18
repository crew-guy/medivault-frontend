import React from 'react'
import textLogoDark from '@images/text-logo-dark.svg'

const NotAuthenticatedScreen = () => {
    return (
        <div className="preloader-screen">
            <img src={textLogoDark} alt="farmako medical history screen" />
            <p>You are not authenticated. Kindly login with a valid URL to view your records</p>
        </div>
    )
}

export default NotAuthenticatedScreen
