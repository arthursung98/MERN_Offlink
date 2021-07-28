import React from 'react'
import backgroundPic from '../../../images/shibuya2.jpg'

function LandingPage() {
    return (
        <div>
            <div style={{
            background: `linear-gradient(to bottom, rgba(0,0,0,0)
            39%,rgba(0,0,0,0)
            41%,rgba(0,0,0,0.65)
            100%), url('${backgroundPic}'), #1c1c1c`, 
                height: '90vh',
                backgroundSize: '100%, cover',
                backgroundPosition: 'center',
                width: '100%',
                position: 'relative'
            }}>
                {/* Intro div, on top of the background photo.*/}
            </div>
        </div >
    )
}

export default LandingPage
