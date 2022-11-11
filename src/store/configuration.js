import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:44313/api/v1.0/shopping",
  headers: {
    'Content-Type': 'application/json',
    mode: "cors"

  },

});