import React, { useEffect, useRef, useState } from 'react'
import { GrLinkPrevious } from "react-icons/gr";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { BiSkipPrevious  } from "react-icons/bi";
import { BiPlay } from "react-icons/bi";

import { BiSkipNext  } from "react-icons/bi";
import { BiPause } from "react-icons/bi";

import FindingHer from '../assets/songs/FindingHer.mp3';
import Haseen from '../assets/songs/Haseen.mp3';
import Zaalima from '../assets/songs/Zaalima.mp3';
import itnaNaMujhse from '../assets/songs/itnaNaMujhse.mp3';
import Jhol from '../assets/songs/Jhol.mp3';
import Maand from '../assets/songs/Maand.mp3';
import OMaahi from '../assets/songs/OMaahi.mp3';
import PalPal from '../assets/songs/PalPal.mp3';
import haseencover from '../assets/covers/haseen.jpg'
import itnanacover from '../assets/covers/itnanaMujhse.jpg'
import jholcover from '../assets/covers/jhol.jpg'
import nocover from '../assets/covers/nocover.jpeg'
import palpalcover from '../assets/covers/palpal.jpg'
import zaalimacover from '../assets/covers/zaalima.jpg'

const Card = ({isplay, setisplay}) => {

  const [currentIndex, setcurrentIndex] = useState(0);

  const [currentTime, setcurrentTime] = useState()

  const [duration, setduration] = useState()


  const songs = [
    {title: "Finding Her", url: FindingHer, cover: nocover},
    {title: "Haseen", url: Haseen, cover: haseencover},
    {title: "Itna Na Mujhse", url: itnaNaMujhse, cover: itnanacover},
    {title: "Jhol", url: Jhol, cover: jholcover},
    {title: "Maand", url: Maand, cover: nocover},
    {title: "O Maahi", url: OMaahi, cover: nocover},
    {title: "Pal Pal", url: PalPal, cover: palpalcover},
    {title: "Zaalima", url: Zaalima, cover: zaalimacover}
  ]
  const audioRef = useRef()

  const handlePlayPause = () => {
    if(isplay) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
      setisplay(!isplay)
  }

  const handleNext = () => {
    setcurrentIndex((prev) => (prev +1)%songs.length)
    setisplay(true);

  }

  const handlePrev = () => {
    setcurrentIndex((prev) => (prev - 1 % songs.length) % songs.length)
    setisplay(true);
  }

  const handleSeek = (e) => {
    const seekTime = e.target.value;
    audioRef.current.currentTime = seekTime
    setcurrentTime(seekTime)
  }

  const formatTime = (time) => {
    if(!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time/60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0")
    return `${minutes}:${seconds}`

  }

  const handleLoadedMetaData = () => {
    setduration(audioRef.current.duration)
  }
  
   const handleTimeUpdate = () => {
    setcurrentTime(audioRef.current.currentTime);
  };


  useEffect(() => {
    if (isplay && audioRef.current) {
    audioRef.current.play()
  }
  }, [currentIndex, isplay])
  

  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] h-[65vh] w-[25vw]  rounded-3xl overflow-hidden
    bg-white/10 border border-white/20 backdrop-blur-lg shadow-xl text-white'>
      <div className="flex items-center justify-between px-5 py-5 w-full">
        <span>
          <GrLinkPrevious size={"20"} color='white'/>
        </span>
        <span className='flex items-center bg-white/15 px-2 py-2 rounded-full'>
          <IoIosSearch size={25}/>
          <input type="text" className='outline-none border-none px-2 text-sm font-semibold  text-white bg-transparent' placeholder='Search Song...' />
        </span>
        <span>
        <RxHamburgerMenu size={"25"} color='white'/>
        </span>
      </div>

      <div className='bg-yellow-300 h-[170px] w-[170px] absolute top-[35%] left-1/2 -translate-x-[50%] -translate-y-[50%] rounded-xl overflow-hidden bg-cover' style={{backgroundImage: `url(${songs[currentIndex].cover})`}}>
          
      </div>

      <div className='absolute top-[57%] left-1/2 -translate-x-[50%] -translate-y-[50%]'>
        <h3 className='text-xl font-semibold'>{songs[currentIndex].title}</h3>
      </div>

      <div>
        <div className='flex items-center justify-between w-[70%] absolute top-[75%] left-1/2 -translate-x-[50%] -translate-y-[50%] text-sm font-semibold '>
          <p>{formatTime(currentTime)}</p>
          <p>{formatTime(duration)}</p>
        </div>
        <div className='flex items-center justify-center absolute w-full top-[80%]'>
          <input type="range" name="" id="" min="0" max={duration} value={currentTime} onChange={handleSeek} className='custom-range w-[80%] accent-white' />
        </div>
      </div>

      <div className='absolute top-[90%] left-1/2 -translate-x-[50%] -translate-y-[50%] flex items-center gap-4'>
        <button onClick={handlePrev}><BiSkipPrevious  size={40}/></button>
        {isplay ? (
          <button onClick={handlePlayPause}>
            <BiPause size={40} />
          </button>
        ) : (
          
          <button onClick={handlePlayPause}>
            <BiPlay  size={40} />
            </button>
        ) }
        <button onClick={handleNext}>
          <BiSkipNext size={40} />
        </button>
      </div>
      <audio ref={audioRef} src={songs[currentIndex].url}
       onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetaData}
        onEnded={handleNext}
        ></audio>
    </div>
  )
}

export default Card
