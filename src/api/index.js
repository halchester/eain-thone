import axios from "axios";

const END_POINT = "http://localhost:8000";

export default axios.create({
  baseURL: END_POINT,
});
