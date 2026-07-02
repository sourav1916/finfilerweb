import apiCall, { resolveMediaUrl } from './apiCall';

const INVALID_FILE_CHARS = /[<>:"/\\|?*\x00-\x1f]/g;

const getExtensionFromPath = (value = '') => {
  const base = String(value).split('?')[0].split('#')[0];
  const lastDot = base.lastIndexOf('.');
  if (lastDot <= 0 || lastDot === base.length - 1) return '';
  return base.slice(lastDot + 1).toLowerCase();
};

const sanitizeDownloadFileName = (name = '') =>
  String(name).replace(INVALID_FILE_CHARS, '').trim() || 'document';

/** Build a safe download filename from the document label, keeping the original file extension. */
export const getDocumentDownloadName = (doc = {}) => {
  const displayName = doc.name || doc.document_name || 'document';
  const sanitized = sanitizeDownloadFileName(displayName);
  const extension = getExtensionFromPath(doc.file_name || doc.file_url || '');

  if (!extension) return sanitized;
  if (sanitized.toLowerCase().endsWith(`.${extension}`)) return sanitized;

  return `${sanitized}.${extension}`;
};

const isCrossOriginUrl = (url) => {
  try {
    return new URL(url).origin !== window.location.origin;
  } catch {
    return true;
  }
};

const triggerBlobDownload = (blob, filename) => {
  const objectUrl = URL.createObjectURL(blob);
  const anchor = window.document.createElement('a');
  anchor.href = objectUrl;
  anchor.download = filename;
  anchor.rel = 'noopener';
  window.document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(objectUrl);
};

const triggerDirectDownload = (url, filename) => {
  const anchor = window.document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = 'noopener noreferrer';
  anchor.target = '_blank';
  window.document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
};

/**
 * Fallback for external storage URLs when the API proxy is unavailable.
 * B2 signed URLs block cross-origin fetch, but direct navigation works.
 */
export const downloadFileFromUrl = async (fileUrl, filename) => {
  const resolvedUrl = resolveMediaUrl(fileUrl);
  if (!resolvedUrl) {
    throw new Error('Missing file URL');
  }

  if (isCrossOriginUrl(resolvedUrl)) {
    triggerDirectDownload(resolvedUrl, filename);
    return;
  }

  const response = await fetch(resolvedUrl);
  if (!response.ok) {
    throw new Error('Download failed');
  }

  const blob = await response.blob();
  triggerBlobDownload(blob, filename);
};

export const downloadOrderDocument = async (orderId, doc) => {
  const filename = getDocumentDownloadName(doc);
  const response = await apiCall('/orders/document/download', 'POST', {
    order_id: orderId,
    document_id: doc.document_id,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || 'Download failed');
  }

  const blob = await response.blob();
  triggerBlobDownload(blob, filename);
};

export const downloadLibraryDocument = async (doc) => {
  const filename = getDocumentDownloadName(doc);
  const response = await apiCall('/documents/download', 'POST', {
    document_id: doc.document_id,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || 'Download failed');
  }

  const blob = await response.blob();
  triggerBlobDownload(blob, filename);
};
