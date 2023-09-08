export const setItemInLocalStorage = (key: string, value: unknown): void => {
  window.localStorage.setItem(key, JSON.stringify(value));
};
