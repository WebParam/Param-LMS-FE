'use client'
import { NextPage } from "next";
import listOfDocumentNames from "./data";
import { Modal } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import { useEffect, useState } from "react";
import { changeDocumentStatus } from "@/app/lib/actions/courseStudents";
import Cookies from "universal-cookie";

const pdfVersion = "3.10.111";
const pdfWorkerUrl = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfVersion}/pdf.worker.js`;

const TableBody: NextPage<{ list: any[] }> = ({ list }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const align = {
    section_title: "pl-48pt text-left",
    time_spent: "text-left",
    completion_rate: "text-left",
    no_of_comments: "text-center",
    points_collected: "text-center",
  };

  const router = useRouter();
  const [show, setShow] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [documentName, setDocumentName] = useState("");
  const [documentStatus, setDocumentStatus] = useState("");
  const [documentToView, setDocumentToView] = useState('');
  const [isChangingStateLoader, setIsChangingStateLoader] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const cookies = new Cookies();

  const handleShow = async (name: string, status: string) => {
      debugger;
      setDocumentName(name);
    
    setDocumentStatus(status);
    setShow(true);
  };

  async function viewDocument(docId: string) {
    console.log(docId)
    setDocumentToView(docId)
  }

  useEffect(() => {
    console.log('document list: ',list);
  }, [list])
  
  const handleClose = () => {
    setShow(false);
  };
  
  console.log('list of documents',list)
  const docsComplete = list && list.find(item => item.status == "Declined");
  cookies.set("documentsCompled", docsComplete);

  async function handleSubmit(){
    const doc =  list.find((item:any) => item.blobUrl === documentName);
    setIsChangingStateLoader(true);
    console.log('doc', list)
    const payload = {
      documentId: doc.id,
      status: documentStatus
    }
    debugger;
    const resp = await changeDocumentStatus(payload)

    if (resp) {
      setIsChangingStateLoader(false);
      setIsSuccess(true);
      setTimeout(() => {
        setShow(false)
      }, 1000)
      window.location.reload();
    }
    console.log(resp)
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{documentName.slice(0, 20)}...pdf</Modal.Title>
        </Modal.Header>
        {isChangingStateLoader ? 
        <Modal.Body>
          <div className="d-flex justify-content-center align-items-center h-100 w-100 text-dark flex-column">
            <div className="spinner-border m-3 text-dark" role="status"/>
            <p className="m-0">updating status...</p>
          </div>
        </Modal.Body>:
        <Modal.Body>
        <p style={{fontSize:'14pt', color:'#252525'}}>
          Are you sure you want to <br/>mark this document as: <span style={{fontWeight:'bold', color: `${documentStatus === 'accepted' ? 'green' : 'tomato'}`}}>{documentStatus.toLowerCase()}</span></p>
          {documentStatus == "Declined" && 
          <>
          <h3>What is your reason for this action?</h3>
          <div className="tom-select-custom" style={{ width:'80%', padding:'15px 0'}}>
            <select className="js-select form-select"
                  data-hs-tom-select-options='{
                    "placeholder": "Select a reason..."
                  }'
                style={{border:'1px solid lightgrey',outline:'none', height:'50px', width:'100%', background:'transparent', color:'#252525'}}>
              <option value="">Select a reason...</option>
              <option value="invalid document">Invalid document</option>
              <option value="wrong document type">Wrong document type</option>
              <option value="missing information">Missing information</option>
              <option value="expired document">Expired document</option>
              <option value="incorrect format">Incorrect format</option>
              <option value="illegible document">Illegible document</option>
              <option value="duplicate document">Duplicate document</option>
              <option value="unauthorized document">Unauthorized document</option>
              <option value="incomplete document">Incomplete document</option>
          </select>
          </div>
          </>}
        <div className="d-flex justify-content-end">
          <button className="btn btn-secondary mr-2" onClick={handleClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Confirm
          </button>
        </div>
        </Modal.Body>}
      </Modal>
      
      <Modal  
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered show={showDocumentModal} onHide={() => setShowDocumentModal(false)}
      >
      <Modal.Header closeButton>
        <Modal.Title>Document Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Worker workerUrl={pdfWorkerUrl}>
          <Viewer
            fileUrl={`${process.env.NEXT_PUBLIC_USER_READ_URL}/Documents/PreviewDocument/${documentToView}`}
            plugins={[defaultLayoutPluginInstance]}
          />
        </Worker>
      </Modal.Body>
    </Modal>

      <tbody className="list" id="staff">
        <tr>
          <td>
          <ul className="list-group list-group-flush">
            {
              listOfDocumentNames.map((item:any) => (
                <li className="list-group-item p-4">
                <i className="bi-house list-group-icon" /> {item.name}
              </li>
              ))
            }
          </ul>
          </td>

          <td>
          <ul className="list-group list-group-flush">
            {list?.length > 0 ?
              list?.slice(0,6).map((item:any) => (
              <li className="list-group-item p-4">
                    <i className="bi-house list-group-icon" /> {`${item.blobUrl.slice(0, 15)}... .pdf`}
              </li>
              ))
            :['no url', 'no url', 'no url', 'no url','no url','no url'].map((item:any) => (
              <li className="list-group-item p-4">
                    <i className="bi-house list-group-icon" /> {item}
              </li>
            ))}
          </ul>
          </td>
          
          <td>
          <ul className="list-group list-group-flush">
          {list?.length > 0 ?
            list?.slice(0,6).map((item:any) => (
              <li className="list-group-item p-4">
                <i className="bi-house list-group-icon" /> {item.status??'Pending Review'}
              </li>
            ))
          :['N/A', 'N/A', 'N/A', 'N/A','N/A','N/A'].map((item:any) => (
            <li className="list-group-item p-4">
                    <i className="bi-house list-group-icon" /> {item}
            </li>
          ))}
          </ul>
          </td>

          <td>
          <ul className="list-group list-group-flush">
            {list?.length > 0 ?
              list?.slice(0,6).map((item:any) => (
                <li className="list-group-item">
                    <button  onClick={() => {setDocumentToView(item.blobUrl), setShowDocumentModal(true), viewDocument(item.id)}} className="btn btn-light rounded-pill border-dark">View</button>
                    <select
                     className={`${item.status === 'accepted' ? 'btn-success' : item.status === 'Declined' ? 'btn-danger' : 'btn-warning'} rounded-pill p-2 ml-2`} 
                     style={{outline:'none', border:'none'}} 
                     onChange={(e) => handleShow(item.blobUrl,e.target.value)} 
                     value={item.status}
                     defaultValue={item.status}
                     >
                      <option value="pending">Pending Review</option>
                      <option value="accepted">Accept</option>
                      <option value="Declined">Declined</option>
                    </select>
                </li>
            ))
          :['N/A', 'N/A', 'N/A', 'N/A','N/A','N/A'].map((item:any) => (
            <li className="list-group-item p-4">
                    <i className="bi-house list-group-icon" /> {item}
            </li>
          ))}
          </ul>
          </td>
      </tr>

      </tbody>
    </>
  );
};

export default TableBody;
