export const formatZipCode = (code) => {
  const digitOnly = code.replace(/\D/g, "");

  if (digitOnly.length === 0) return "";

  if (digitOnly.length <= 2) return digitOnly;

  return `${digitOnly.slice(0, 2)}-${digitOnly.slice(2, 5)}`;
};

export const extractZipCodeNumbers = (code) => {
  return `${code.replace("-", "")}`;
};
