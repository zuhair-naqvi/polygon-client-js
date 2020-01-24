import fetch from "cross-fetch";
import * as querystring from "querystring";

export interface IPolygonQuery {
  [key: string]: string | number | boolean;
}

export interface IPolygonQueryWithCredentials extends IPolygonQuery {
  apiKey: string | boolean;
}

export const auth = (apiKey, func) => (...args) => func(apiKey, ...args);

export const get = async (
  path: string,
  apiKey: string = "invalid",
  query?: IPolygonQuery
): Promise<any> => {
  if (!apiKey) {
    throw new Error("API KEY not configured...");
  }

  const authenticatedQuery: IPolygonQueryWithCredentials = {
    ...query,
    apiKey
  };

  const url = `https://api.polygon.io${path}?${querystring.encode(
    authenticatedQuery
  )}`;

  const response = await fetch(url);

  return response.json();
};
