export const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (Array.isArray(value) && value.length() === 0)(
    typeof value == "string" && value.trim().length === 0
  ) ||
  (typeof value == "object" && Object.keys(value).length === 0);
