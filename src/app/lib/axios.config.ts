import axios from 'axios';
import { BASE_URL } from '../../data/utils/environments';

type ApiError = {
  status: number;
  message: string;
  errors?: Record<string, string[]> | string[];
};

const axiosInstance = axios.create({ baseURL: BASE_URL });

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (!axios.isAxiosError(err)) {
      const e: ApiError = { status: 0, message: 'Xəta baş verdi' };
      return Promise.reject(e);
    }

    const status = err.response?.status ?? 0;
    const data = err.response?.data;

    if (typeof data === 'string') {
      const e: ApiError = { status, message: data };
      return Promise.reject(e);
    }

    const msg = data?.message;
    const message = Array.isArray(msg) ? msg.join(', ') : (msg ?? err.message);

    const e: ApiError = {
      status,
      message,
      errors: Array.isArray(msg) ? msg : data?.errors,
    };

    return Promise.reject(e);
  },
);

export default axiosInstance;
