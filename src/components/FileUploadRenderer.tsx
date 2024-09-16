import React, { useRef } from 'react';
import { ControlProps, withJsonFormsControlProps } from '@jsonforms/react';

interface FileUploadRendererProps extends ControlProps {
  data: string;
  handleChange: (path: string, value: string) => void;
  path: string;
}

const FileUploadRenderer: React.FC<FileUploadRendererProps> = ({ data, handleChange, path }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleChange(path, e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Upload Resume / CV</label>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={onFileChange}
        ref={fileInputRef}
        className="hidden"
      />
      <button
        type="button"
        onClick={handleButtonClick}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
      >
        Choose File
      </button>
    </div>
  );
};

export default withJsonFormsControlProps(FileUploadRenderer);
