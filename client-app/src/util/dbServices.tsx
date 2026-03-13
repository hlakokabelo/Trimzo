import axios from "axios";

const API_SHORTEN_URL = import.meta.env.VITE_API_SHORTEN_URL;

const createShortUrl = async (fullUrl: string, alias: string) => {
  const payload = {
    fullUrl,
    alias,
  };
  const response = await axios.post(`${API_SHORTEN_URL}`, {
    ...payload,
  });
  console.log(response);
  return response.data._doc;
};

const getAllUrl = async () => {
  const res = await axios.get(`${API_SHORTEN_URL}`);
  const { data, status } = res;
  console.log(data);

  if (status < 400) return data;
  else return [];
};
const getUrl = async (shortId: string) => {
  try {
    console.log(`${API_SHORTEN_URL}/${shortId}`);
    const res = await axios.get(`${API_SHORTEN_URL}/${shortId}`);
    console.log(res);
    return res.data;
  } catch (err: any) {
    if (err.response?.status === 404) {
      return null; // slug doesn't exist
    }
    throw err; // real error
  }
};
const deleteUrl = async (shortId: string) => {
  const { data } = await axios.get(`${API_SHORTEN_URL}`);
  console.log(data);
  return data;
};

export { createShortUrl, getAllUrl, getUrl, deleteUrl };
