import axios from "axios";

const createShortUrl = async (fullUrl: string, alias: string) => {
  const payload = {
    fullUrl,
    alias,
  };
  const response = await axios.post(`${import.meta.env.VITE_API_SHORTEN_URL}`, {
    ...payload,
  });
  console.log(response);
  return response.data._doc;
};
const getAllUrl = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_SHORTEN_URL}`);
  const { data, status } = res;
  console.log(data);

  if (status < 400) return data;
  else return [];
};
const getUrl = async (shortId: string) => {
  console.log(`${import.meta.env.VITE_API_SHORTEN_URL}/${shortId}`);
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_SHORTEN_URL}/${shortId}`,
  );
  console.log(data);
  return data;
};
const deleteUrl = async (shortId: string) => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_SHORTEN_URL}`);
  console.log(data);
  return data;
};

export { createShortUrl, getAllUrl, getUrl, deleteUrl };
