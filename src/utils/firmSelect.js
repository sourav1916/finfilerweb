export const formatFirmLabel = (firm) => {
  const name = String(firm?.name ?? '').trim() || 'Unnamed business';
  const pan = String(firm?.pan_no ?? '').trim().toUpperCase();

  return pan ? `${name} • ${pan}` : name;
};

export const buildFirmSelectOptions = (firms = []) =>
  firms.map((firm) => ({
    value: firm.firm_id,
    label: formatFirmLabel(firm),
  }));
