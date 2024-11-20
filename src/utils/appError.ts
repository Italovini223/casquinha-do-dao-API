class appError {
  message;
  statusCode;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;

  }
}

export { appError };
