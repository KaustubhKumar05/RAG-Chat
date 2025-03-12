import React, { useState } from "react";
import { X } from "lucide-react";
import useChatStore from "../../store";

export const SourcesModal = (): JSX.Element | null => {
  const [files, setFiles] = useState<File[]>([]);
  const [links, setLinks] = useState<string[]>([]);

  const { isSourceModalOpen, setIsSourceModalOpen } = useChatStore();

  const onClose = () => setIsSourceModalOpen(false);

  const handleAddSources = async (files: File[], links: string[]) => {
    const resp = await fetch("http://localhost:8000/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: links[0], max_pages: 5 }),
    });
    if (resp.ok) {
      const data = await resp.json();
      console.log({ data });
    }
    setIsSourceModalOpen(false);
  };

  if (!isSourceModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddSources(files, links);
    setFiles([]);
    setLinks([]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Sources</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* <div>
            <label className="block mb-2">Upload Files</label>
            <input
              type="file"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
              className="w-full border p-2 rounded-lg"
            />
          </div> */}
          <div>
            <label className="block mb-2">Add Links (comma separated)</label>
            <textarea
              value={links}
              onChange={(e) => setLinks(e.target.value.split(","))}
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
