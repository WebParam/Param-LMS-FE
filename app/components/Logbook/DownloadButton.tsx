import { FC } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import DownloadIcon from '@mui/icons-material/Download'; // Import the download icon

interface DownloadButtonProps {
  studentName: string;
  week: number;
  feedbacks: { day: string; feedback: string; mood: string }[];
}

const DownloadButton: FC<DownloadButtonProps> = ({ studentName, week, feedbacks }) => {
  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text(`${studentName} - Week ${week + 1}`, 10, 10);
    const tableData = feedbacks.map(fb => [fb.day, fb.feedback, fb.mood]);
    autoTable(doc, {
      head: [['Day', 'Feedback', 'Mood']],
      body: tableData,
    });
    doc.save(`${studentName}_Week${week + 1}.pdf`);
  };

  return (
    <DownloadIcon 
      className="download-icon" 
      onClick={handleDownload} 
      style={{ cursor: 'pointer', fontSize: '24px', float: 'right' }} 
    />
  );
};

export default DownloadButton;