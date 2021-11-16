import axios from "axios";

import { refreshToken as refreshtoken } from "../config/chartmetrics.config";

const getAccessToken = async () => {
  const response = await axios("https://api.chartmetric.com/api/token", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: { refreshtoken },
  });
  return response;
};

export { getAccessToken };
