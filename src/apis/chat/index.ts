import axios from "axios";

import { CreateSendBirdUserParams } from "./type";
import API_ROUTES from "../../constants/apiRoutes";

const createSendBirdUser = async (payload: CreateSendBirdUserParams) => {
  const res = await axios.post(API_ROUTES.SEND_BIRD.CRATE_USER, payload, {
    headers: {
      "Api-Token": "8431b9677570a63562158dc40c06675cdfc12c47",
    },
  });
  return res.data;
};

export { createSendBirdUser };
