import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

const getAuthHeaders = (token) => {
  return token ? { authentication: `Bearer ${token}` } : {};
};

export const getRequest = async (path, token) => {
  const url = baseUrl + path;
  const res = await axios.get(url, {
    headers: {
      ...getAuthHeaders(token),
    },
  });
  return res?.data;
};

export const postRequest = async (path, data = {}, token) => {
  const url = baseUrl + path;
  const res = await axios.post(url, data, {
    headers: {
      ...getAuthHeaders(token),
    },
  });
  return res?.data;
};

export const putRequest = async (path, data = {}, token) => {
  const url = baseUrl + path;
  const res = await axios.put(url, data, {
    headers: {
      ...getAuthHeaders(token),
    },
  });
  return res?.data;
};

export const deleteRequest = async (path, token) => {
  const url = baseUrl + path;
  const res = await axios.delete(url, {
    headers: {
      ...getAuthHeaders(token),
    },
  });
  return res?.data;
};
