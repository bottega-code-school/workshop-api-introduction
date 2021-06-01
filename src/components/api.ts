import axios from "axios";

export default axios.create({
  baseURL: "https://api.dailysmarty.com/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=UTF-8",
  },
});
