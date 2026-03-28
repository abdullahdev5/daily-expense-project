

// safeString
export const toSafeString = (value: string | null | undefined): string => value ?? '';

// isNullOrEmpty
export const isNullOrEmpty = (value: string): boolean => {
    return (!value || value.trim() == '');
}

// isEmail
export const isEmail = (value: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value);
}