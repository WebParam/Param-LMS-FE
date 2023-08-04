import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface SectionModalProps {
    isOpen: boolean;
    onNext: () => void;
  onClose: () => void;
  onSave: (sectionTitle: string, selectedOption: string) => void;
}


const SectionModal: React.FC<SectionModalProps> = ({ isOpen, onClose, onSave, onNext }) => {
  const [sectionTitle, setSectionTitle] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleSave = () => {
    onSave(sectionTitle, selectedOption);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
        }}
      >
        <h2>Add Section</h2>
        <TextField
          label="Section Title"
          value={sectionTitle}
          onChange={(e) => setSectionTitle(e.target.value)}
          sx={{ marginBottom: "10px" }}
        />
        <div>
          <h4>Select an option</h4>
          <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
          </select>
        </div>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={onClose} sx={{ marginRight: "10px" }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={onNext}>
            Next
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SectionModal;
