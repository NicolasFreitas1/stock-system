import { getCookie } from "cookies-next";
import axios from "axios";
import { cookies } from "next/headers";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

apiClient.interceptors.request.use((config) => {
  const tokenClient = getCookie("jwt");

  if (tokenClient) {
    config.headers.Authorization = `Bearer ${tokenClient}`;
  }

  return config;
});

export const apiServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

apiServer.interceptors.request.use((config) => {
  const tokenServer = cookies().get("jwt");

  if (tokenServer && tokenServer.value) {
    config.headers.Authorization = `Bearer ${tokenServer.value}`;
  }

  return config;
});
