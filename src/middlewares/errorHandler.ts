class ErrorHandler extends Error {
  constructor(public status: number, message: string) {
    super();
    this.message = message;
    this.status = status;
  }
}

export default ErrorHandler;
