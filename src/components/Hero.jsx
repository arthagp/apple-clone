import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'
import { heroVideo, smallHeroVideo } from '../utils'

const Hero = () => {
  const initialize = window.innerWidth > 760 ? heroVideo : smallHeroVideo // window.innerWidth ini di gunakan untuk mengecek jendela browser saat ini 
  const [videoSrc, setVideoSrc] = React.useState(initialize)

  const handleVideoSetSrc = () => {
    if (window.innerWidth > 760) {
      setVideoSrc(heroVideo)
    } else {
      setVideoSrc(smallHeroVideo)
    }
  }


  React.useEffect(() => {
    window.addEventListener('resize', handleVideoSetSrc)

    return () => {
      window.removeEventListener('resize', handleVideoSetSrc)
    }
  }, [])

  useGSAP(() => {
    gsap.to("#hero", {
      opacity: 1,
      delay: 1.8,
      duration: 0.8
    })

    gsap.to('#cta', {
      opacity: 1,
      delay: 1.8,
      y: -50,
      duration: 0.8
    })
  }, [])
  return (
    <section className='w-full nav-height bg-black relative'>
      <div className='h-5/6 w-full flex-center flex-col '>
        <p id='hero' className='hero-title'>iPhone 15 Pro</p>
        <div className='md:w-10/12 w-9/12'>
          <video className='pointer-events-none' autoPlay muted playsInline={true} key={videoSrc}>
            <source src={videoSrc} type='video/mp4' />
          </video>
        </div>
        <div id='cta' className='flex flex-col items-center opacity-0 translate-y-20'>
          <a href="#hightlights" className='btn'>Buy</a>
          <p className='font-normal text-xl'>From $199/month or $999</p>
        </div>
      </div>
    </section>
  )
}

export default Hero