// src/components/VideoSidebar.js

import React from 'react';
import './videoSidebar.css';

const VideoSidebar = ({ sections, onVideoSelect }: { sections: any, onVideoSelect:Function }) => {
  console.log("sessions", sections)
  return (
    <div className="video-sidebar">
      {sections?.map((sec: any, index: number) => {
        return (
          <div key={index} className="section">
            {
              sec?.modules.map((module:any,ind:number) => {
                return (
                  <div key={ind}>
                    <h3>{sec?.title}</h3>
                    <ul>
                      {module?.videos.map((video: any, videoIndex:number) => (
                        <li key={videoIndex}>
                          <div className="video-item" onClick={() => onVideoSelect(video)}>
                            {/* <img src={video.thumbnailImage} alt={`Thumbnail for ${video.thumbnailImage}`} /> */}
                            <i className="material-icons">format_indent_increase</i>
                            <div className="video-info">
                              <a href={video?.url}>{video?.title}</a>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })
            }

          </div>
        )
      }
      )}
    </div>
  );
};

export default VideoSidebar;
