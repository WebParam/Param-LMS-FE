import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./transcript.css"

interface VideoTranscriptProps {
    handleTimestampClick: (time: string) => void
}

const VideoTranscript = ({ handleTimestampClick }: VideoTranscriptProps) => {

    const [transcript, setTranscript] = useState<any>([]);

    function formatTime(timeString: string) {

        const timeParts = timeString?.split(':');
        const hours = parseInt(timeParts && timeParts[0]);
        const minutes = parseInt(timeParts && timeParts[1]);
        const seconds = parseFloat(timeParts && timeParts[2]);
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = Math.floor(seconds).toString().padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }

    useEffect(() => {
        const fetchTranscript = async () => {
            try {
                const accessToken = "cca5d0ef803dac4b5746c4a378073e38";
                const response = await axios.get(`https://api.vimeo.com/videos/915091193/texttracks`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const transcriptLink = response.data.data[0]?.link;
                const transcriptResponse = await axios.get(transcriptLink);
                const lines = transcriptResponse.data.split('\n');
                const parsedTranscript: any = [];
                let combinedText = '';
                let combinedTime: any = null;
                let counter = 0;

                lines.forEach((line: string) => {
                    if (/^\d/.test(line)) {
                        if (combinedTime !== null && combinedText.trim() !== '') {
                            parsedTranscript.push({ time: combinedTime, text: combinedText.trim() });
                            combinedText = '';
                            combinedTime = null;
                        }
                        combinedTime = line.split(' --> ')[0];
                    } else if (line.trim() !== '') {
                        combinedText += (combinedText ? ' ' : '') + line.trim();
                    }
                    counter++;
                    if (counter === 5) {
                        counter = 0;
                        if (combinedTime !== null && combinedText.trim() !== '') {
                            parsedTranscript.push({ time: combinedTime, text: combinedText.trim() });
                            combinedText = '';
                            combinedTime = null;
                        }
                    }
                });
                if (combinedTime !== null && combinedText.trim() !== '') {
                    parsedTranscript.push({ time: combinedTime, text: combinedText.trim() });
                }
                if (parsedTranscript.length > 0 && parsedTranscript[0].text.includes("WEBVTT -")) {
                    parsedTranscript.shift();
                }

                const groupSize = 5;
                const groupedTranscript = [];
                for (let i = 0; i < parsedTranscript.length; i += groupSize) {
                    const group = parsedTranscript.slice(i, i + groupSize);
                    const combinedText = group.map((item: any) => item?.text).join(' ');
                    const combinedTime = group[group.length - 1]?.time;
                    groupedTranscript.push({ text: combinedText, time: combinedTime });
                }

                if (groupedTranscript.length > 0) {
                    setTranscript(groupedTranscript);
                }

            } catch (error) {
                console.error('Error fetching transcript:', error);
            }
        };
        fetchTranscript();
    }, [])


    return (
        <div>

            {transcript?.map((entry: any, index: number) => (
                <div onClick={() => handleTimestampClick(entry?.time)} className='transcript-entry' key={entry?.time}>
                    <p  >{
                        `${formatTime(entry?.time)} - ${formatTime(transcript[index + 1]?.time)}`
                    }</p>
                    <p>{entry?.text}</p>
                </div>
            ))}
        </div>
    )
}

export default VideoTranscript
