import { get } from "../utils";

const YOUTUBE_API_KEY ="AIzaSyAyrVKmrVeocdq0AN3PdFcnToQ_HsIkC1k";
const YOUTUBE_CAPTIONS_API_URL = 'https://www.googleapis.com/youtube/v3/captions';
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/videos';


export const fetchVideoMetadata = async (videoId:string) => {
  try {
    const response = await fetch(`${YOUTUBE_API_URL}?part=snippet,contentDetails,statistics&id=${videoId}&key=${YOUTUBE_API_KEY}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.items[0];
  } catch (error) {
    console.error('Error fetching video metadata:', error);
    return null;
  }
};

export const fetchCaptionTracks = async (videoId:string, accessToken:string) => {
  try {
    const response = await fetch(`${YOUTUBE_CAPTIONS_API_URL}?part=snippet&videoId=${videoId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error('Error fetching caption tracks:', error);
    return null;
  }
};

export const fetchCaptions = async (captionId:string, accessToken:string) => {
  try {
    const response = await fetch(`${YOUTUBE_CAPTIONS_API_URL}/${captionId}?tfmt=srt`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const captions = await response.text();
    return captions;
  } catch (error) {
    console.error('Error fetching captions:', error);
    return null;
  }
};
