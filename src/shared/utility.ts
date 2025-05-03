export const formatShortNumber = (num: number | null, fixed = 2): string => {
  if (num === null) return "0";
  const units = ["", "K", "M", "B"];
  const unitIndex = Math.floor(Math.log10(Math.abs(num)) / 3);
  if (unitIndex === 0) return num.toString();
  const value = num / 1000 ** unitIndex;
  const filteredValue = Math.floor(value * 100) / 100;
  return `${filteredValue.toFixed(Number.isInteger(filteredValue) ? 0 : fixed)}${units[unitIndex]}`;
};

export const formatNumberDisplay = (amount: number | null, fixed = 2): string => {
  return Number(amount).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: fixed,
  });
};
