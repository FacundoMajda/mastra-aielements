import { AxiosError } from "axios";

export type RequestBuilderProps<T = any> = {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  id?: string | number;
  body?: T;
  params?: IParams;
};

export type IParams = Record<string, any>;

// export type RequestBuilderProps<T, R = any> = {
//   method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
//   path: string;
//   id?: string | number;
//   body?: T;
//   params?: IParams;
// };

export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  message: string;
}

export interface ApiError {
  message: string;
  status?: number | string;
  data?: unknown;
  originalError?: AxiosError;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
