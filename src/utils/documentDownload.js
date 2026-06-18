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
