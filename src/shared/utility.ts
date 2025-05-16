export const formatShortNumber = (num: number | null, fixed = 2): string => {
  if (!num) return "0";
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

export function randomElementBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomString(length: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

export function randomElementInArray<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export const generateArrayOfRandomNumber = (
  length: number,
  accumulator = 1000,
) => {
  return Array.from({ length }, () => Math.floor(Math.random() * accumulator));
};
