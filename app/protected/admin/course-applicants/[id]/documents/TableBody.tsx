'use client'
import { NextPage } from "next";
import list, { applicantDocuments } from "./data";
import { Modal } from "react-bootstrap";
import { useState } from "react";

const TableBody: NextPage<{ list: applicantDocuments[] }> = ({ list }) => {
  const align = {
    section_title: "pl-48pt text-left",
    time_spent: "text-left",
    completion_rate: "text-left",
    no_of_comments: "text-center",
    points_collected: "text-center",
  };

  const [show, setShow] = useState(false);
  const [documentName, setDocumentName] = useState("");
  const [documentStatus, setDocumentStatus] = useState("");

  const handleShow = (name: string, status: string) => {
    setDocumentName(name);
    setDocumentStatus(status);
    setShow(true);
  };
 
  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{documentName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p style={{fontSize:'14pt', color:'#252525'}}>Are you sure you want to <span style={{fontWeight:'bold', color: `${documentStatus === 'accept' ? 'green' : 'tomato'}`}}>{documentStatus.toLowerCase()}</span> this document?</p>
        <div className="d-flex justify-content-end">
          <button className="btn btn-secondary mr-2" onClick={handleClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleClose}>
            Confirm
          </button>
        </div>
        </Modal.Body>
      </Modal>
      <tbody className="list" id="staff">
        <tr>
          <td>
          <ul className="list-group list-group-flush">
            {
              list.map((item) => (
                <li className="list-group-item p-4">
                <i className="bi-house list-group-icon" /> {item.name}
              </li>
              ))
            }
          </ul>
          </td>

          <td>
          <ul className="list-group list-group-flush">
            {
              list.map((item) => (
                <li className="list-group-item p-4">
                <i className="bi-house list-group-icon" /> {item.blobUrl}
              </li>
            ))
          }
          </ul>
          </td>
          
          <td>
          <ul className="list-group list-group-flush">
          {
            list.map((item) => (
              <li className="list-group-item p-4">
                <i className="bi-house list-group-icon" /> {item.Status}
              </li>
            ))
          }
          </ul>
          </td>

          <td>
          <ul className="list-group list-group-flush">
            {
              list.map((item) => (
                <li className="list-group-item">
    
                    <button type="button" className="btn btn-light rounded-pill border-dark">View</button>
                    <select
                     className="btn-success rounded-pill p-2 ml-2" 
                     style={{outline:'none', border:'none'}} 
                     onChange={(e) => handleShow(item.name,e.target.value)} 
                     value={item.Status}
                     defaultValue={item.Status}
                     >
                      <option value="pending">Pending Review</option>
                      <option value="accept">Accept</option>
                      <option value="reject">Reject</option>
                    </select>
                </li>
            ))
          }
          </ul>
          </td>
      </tr>

      </tbody>
    </>
  );
};

export default TableBody;
