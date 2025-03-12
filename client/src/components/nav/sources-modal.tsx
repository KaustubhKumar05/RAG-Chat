import React, { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import useChatStore from "../../store";

export const SourcesModal = (): JSX.Element | null => {
  const [sources, setSources] = useState<Array<{ name: string; link: string }>>(
    [{ name: "", link: "" }]
  );
  const [loadingSources, setLoadingSources] = useState(false);

  const { isSourceModalOpen, setIsSourceModalOpen, setSourceList } =
    useChatStore();

  const onClose = () => setIsSourceModalOpen(false);

  const handleAddSource = () => {
    if (sources.length < 5) {
      setSources([...sources, { name: "", link: "" }]);
    }
  };

  const handleRemoveSource = (index: number) => {
    setSources(sources.filter((_, i) => i !== index));
  };

  const handleSourceChange = (
    index: number,
    field: "name" | "link",
    value: string
  ) => {
    const newSources = [...sources];
    newSources[index][field] = value;
    setSources(newSources);
  };

  const handleAddSources = async () => {
    setLoadingSources(true);

    const resp = await fetch("http://localhost:8000/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sources),
    });
    if (resp.ok) {
      const data = await resp.json();
      setSourceList(data.sources);
    }
    setLoadingSources(false);
    setIsSourceModalOpen(false);
  };

  if (!isSourceModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddSources();
    setSources([{ name: "", link: "" }]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {loadingSources ? "Loading Sources" : "Add Sources"}
          </h2>
          <button
            onClick={onClose}
            disabled={loadingSources}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        {loadingSources ? (
          <div>Crawling pages...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {sources.map((source, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Source {index + 1}</span>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSource(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={source.name}
                  onChange={(e) =>
                    handleSourceChange(index, "name", e.target.value)
                  }
                  placeholder="ID"
                  className="w-full border p-2 rounded-lg"
                />
                <input
                  type="url"
                  value={source.link}
                  onChange={(e) =>
                    handleSourceChange(index, "link", e.target.value)
                  }
                  placeholder="https://example.com"
                  className="w-full border p-2 rounded-lg"
                />
              </div>
            ))}
            {sources.length < 5 && (
              <button
                type="button"
                onClick={handleAddSource}
                className="w-full border-2 border-dashed border-gray-300 p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 flex items-center justify-center gap-2"
              >
                <Plus size={16} />
                Add Another Source
              </button>
            )}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Add Source(s)
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
