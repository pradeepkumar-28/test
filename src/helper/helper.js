export const extractDataFromUrl = (urlArg) => {
  const urlObj = new URL(urlArg);
  const username = urlObj.searchParams.get("username");
  const password = urlObj.searchParams.get("password");

  return {
    url: `${urlObj.origin}${urlObj.pathname}?`,
    username,
    password,
  };
};

export const setLocalStorageData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Helper function to get data from local storage
export const getLocalStorageData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};



// Helper function to remove data from local storage
export const removeDataFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};
