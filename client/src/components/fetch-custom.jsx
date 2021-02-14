import fetch from "node-fetch";

var fetchAbsolute = require("fetch-absolute");

let url;
if (process.env.NODE_ENV === "production") {
  url = "https://ride-app-mlh.herokuapp.com";
} else {
  url = "https://ride-app-mlh.herokuapp.com";
  //   url = "http://localhost:5000";
}

const fetchApi = fetchAbsolute(fetch)(url);
export default fetchApi;
