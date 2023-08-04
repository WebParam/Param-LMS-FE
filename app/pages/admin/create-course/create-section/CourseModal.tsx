import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// ... Same interfa


interface VideoModule {
  title: string;
  videos: string[];
}

// Interface for section
interface Section {
  title: string;
  modules: VideoModule[];
}

// Interface for course
interface Course {
  title: string;
  sections: Section[];
}

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (course: Course) => void;
  onNext: () => void;
}




const CourseModal: React.FC<CourseModalProps> = ({ isOpen, onClose, onSave,onNext }) => {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");

  const handleSave = () => {
    const course: Course = {
      title: courseTitle,
      sections: [], // No need for sections and modules in this modal
    };
    onSave(course);
    onClose();
    onNext(); 
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white", // Set the background color to white
          padding: "20px", // Add some padding for content spacing
        }}
      >
        <h2>Edit Course</h2>
        <TextField
          label="Course Title"
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
          sx={{ marginBottom: "10px" }}
        />
        <TextField
          label="Course Description"
          multiline
          rows={4}
          value={courseDescription}
          onChange={(e) => setCourseDescription(e.target.value)}
          sx={{ marginBottom: "20px" }} // Increased marginBottom for spacing
        />
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

export default CourseModal;