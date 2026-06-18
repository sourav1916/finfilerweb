export const CLIENT_PREFIX = '/client';

export const clientRoute = (path = '') => {
  if (!path) return CLIENT_PREFIX;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${CLIENT_PREFIX}${normalized}`;
};
