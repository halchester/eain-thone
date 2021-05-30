import axios from "axios";

// const END_POINT = "http://localhost:8000";
const END_POINT = "https://eain-thone.herokuapp.com/";

export default axios.create({
  baseURL: END_POINT,
});
