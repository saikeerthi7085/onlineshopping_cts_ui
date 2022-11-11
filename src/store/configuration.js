import axios from "axios";

export default axios.create({
  baseURL: "https://useapionlinelineshopping.azurewebsites.net/api/v1.0/shopping",
  headers: {
    'Content-Type': 'application/json',
    mode: "cors"

  },

});
