
export function save(key: string, value: any) {
  if (typeof localStorage !== 'undefined') {
    return localStorage.setItem(key, JSON.stringify(value));
  }
}

export function get<T>(key: string): T | null {
  if (typeof localStorage === 'undefined') {
    return null;
  }
  const value = localStorage.getItem(key);
  if (value === null) {
    return null;
  }
  try {
    return JSON.parse(value);
  } catch (error) {
    return null;
  }
}

export const STORAGE_KEY_AREA = 'STORAGE_KEY_AREA';
