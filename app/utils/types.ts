export type THttpResponse = {
  status: number;
  title: string;
  message: string;
};

export type THttpResponseWithEntity = THttpResponse & { entity?: Record<string, any> };
