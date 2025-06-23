import axios from "axios";
const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const getRequest = async (path, params = {}) => {
  const url = baseUrl + path;
  const res = await axios.get(url, { params });
  return res?.data;
};

export const postRequest = async (path, data = {}) => {
  const url = baseUrl + path;
  const res = await axios.post(url, data);
  return res?.data;
};

export const putRequest = async (path, data = {}) => {
  const url = baseUrl + path;
  const res = await axios.put(url, data);
  return res?.data;
};

export const deleteRequest = async (path, params = {}) => {
  const url = baseUrl + path;
  const res = await axios.delete(url, { params });
  return res?.data;
};
