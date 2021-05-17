const axiosBase = require("axios");

export const axios = axiosBase.create({
  baseURL: process.env.REACT_APP_BASEBALL_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  responseType: "json",
});
