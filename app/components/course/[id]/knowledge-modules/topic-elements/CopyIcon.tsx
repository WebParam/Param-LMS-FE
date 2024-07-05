// components/CopyButton.tsx
import { useState } from "react";

interface CopyButtonProps {
  textToCopy: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const [copySuccess, setCopySuccess] = useState<string>("");

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopySuccess("Copied!");
      setTimeout(() => {
        setCopySuccess("");
      }, 3000);
    } catch (err) {
      setCopySuccess("Failed to copy!");
    }
  };

  return (
    <div>
      <i className="material-icons mr-8pt" onClick={() => copyToClipboard()}>
        content_copy
      </i>
      {copySuccess && <span>{copySuccess}</span>}
    </div>
  );
};

export default CopyButton;
