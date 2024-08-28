"use client";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { rUserUrl } from "@/app/lib/actions/endpoints";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const pdfVersion = "3.10.111";
const pdfWorkerUrl = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfVersion}/pdf.worker.js`;
const apiDocUrl = `${rUserUrl}/Documents/PreviewDocument`;

function DocumentModal(props: any) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Document {props.documentName ? " - " + props.documentName : ""}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Worker workerUrl={pdfWorkerUrl}>
          <Viewer
            fileUrl={`${apiDocUrl}/${props.documentId}`}
            plugins={[defaultLayoutPluginInstance]}
          />
        </Worker>
      </Modal.Body>
    </Modal>
  );
}
export default DocumentModal;
