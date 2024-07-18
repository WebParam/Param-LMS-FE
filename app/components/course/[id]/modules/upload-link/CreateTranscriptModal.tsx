"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { createParaphrase } from "@/app/lib/actions/paraphrase";
import { useParams, useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";
import { fetchCaptionTracks, fetchCaptions, fetchVideoMetadata } from "@/app/lib/actions/transcript";

function CreateTranscriptModal(props: any) {
  const { id, moduleId, documentId } = useParams<{
    id: string;
    moduleId: string;
    documentId: string;
  }>();
  const [videoId, setVideoId] = useState('iOWWmfMRqs0');
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState<any>(null);
  const [videoLink, setVideoLink] = useState("")
  const [captions, setCaptions] = useState<any>('');
  const [accessToken, setAccessToken] = useState('ya29.a0AXooCgtXa1JUkAUN3YM8fZ7r3WQPyKVs8eqxNrZKSxiLIQjwdpuPVQwn-PyB_Q-25l-qGR4ZiP7Cbq4Khdw0B-BCOJady-3Mrw7ez2lvfGo6arKAnvCnhf67t6_JTyTN3Mbufjh-Qa8B33a4rEeTG-AQXCiNr3NEGiBeaCgYKAQQSARESFQHGX2Mi2NBPhHoVVLySi2uJbeStBA0171'); // Replace with your actual access token


  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const [description, setDescription] = useState("");
  const [submitModal, setSubmitModal] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(false);
  const submmitRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const formStat = useFormStatus();
  const createParaphraseWithParams = createParaphrase.bind(
    null,
    description,
    id,
    moduleId,
    documentId,
    title
  );

  const submit = () => {
    setSubmitModal(true);
    console.log('form stat:', formStat);

    submmitRef.current?.click();
    if (titleRef.current?.value && titleRef.current?.value.length > 10) {
      setErrorSubmit(false);
      setTimeout(() => {
        setSubmitModal(false);
      }, 2000)
      props.onHide();
    } else {
      setTimeout(() => {
        setSubmitModal(false);
        setErrorSubmit(true);
      }, 3000)
    }
  }


  const handleFetchMetadata = async () => {
    const data = await fetchVideoMetadata(videoId);
    if (data) {
      setVideoData(data);
      setError(null);

      const captionTracks = await fetchCaptionTracks(videoId, accessToken);
      if (captionTracks && captionTracks.length > 0) {
        const captionsData = await fetchCaptions(captionTracks[0].id, accessToken);
        setCaptions(captionsData || 'No captions available.');
      } else {
        setCaptions('No captions available for this video.');
      }
    } else {
      setError('Failed to fetch video metadata. Please check the video ID and try again.');
      setVideoData(null);
      setCaptions('');
    }
  };


  useEffect(() => {
    handleFetchMetadata();
  }, [videoLink])
  


  return (
    <>
    
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <form action={createParaphraseWithParams}>
        <Modal.Header closeButton>
          <Modal.Title>Create Transcript</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h5>Title</h5>
            <input
              minLength={10}
              className="form-control mb-3"
              placeholder="Enter your title here..."
              name="title"
              required
              ref={titleRef}
            />
          </div>
          <div>
            <h5>Video Link</h5>
            <input
              minLength={10}
              className="form-control mb-3"
              placeholder="Enter your Video Link here. E.g https://..."
              name="videoUrl"
              value={videoLink}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => setVideoLink(e.target.value)}
              
            />
          </div>{" "}
          <div>
            <h5>Transcript</h5>
            <ReactQuill
              value={description}
              onChange={(value) => setDescription(value)}
              style={{color: '#252525'}}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
        <input type="submit" hidden ref={submmitRef} />
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button
            variant="success"
            onClick={() => submit()}
          >
            Submit
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
    
     {/* creating transcript modal */}
    <Modal 
      size="sm"
      centered
      show={submitModal}
      onHide={() => setSubmitModal(false)}
    >
      <Modal.Body>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#252525', gap: '15px'}}>
        {errorSubmit ? <div className="spinner-grow text-danger" role="status"/>:<div className="spinner-grow text-primary" role="status"/>}
        {errorSubmit ? 
        <p>Cannot create with empty field(s)</p>
        : 
        <p>
          Creating Transcript... 
        </p>
        }
      </div>
      </Modal.Body>
    </Modal>
    
    {/* error values on submit */}
    </>
  );
}
export default dynamic(() => Promise.resolve(CreateTranscriptModal), {
  ssr: false,
});
