export const formatZipCode = (code) => {
  const digitOnly = code.replace(/\D/g, "");

  if (!digitOnly.length) return "";

  if (digitOnly.length <= 2) return digitOnly;

  return `${digitOnly.slice(0, 2)}-${digitOnly.slice(2, 5)}`;
};

export const extractCodeNumbers = (code) => {
  return `${code.replace(/\D/g, "")}`;
};

export const formatNipCode = (code) => {
  const digitOnly = code.replace(/\D/g, "");

  if (!digitOnly.length) return "";

  if (digitOnly.length <= 3) return digitOnly
  if (digitOnly.length <= 6) return `${digitOnly.slice(0,3)}-${digitOnly.slice(3)}`
  if (digitOnly.length <= 8) return `${digitOnly.slice(0,3)}-${digitOnly.slice(3, 6)}-${digitOnly.slice(6, 8)}`

  return `${digitOnly.slice(0,3)}-${digitOnly.slice(3, 6)}-${digitOnly.slice(6, 8)}-${digitOnly.slice(8, 10)}`
  
}