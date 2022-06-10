export interface IApiResponse<T> {
  get: string;
  parameters: string[];
  errors: any[];
  results: number;
  response: T;
}
