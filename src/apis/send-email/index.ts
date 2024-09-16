import axios from "axios";
import { SendEmailInputModel } from "./type";

const sendEmail = async (payload: SendEmailInputModel) => {
  const baseURL = "https://api.emailjs.com/api/v1.0/email/send";
  const instance = axios.create({ baseURL });

  const res = await instance.post("", payload);
  return res.data;
};

export { sendEmail };
