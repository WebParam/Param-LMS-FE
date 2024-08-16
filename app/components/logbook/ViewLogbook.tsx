import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Viewer } from '@react-pdf-viewer/core'; // Assuming this is the correct import for Viewer
import { Worker } from '@react-pdf-viewer/core'; // Assuming this is the correct import for Worker
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // Assuming this is the correct import for defaultLayoutPluginInstance

interface ViewLogbookProps {
  showDocumentModal: boolean;
  setShowDocumentModal: (value: boolean) => void;
  pdfWorkerUrl: string;
  documentToView: string;
}

function ViewLogbook({ showDocumentModal, setShowDocumentModal, pdfWorkerUrl, documentToView }: ViewLogbookProps) {
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
              fileUrl={`https://khumla-development-user-read.azurewebsites.net/api/Documents/PreviewDocument/${documentToView}`}
              plugins={[defaultLayoutPluginInstance]}
            />
          </Worker>
        </Modal.Body>
      </Modal>

      </div>
    )
}

export default ViewLogbook