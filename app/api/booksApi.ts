import axios, { AxiosError } from "axios";

export type ApiError = AxiosError<{ error: string }>;

export const bookApi = axios.create({
  baseURL: "https://6971cf4a32c6bacb12c49096.mockapi.io",
});
