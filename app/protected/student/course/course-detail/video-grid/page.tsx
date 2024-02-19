import React from 'react';
import '../videoGrid.css'

const VideoGrid = (videos:any) => {
   // console.log("videos", videos.videos)
  return (
    // <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
    //   {
    //   videos.videos.map((video:any, index:number) => (
           
    //         video?.modules.map((x:any,i:number) => {
    //                <div>
    //                   {
    //                       x?.map((video:any) => (
    //                         <>
    //                         <span className="text-muted">{video.duration}</span> 
    //                         <a className="flex" style={{cursor:"pointer", paddingLeft:"1em"}}  onClick={()=>()}>
    //                         {video.title}
    //                         </a>
    //                         </>
                    
    //                     ))
    //                 }
    //         </div>
                        
                          
                
    //                }
    //         )     

           
    //         ))
    //     }
    // </div>
   <>
  {videos?.videos.map((video: any, index: number) => (
    video?.modules.map((x: any, i: number) => (
      <div key={i}>
        {
        x?.videos.map((video: any, j: number) => (
             
    <div style={{ display: 'flex', flexWrap: 'wrap'}}>
            <div className="video-card">
            <span className="text-muted">{video.duration}</span> 
            <a className="flex" style={{ cursor: "pointer", paddingLeft: "1em" }} onClick={() => {}}>
              {video.title}
            </a>
          </div>
          </div>
        ))}
      </div>
    
    ))
  ))}
  </>
  );
};

export default VideoGrid;
