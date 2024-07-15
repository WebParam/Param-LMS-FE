'use client'
import { NextPage } from "next";
import listOfDocumentNames from "./data";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import Link from "next/link";

const TableBody: NextPage<{ list: any[] }> = ({ list }) => {
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

  console.log('list of documents', list)

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
            {list.length < 0 ?
              list?.map((item:any) => (
              <li className="list-group-item p-4">
                    <i className="bi-house list-group-icon" /> {`${item.blobUrl.slice(0, 15)}... .pdf`}
              </li>
              ))
            :['N/A', 'N/A', 'N/A', 'N/A'].map((item:any) => (
              <li className="list-group-item p-4">
                    <i className="bi-house list-group-icon" /> {item}
              </li>
            ))}
          </ul>
          </td>
          
          <td>
          <ul className="list-group list-group-flush">
          {
            list?.map((item:any) => (
              <li className="list-group-item p-4">
                <i className="bi-house list-group-icon" /> {item.status??'Pending Review'}
              </li>
            ))
          }
          </ul>
          </td>

          <td>
          <ul className="list-group list-group-flush">
            {list.length < 0 ?
              list?.map((item:any) => (
                <li className="list-group-item">
                    <Link href={item.blobUrl} target="_blank" className="btn btn-light rounded-pill border-dark">View</Link>
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
          :['N/A', 'N/A', 'N/A', 'N/A'].map((item:any) => (
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
