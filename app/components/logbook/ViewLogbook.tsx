import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Viewer } from '@react-pdf-viewer/core';
import { Worker } from '@react-pdf-viewer/core';
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; 
const pdfVersion = "3.10.111";
const pdfWorkerUrl = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfVersion}/pdf.worker.js`;

interface ViewLogbookProps {
  showDocumentModal: boolean;
  setShowDocumentModal: (value: boolean) => void;
  documentToView: string;
}

function ViewLogbook({ showDocumentModal, setShowDocumentModal, documentToView }: ViewLogbookProps) {
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
               //fileUrl={`https://khumla-development-user-read.azurewebsites.net/api/Documents/PreviewDocument/66754b17c66474c142f6b9f6`}
              fileUrl={documentToView}
              plugins={[defaultLayoutPluginInstance]}
            />
          </Worker>
        </Modal.Body>
      </Modal>

      </div>
    )
}

export default ViewLogbook