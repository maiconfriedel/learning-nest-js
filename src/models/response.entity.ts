export class Response<T> {
  success?: boolean;

  errors?: string[];

  message?: string;

  response?: T;
}
