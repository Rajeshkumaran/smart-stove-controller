import axios from "axios";
import { get } from "./helpers";
const axiosWrapper = (options) => {
  let configs = options;
  return axios.request({ ...configs });
};
export default axiosWrapper;
