"use client"
import React, { useRef } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import ReactPlayer from 'react-player';
import "./react-player.css";
import { ISection } from '@/app/interfaces/courses';
import ConfirmationModal from '@leafygreen-ui/confirmation-modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { IoPersonSharp } from "react-icons/io5";

interface ReactPlayerProps {
  selectedVideo: string;
  sections: ISection[];
  cancelQuiz: () => void;
  openQuiz: () => void;
  open: boolean;
  handleVideoEnd: () => void;
  handleDuration: (duration: number) => void;
  HideSidebar: boolean;
  viewSidebar: () => void;
  playerRef: React.MutableRefObject<ReactPlayer | null>;
}

function VideoPlayer({
  playerRef,
  selectedVideo,
  sections,
  cancelQuiz,
  openQuiz,
  open,
  handleVideoEnd,
  handleDuration,
  HideSidebar,
  viewSidebar
}: ReactPlayerProps) {


 
  
  return (
    <div>
      <div className="player-wrapper" style={{ width: '100%' }}>
        <div className='arrow'>
          <FaArrowLeft onClick={viewSidebar} style={!HideSidebar ? { fontSize: "25px", cursor: "pointer" } : { display: "none" }} />
        </div>
        <ReactPlayer
          url={selectedVideo}
          playing={true}
          controls={true}
          onEnded={handleVideoEnd}
          className="react-player"
          width='100%'
          onDuration={handleDuration}
          height='100%'
          ref={playerRef}
        />
        <div className="details" style={{ fontSize: "large" }}>
        <h2 className="description">{sections[0]?.modules[0]?.videos[0].title}</h2>
        <Tabs >
    <TabList default={false}>
   <div className = "tabs_header-container">
   <Tab>Overview</Tab>
      <Tab 

      >Transcipt</Tab>
      <Tab>Notes</Tab>
      <Tab>Comments</Tab>
   </div>
    </TabList>

    <TabPanel
   className="instructor"
    >
    <p className="instructor">{sections[0]?.modules[0]?.videos[0].description && "Instructor: John Smith"}</p>
          <p className="description">{sections[0]?.modules[0]?.videos[0].description}</p>
    </TabPanel>
    <TabPanel>
    <p className="instructor">{sections[0]?.modules[0]?.videos[0].description && "Instructor: John Smith"}</p>
          <p className="description">{sections[0]?.modules[0]?.videos[0].description}</p>
    </TabPanel>
    <TabPanel>
    <p className="instructor">{sections[0]?.modules[0]?.videos[0].description && "Instructor: John Smith"}</p>
          <p className="description">{sections[0]?.modules[0]?.videos[0].description}</p>
    </TabPanel>
    <TabPanel>
      <div className='comment-container'>
        <div className='person-container'>
          <IoPersonSharp/> Kwanele Ndaba
          </div>

      <div >
        <input className = "comment-input"  type = "text" placeholder='No commnets yet, but your classmates might have questions too! Leave a comment to start a discussion and help each other out.' />
        </div>

        <div className= "btn-container_icons">
          <button>
            Comment
          </button>
        </div>








<div className="instructor">
<p className="instructor">{sections[0]?.modules[0]?.videos[0].description && "Instructor: John Smith"}</p>
          <p className="description">{sections[0]?.modules[0]?.videos[0].description}</p>
</div>
          </div>
    </TabPanel>
  </Tabs>
          
        </div>
      </div>
      <ConfirmationModal
        open={open}
        onConfirm={openQuiz}
        onCancel={cancelQuiz}
        title="Congratulations"
        buttonText="Take Quiz"
      >
        Thank you for completing the video, We have attached a quiz to rate your understanding of the module. Please click Take Quiz or cancel.
      </ConfirmationModal>
    </div>
  )
}

export default VideoPlayer;
