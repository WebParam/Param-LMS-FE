import React, { useState, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import SignatureCanvas from 'react-signature-canvas';
import { createUserProfile } from '../../lib/actions/profile';
import { ProfileModalProps } from '@/app/interfaces/profile';
import { blobToFile } from '@/app/lib/actions/utils';
const ProfileModal: React.FC<ProfileModalProps> = ({ show, onHide, existingDetails }) => {
  const [signature, setSignature] = useState<string | null>(null);
  const signatureRef = useRef<SignatureCanvas>(null);
  console.log(`existingDetails FIelds and values: ${JSON.stringify(existingDetails)}`);

  const handleSave = async () => {
    if (!signature) {
      alert("Please provide a signature before saving.");
      return;
    }

    const formData = new FormData();

    formData.append('UserId', existingDetails.id);
    formData.append('FirstName', existingDetails.firstName);
    formData.append('Surname', existingDetails.lastName);
    formData.append('Email', existingDetails.email);

    // Convert signature to PNG file
    const signatureBlob = await (await fetch(signature)).blob();
    const signatureFile = blobToFile(signatureBlob, 'signature.png');
    formData.append('FileSignature', signatureFile);

    try {
      const response = await createUserProfile(formData);

      if (response.error) {
        throw new Error(response.message || "An error occurred while saving your profile.");
      }
      
      if (response.ok) {
        onHide();
      } else {
        onHide();
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      const errorMessage = error instanceof Error ? error.message : "An error occurred while saving your profile. Please try again.";
      alert(errorMessage);
    }
  };

  const clearSignature = () => {
    signatureRef.current?.clear();
    setSignature(null);
  };

  const handleSignatureEnd = () => {
    setSignature(signatureRef.current?.toDataURL() ?? null);
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>Add Signature</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center text-muted">
        <p>Please provide your signature by signing below.</p>
        <div className="signature-separator"></div>
        <SignatureCanvas
          ref={signatureRef}
          canvasProps={{width: 500, height: 200, className: 'signature-canvas'}}
          onEnd={handleSignatureEnd}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={clearSignature}>Clear Signature</Button>
        <Button variant="primary" onClick={handleSave} disabled={!signature}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileModal;
