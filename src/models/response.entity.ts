export class Response<T> {
  success?: boolean;

  message?: string[];

  error?: string;

  response?: T;
}
