import axios from "axios";

/**
 * Get data from the API
 * @param   {string}  url  URL
 * @returns {object}  Response
 */
export const getDataAPI = async (url) => {
  const res = await axios.get(`/api/${url}`, {
    headers: { Authorization: localStorage.getItem("token") },
  });
  return res;
};

/**
 * Post data to the API
 * @param   {string}  url   URL
 * @param   {object}  post  Data to post
 * @returns {object}  Response
 */
export const postDataAPI = async (url, post) => {
  const res = await axios.post(`/api/${url}`, post, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  return res;
};

/**
 * Put data to the API
 * @param   {string}  url   URL
 * @param   {object}  post  Data to put
 * @returns {object}  Response
 */
export const putDataAPI = async (url, post) => {
  const res = await axios.put(`/api/${url}`, post, {
    headers: { Authorization: localStorage.getItem("token") },
  });
  return res;
};

/**
 * Patch data to the API
 * @param   {string}  url   URL
 * @param   {object}  post  Data to patch
 * @returns {object}  Response
 */
export const patchDataAPI = async (url, post) => {
  const res = await axios.patch(`/api/${url}`, post, {
    headers: { Authorization: localStorage.getItem("token") },
  });
  return res;
};

/**
 * Delete data from the API
 * @param   {string}  url  URL
 * @returns {object}  Response
 */
export const deleteDataAPI = async (url) => {
  const res = await axios.delete(`/api/${url}`, {
    headers: { Authorization: localStorage.getItem("token") },
  });
  return res;
};
