import { useCallback, useEffect, useState } from "react";
import { FileText, FolderOpen, Loader2, Search, X } from "lucide-react";
import { apiCall, resolveMediaUrl } from "../../utils/apiCall";
import { useToast } from "../../contexts/ToastContext";
import AnimatedModal from "../common/AnimatedModal";

const formatBytes = (bytes) => {
  if (!bytes) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
};

const getFileExtension = (fileName = "") => {
  const parts = String(fileName).split(".");
  return parts.length > 1 ? parts.pop().toLowerCase() : "file";
};

export default function DocumentLibraryPickerModal({
  isOpen,
  onClose,
  firmId,
  onSelect,
}) {
  const toast = useToast();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const debounce = setTimeout(() => setDebouncedSearch(searchQuery.trim()), 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  useEffect(() => {
    if (!isOpen) {
      setDocuments([]);
      setSearchQuery("");
      setDebouncedSearch("");
      setLoading(false);
    }
  }, [isOpen]);

  const fetchDocuments = useCallback(async () => {
    if (!firmId) return;

    setLoading(true);
    try {
      const params = new URLSearchParams({
        page_no: "1",
        limit: "100",
        firm_id: String(firmId),
        search: debouncedSearch,
      });

      const response = await apiCall(`/documents/list?${params.toString()}`, "GET");
      const body = await response.json();

      if (response.ok && body.success && body.data) {
        setDocuments(body.data.documents || []);
      } else {
        throw new Error(body.message || "Failed to load documents");
      }
    } catch (err) {
      toast.error(err.message || "Failed to load documents.");
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  }, [firmId, debouncedSearch, toast]);

  useEffect(() => {
    if (isOpen && firmId) {
      fetchDocuments();
    }
  }, [isOpen, firmId, fetchDocuments]);

  const handleSelect = (document) => {
    onSelect?.({
      ...document,
      public_url: resolveMediaUrl(document.file_url),
    });
    onClose();
  };

  return (
    <AnimatedModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-lg"
      panelClassName="flex max-h-[85vh] flex-col overflow-hidden rounded-lg border border-border bg-secondary shadow-2xl"
    >
      <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600">
            <FolderOpen size={20} />
          </div>
          <div>
            <h2 className="text-base font-semibold text-primary-foreground">
              Import from library
            </h2>
            <p className="mt-0.5 text-sm text-secondary-foreground">
              Choose an uploaded document for this business.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-1.5 text-secondary-foreground transition hover:bg-primary hover:text-primary-foreground"
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>

      <div className="border-b border-border px-5 py-3">
        <div className="flex items-center gap-2 rounded-md border border-border bg-primary px-3 py-2">
          <Search size={15} className="shrink-0 text-secondary-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search documents…"
            className="w-full bg-transparent text-sm text-primary-foreground outline-none placeholder:text-secondary-foreground"
          />
        </div>
      </div>

      <div className="modal-scroll flex-1 overflow-y-auto px-5 py-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-2 py-12 text-secondary-foreground">
            <Loader2 size={22} className="animate-spin text-indigo-600" />
            <p className="text-sm">Loading documents…</p>
          </div>
        ) : documents.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-primary px-4 py-10 text-center">
            <FileText size={28} className="mx-auto mb-3 text-secondary-foreground/50" />
            <p className="text-sm font-medium text-primary-foreground">No documents found</p>
            <p className="mt-1 text-xs text-secondary-foreground">
              Upload documents for this business first, then import them here.
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {documents.map((document) => {
              const extension = getFileExtension(document.file_name || document.name);

              return (
                <li key={document.document_id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(document)}
                    className="flex w-full items-center gap-3 rounded-lg border border-border bg-primary px-3 py-3 text-left transition hover:border-indigo-500/40 hover:bg-indigo-500/5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-indigo-500/10 text-indigo-600">
                      <FileText size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-primary-foreground">
                        {document.name}
                      </p>
                      <p className="mt-0.5 text-xs text-secondary-foreground">
                        {formatBytes(document.size)}
                        <span className="mx-1.5 text-border">·</span>
                        <span className="uppercase">{extension}</span>
                      </p>
                    </div>
                    <span className="shrink-0 text-xs font-medium text-indigo-600">
                      Import
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </AnimatedModal>
  );
}
