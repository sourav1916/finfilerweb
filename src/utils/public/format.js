export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);

export const formatServiceType = (type) => {
  if (!type) return 'Service';
  return type.charAt(0).toUpperCase() + type.slice(1);
};

export const getDiscountLabel = (service) => {
  if (!service || Number(service.discount_value) <= 0) return '';
  if (service.discount_type === 'percentage') return `${service.discount_percentage}%`;
  if (service.discount_type && service.discount_type !== 'not applicable') {
    return service.discount_type;
  }
  return `${service.discount_percentage || 0}%`;
};

export const hasStoredAuth = () =>
  typeof window !== 'undefined' && Boolean(localStorage.getItem('token'));
