import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Viewer } from '@react-pdf-viewer/core';
import { Worker } from '@react-pdf-viewer/core';
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; 

interface ViewAssignmentProps {
  showDocumentModal: boolean;
  setShowDocumentModal: (value: boolean) => void;
  pdfWorkerUrl: string;
  documentToView: string;
}

function ViewAssignment({ showDocumentModal, setShowDocumentModal, pdfWorkerUrl, documentToView }: ViewAssignmentProps) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div>
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
              fileUrl={documentToView}
              plugins={[defaultLayoutPluginInstance]}
            />
          </Worker>
        </Modal.Body>
      </Modal>

      </div>
    )
}

export default ViewAssignment