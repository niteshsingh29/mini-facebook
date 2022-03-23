import { API_URLS,LOCALSTORAGE_TOKEN_KEY } from "../utils/index";
const customFetch = async (url, { body, ...customConfig }) => {
  // body will be either null or it will be present
  // customConfig is the rest opertaor which is present for the extra part which you  want to add in the header

  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY); // once the user makes the login request we get the token from the Api and store inside the token

  const headers = {
    "content-type": "application/json",
    Accept: "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  try {
    const response = await fetch(url, config);
    const data = await response.json();
    if (data.success) {
      return { data: data.data, success: true };
    }
    throw new Error(data.message);
  } catch (error) {
    console.log(error);
    return { message: error.message, success: false };
  }
};

export const getPosts = (page = 1, limit = 5) => {
  return customFetch(API_URLS.posts(page, limit), {
    method: "GET",
  });
};
