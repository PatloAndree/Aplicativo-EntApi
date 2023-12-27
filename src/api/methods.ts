import { getLocal } from "../services/local-storage";
import { UserAPIType } from "./auth-api";
import axios, { AxiosResponse } from 'axios';


export const getMethod = async <T>(url: string) => {
  const user = getLocal<UserAPIType>("user");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.accessToken}`,
    },
  }).then<T>((data) => data.json());

  return response;
};

export const getMethodRaw3 = async <T>(url: string, queryParams?: Record<string, string>) => {
  const user = getLocal<UserAPIType>("user");

  // Construir la URL con parámetros de consulta si existen
  const queryString = queryParams
    ? `?${Object.entries(queryParams)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join("&")}`
    : "";

  const fullUrl = `${url}${queryString}`;

  const response = await fetch(fullUrl, {
    method: "GET",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.accessToken}`,
    },
  }).then<T>((data) => data.json());

  return response;
};

export const getMethodRaw = async <T>(url: string, queryParams?: Record<string, string>) => {
  const user = getLocal<UserAPIType>('user');

  // Construir la URL con parámetros de consulta si existen
  const queryString = queryParams
    ? `?${Object.entries(queryParams)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&')}`
    : '';

  const fullUrl = `${url}${queryString}`;

  try {
    const response: AxiosResponse<T> = await axios.get(fullUrl, {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    // Handle error if needed
    console.error('Error in API request:', error);
    throw error; // Rethrow the error to propagate it further
  }
};

export const postMethod = async <T>(url: string, body?: any) => {
  const user = getLocal<UserAPIType>("user");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.accessToken}`,
    },
    body: JSON.stringify(body),
  }).then<T>((data) => data.json());

  return response;
};

export const postMethod2 = async <T>(url: string, body?: any) => {
  const user = getLocal<UserAPIType>("user");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.accessToken}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  }).then<T>((data) => data.json());

  return response;
};




export const deleteMethod = async <T>(url: string, body?: any) => {
  const user = getLocal<UserAPIType>("user");

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.accessToken}`
    },
    body: JSON.stringify(body),
  }).then<T>((data) => data.json());

  return response;
};

export const putMethod = async <T>(url: string, body?: any) => {
  const user = getLocal<UserAPIType>("user");

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.accessToken}`
    },
    body: JSON.stringify(body),
  }).then<T>((data) => data.json());

  return response;
};
