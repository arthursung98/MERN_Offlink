import React from 'react'
import backgroundPic from '../../../images/shibuya2.jpg'
import './LandingPage.css'
import { Button } from 'antd'

function LandingPage() {
    return (
        <div style={{
            background: `linear-gradient(to bottom, rgba(0,0,0,0)
                39%,rgba(0,0,0,0)
                41%,rgba(0,0,0,0.65)
                100%),
                url('${backgroundPic}'), #1c1c1c`,
            backgroundSize: '100%, cover',
            backgroundPosition: 'center,center',
            height: '90vh',
            width: '100%',
            position: 'relative',
            zIndex: '1'
        }}>
            <div className="landing_intro">
                <p className="landing_slogan">Professional Becomes Personal</p>
                <p class="landing_description">
                    Did you know there are more than 100,000 engineers in Silicon Valley alone?
                </p>
                <p class="landing_description">
                    If you're in a large city, your colleagues are all around you.
                    Offlink will connect you in real life not just with hobbies, but profession.</p>
                <div className="landing_button">
                    <Button 
                    type="primary" 
                    size="large" 
                    href="/">
                        Let's Get Started!
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
