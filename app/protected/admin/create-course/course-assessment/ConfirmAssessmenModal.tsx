import React from 'react';

interface ConfirmAssessmentModalProps {
 
    onClose: () => void;
    onConfirm: () => void;
    onCancel: () => void;
   
  }
function ConfirmAssessmentModal({ onConfirm, onCancel } : ConfirmAssessmentModalProps) {
  return (
    <div
    style={{
        borderRadius:"15px"
    }}
    >
        <h2
        style={{
            fontWeight:"500 !important"
        }}
        >
        Submit
            </h2>
            <p style={{fontSize:"14px",
            paddingBottom:"20px"
        }}>
                Are you sure you want to perfrom this action

            </p>
 
        <div
        style={{
            display:"flex",
            justifyContent:"flex-end",
           
        }}
        >
        <button
        style={{
            marginRight:"5px"
        }}
          onClick={onCancel}
          className="btn btn-accent">Cancel</button>
          <button
            onClick={onConfirm}
            className="btn btn-outline-secondary"
          >
            Submit
          </button>
        </div>
        </div>
  );
}

export default ConfirmAssessmentModal;
