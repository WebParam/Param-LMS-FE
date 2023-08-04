import React, { useState, useRef } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// Interface for video module
interface VideoModule {
  title: string;
  videos: string[];
}

interface ModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (module: VideoModule) => void;
}

const ModuleModal: React.FC<ModuleModalProps> = ({ isOpen, onClose, onSave }) => {
  const [moduleTitle, setModuleTitle] = useState("");
  const [videos, setVideos] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddVideo = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input programmatically
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const selectedVideos = Array.from(selectedFiles).map((file) => file.name);
      setVideos(selectedVideos);
    }
  };

  const handleSave = () => {
    const module: VideoModule = {
      title: moduleTitle,
      videos: videos,
    };
    onSave(module);
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
        <h2>Add Module</h2>
        <TextField
          label="Module Title"
          value={moduleTitle}
          onChange={(e) => setModuleTitle(e.target.value)}
          sx={{ marginBottom: "10px" }}
        />
        <div>
          <h4>Add Videos</h4>
          <TextField
            label="Comma-separated videos"
            value={videos.join(",")}
            onChange={(e) => setVideos(e.target.value.split(","))}
            sx={{ marginBottom: "10px" }}
          />
          <input
            ref={fileInputRef}
            type="file"
            multiple
            style={{ display: "none" }}
            onChange={handleFileInputChange}
          />
          <Button variant="contained" onClick={handleAddVideo}>
            Add Video
          </Button>
          <div>
            {videos.map((video, index) => (
              <div key={index}>{video}</div>
            ))}
          </div>
        </div>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={onClose} sx={{ marginRight: "10px" }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save Module
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModuleModal;
