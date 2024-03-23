import React from 'react'
import { hightlightsSlides } from '../constants'
import gsap from 'gsap'
import { pauseImg, playImg, replayImg } from '../utils'
import { useGSAP } from '@gsap/react'

const VideoCarousel = () => {
    const videoRef = React.useRef([])
    const videoSpanRef = React.useRef([])
    const videoDivRef = React.useRef([])
    const [loadedData, setLoadedData] = React.useState([])

    const [video, setVideo] = React.useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false,
    });


    const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

    useGSAP(() => {
        // slider animation to move the video out of the screen and bring the next video in
        gsap.to("#slider", {
            transform: `translateX(${-100 * videoId}%)`,
            duration: 2,
            ease: "power2.inOut", // show visualizer https://gsap.com/docs/v3/Eases
        });

        // video animation to play the video when it is in the view
        gsap.to("#video", {
            scrollTrigger: {
                trigger: "#video",
                toggleActions: "restart none none none",
            },
            onComplete: () => {
                setVideo((pre) => ({
                    ...pre,
                    startPlay: true,
                    isPlaying: true,
                }));
            },
        });
    }, [isEnd, videoId]);

    React.useEffect(() => {
        if (loadedData.length > 3) {
            if (!isPlaying) {
                // console.log('pause')
                videoRef.current[videoId].pause();
            } else {
                // console.log('play')
                startPlay && videoRef.current[videoId].play();
            }
        }
    }, [startPlay, videoId, isPlaying, loadedData]);

    const handleProcess = (type, i) => {
        switch (type) {
            case "video-end":
                setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
                break;

            case "video-last":
                setVideo((pre) => ({ ...pre, isLastVideo: true }));
                break;

            case "video-reset":
                setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false }));
                break;

            case "pause":
                setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
                break;

            case "play":
                setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
                break;

            default:
                return video;
        }
    };

    const handleLoadedMetaData = (index, event) => setLoadedData((prevState) => [...prevState, event]);


    React.useEffect(() => {
        let currentProgress = 0
        let span = videoSpanRef.current

        if (span[videoId]) {
            // animation to move the indicator
            let anim = gsap.to(span[videoId], {
                onUpdate: () => {
                    // get the progress of the video
                    const progress = Math.ceil(anim.progress() * 100);

                    if (progress != currentProgress) {
                        currentProgress = progress;

                        // set the width of the progress bar
                        gsap.to(videoDivRef.current[videoId], {
                            width:
                                window.innerWidth < 760
                                    ? "10vw" // mobile
                                    : window.innerWidth < 1200
                                        ? "10vw" // tablet
                                        : "4vw", // laptop
                        });

                        // set the background color of the progress bar
                        gsap.to(span[videoId], {
                            width: `${currentProgress}%`,
                            backgroundColor: "white",
                        });
                    }
                },

                // when the video is ended, replace the progress bar with the indicator and change the background color
                onComplete: () => {
                    if (isPlaying) {
                        gsap.to(videoDivRef.current[videoId], {
                            width: "12px",
                        });
                        gsap.to(span[videoId], {
                            backgroundColor: "#afafaf",
                        });
                    }
                },
            });

            if (videoId == 0) {
                anim.restart();
            }

            // update the progress bar
            const animUpdate = () => {
                anim.progress(
                    videoRef.current[videoId].currentTime /
                    hightlightsSlides[videoId].videoDuration
                );
            };

            if (isPlaying) {
                // ticker to update the progress bar
                gsap.ticker.add(animUpdate);
            } else {
                // remove the ticker when the video is paused (progress bar is stopped)
                gsap.ticker.remove(animUpdate);
            }
        }
    }, [videoId, startPlay])

    return (
        <>
            <div className='flex items-center'>
                {hightlightsSlides.map((list, index) => (
                    <div key={index} id='slider' className='sm:pr-20 pr-10'>
                        <div className='video-carousel_container'>
                            <div className='w-full h-full flex-center rounded-3xl overflow-hidden bg-black'>
                                <video
                                    id='video'
                                    playsInline={true}
                                    preload='auto'
                                    className={`${list.id === 2 && "translate-x-44"
                                        } pointer-events-none`}
                                    muted
                                    ref={(el) => (videoRef.current[index] = el)}
                                    onEnded={() =>
                                        index !== 3 // untuk continue ketika video sudah selesai dan ketika index masuk ke 4 wich is last video.
                                            ? handleProcess("video-end", index)
                                            : handleProcess("video-last")
                                    }
                                    onPlay={() => {
                                        setVideo((prevVideo) => ({
                                            ...prevVideo, isPlaying: true
                                        }))
                                    }}
                                    onLoadedMetadata={(e) => handleLoadedMetaData(index, e)}
                                >
                                    <source src={list.video} type='video/mp4' />
                                </video>
                            </div>

                            <div className='absolute top-12 left-[5%] z-10'>
                                {list.textLists.map((text, index) => (
                                    <div key={index}>
                                        <p className='md:text-2xl text-xl font-medium'>{text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='relative flex-center mt-10'>
                <div className='flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full'>
                    {videoRef.current.map((_, index) => (
                        <span
                            key={index}
                            ref={(el) => (videoDivRef.current[index] = el)}
                            className='mx-2 w-3 h-3 bg-gray-200 rounded-full relative'>
                            <span
                                ref={(el) => (videoSpanRef.current[index] = el)}
                                className='absolute w-full h-full rounded-full'
                            />
                        </span>
                    ))}
                </div>

                <button className="control-btn">
                    <img
                        src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
                        alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
                        onClick={
                            isLastVideo
                                ? () => handleProcess("video-reset")
                                : !isPlaying
                                    ? () => handleProcess("play")
                                    : () => handleProcess("pause")
                        }
                    />
                </button>
            </div >

        </>
    )
}

export default VideoCarousel