import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const DateFormat = /^\d{4}-\d{2}-\d{2}/;

class Api {
  baseUrl: string;
  instance: AxiosInstance;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.instance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        Accept: "application/json",
        "Accept-Language": "pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7",
      },
      transformResponse: (data) =>
        data &&
        JSON.parse(data, (_, value) =>
          DateFormat.test(value) ? new Date(value) : value
        ),
      timeout: 120 * 1_000,
    });
  }

  async _get<T>(url: string, config?: AxiosRequestConfig<any>) {
    return await this.instance.get<T>(url, config);
  }
}

export { Api };
