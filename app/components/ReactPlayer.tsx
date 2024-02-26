"use client"
import { ISection } from '@/app/interfaces/courses'
import ConfirmationModal from '@leafygreen-ui/confirmation-modal'
import React from 'react'
import ReactPlayer from 'react-player'

interface ReactPlayerProps {
  selectedVideo:string
  sections : ISection[]
  cancelQuiz:() => void
  openQuiz :any
  open :any
  handleVideoEnd :() => void
  handleDuration :any
}
function VideoPlayer({selectedVideo,sections,cancelQuiz,openQuiz,open,handleVideoEnd,handleDuration}:ReactPlayerProps) {
 
  return (

        <div>

<div  className="player-wrapper " style={{ width: '100%',  }}>
      <ReactPlayer
        url={selectedVideo}
        playing={true}
        controls={true}
        onEnded={handleVideoEnd}
        className="react-player"
        width='100%'
        onDuration={handleDuration}
        height='100%'
      />

<div className="details" 
style={{fontSize:"large", paddingLeft:"1px"}}>
        {<h2>{sections[0]?.competency}</h2>}
        { <p className="instructor">Instructor:John Smith</p> }
        { <p className="description">{sections[0]?.modules[0]?.videos[0].description}</p> }
      </div>
      </div>
          

         <ConfirmationModal
        open={open}
        onConfirm={() => openQuiz()}
        onCancel={cancelQuiz}
        title="Congratulations"
        buttonText="Take Quiz"
      >
        Thank you for completing the video, We have attached a quiz to rate your understading of the module. Please click Take Quiz or cancel.
      </ConfirmationModal>
    
    </div>

  )
}

export default VideoPlayer
