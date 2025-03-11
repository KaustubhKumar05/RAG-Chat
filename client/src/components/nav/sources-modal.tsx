import React, { useState } from "react";
import { X } from "lucide-react";

interface SourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (files: File[], links: string[]) => void;
}

export const SourcesModal = ({
  isOpen,
  onClose,
  onSubmit,
}: SourcesModalProps): JSX.Element | null => {
  const [files, setFiles] = useState<File[]>([]);
  const [links, setLinks] = useState<string>("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(files, links.split("\n").filter((link) => link.trim()));
    setFiles([]);
    setLinks("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Sources</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Upload Files</label>
            <input
              type="file"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
              className="w-full border p-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block mb-2">Add Links (one per line)</label>
            <textarea
              value={links}
              onChange={(e) => setLinks(e.target.value)}
              className="w-full border p-2 rounded-lg h-32 resize-none"
              placeholder="https://example.com"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Add Sources
          </button>
        </form>
      </div>
    </div>
  );
};